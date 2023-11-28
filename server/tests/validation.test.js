const Joi = require("joi");

describe("Joi", () => {
  it("should can create schema", () => {
    const schema = Joi.string().min(3).max(100).required();

    const result = schema.validate("sa");
    if (result.error) console.info(result.error);
  });

  it("should can validate basic data types", () => {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(100000);

    const resultUsername = usernameSchema.validate("akhsan");
    const resultIsAdmin = isAdminSchema.validate("true");
    const resultPrice = priceSchema.validate("10000");

    console.info(resultUsername);
    console.info(resultIsAdmin);
    console.info(resultPrice);
  });

  it("should can validate date", () => {
    const birthDateSchema = Joi.date().required().max("now").min("1-1-1990");

    const result = birthDateSchema.validate("1-1-1989");
    console.info(result.value);
    console.info(result.error);

    const result2 = birthDateSchema.validate("12-2-2022");
    console.info(result2.value);
    console.info(result2.error);

    const result3 = birthDateSchema.validate("12-2-2026");
    console.info(result3.value);
    console.info(result3.error);
  });

  it("should return validation error", () => {
    const usernameSchema = Joi.string().min(5).email().required();

    const result = usernameSchema.validate("ups", {
      abortEarly: false,
    });
    console.info(result.value);

    if (result.error) {
      result.error.details.forEach((detail) => {
        console.info(`${detail.path} = ${detail.message}`);
      });
    }
  });

  it("should can validate object", () => {
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string().required().min(6).max(100),
    });

    const request = {
      username: "akhsan@gmail.com",
      password: "bayurian",
    };

    const result = loginSchema.validate(request, {
      abortEarly: false,
    });

    console.info(result);
  });

  it("should can validate nested object", () => {
    const createUserSchema = Joi.object({
      id: Joi.string().required().max(100),
      name: Joi.string().required().max(100),
      address: Joi.object({
        street: Joi.string().required().max(200),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(10),
      }).required(),
    });

    const request = {
      // username: "akhsan@gmail.com",
      // password: "bayurian",
      address: {},
    };

    const result = createUserSchema.validate(request, {
      abortEarly: false,
    });

    console.info(result);

    result.error.details.forEach((detail) => {
      console.info(`${detail.path} : ${detail.message}`);
    });
  });

  it("should can validate array", () => {
    const hobbiesSchema = Joi.array().items(Joi.string().required().min(3).max(100)).min(1).unique();

    const hobbies = ["A", "Reading", "Coding", "Coding"];

    const result = hobbiesSchema.validate(hobbies, {
      abortEarly: false,
    });

    console.info(result);
  });

  it("should can validate array", () => {
    const addressSchema = Joi.array()
      .items(
        Joi.object({
          street: Joi.string().required().max(200),
          city: Joi.string().required().max(100),
          country: Joi.string().required().max(100),
          zipCode: Joi.string().required().max(10),
        })
      )
      .min(1);

    const address = [
      {
        street: "Jalan belum ada",
      },
    ];

    const result = addressSchema.validate(address, {
      abortEarly: false,
    });

    console.info(result);
  });
});
