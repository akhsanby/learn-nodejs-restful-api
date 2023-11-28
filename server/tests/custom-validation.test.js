const Joi = require("joi");

describe("Joi", () => {
  it("should can use custom message validation", () => {
    const schema = Joi.string().min(3).max(6).required().messages({
      "string.min": "{{#label}} panjang harus minimal {{#limit}} karakter",
      "string.max": "{{#label}} panjang harus maksimal {{#limit}} karakter",
    });

    const request = "aaaaaaaaa";

    const result = schema.validate(request, {
      abortEarly: false,
    });
    console.info(result);
  });

  it("should can use custom message in object validation", () => {
    const schema = Joi.object({
      username: Joi.string().email().required().messages({
        "any.required": "{{#label}} harus diisi",
        "string.email": "{{#label}} harus valid email",
      }),
      password: Joi.string().required().min(6).max(10).messages({
        "any.required": "{{#label}} harus diisi",
        "string.min": "{{#label}} harus lebih dari {{#limit}} karakter",
        "string.max": "{{#label}} harus kurang dari {{#limit}} karakter",
      }),
    });

    const request = {
      username: "akhsan",
      password: "123",
    };

    const result = schema.validate(request, {
      abortEarly: false,
    });
    console.info(result);
  });

  it("should can use custom validation", () => {
    const registerSchema = Joi.object({
      username: Joi.string().email().required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(10)
        .custom((value, helpers) => {
          if (value.startsWith("akh")) {
            return helpers.error("password.wrong");
          }
          return value;
        })
        .messages({
          "password.wrong": 'Password tidak boleh berawalan dengan "akh"',
        }),
      confirmPassword: Joi.string().required().min(6).max(10),
    })
      .custom((value, helpers) => {
        if (value.password !== value.confirmPassword) {
          return helpers.error("register.password.different");
        }
        return value;
      })
      .messages({
        "register.password.different": "Password & confirm password harus sama",
      });

    const request = {
      username: "akhsan@gmail.com",
      password: "benarbayu",
      confirmPassword: "salahbayu",
    };

    const result = registerSchema.validate(request, {
      abortEarly: false,
    });
    console.info(result);
  });
});
