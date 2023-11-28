import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return await prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestContact = async () => {
  return await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestContact = async () => {
  return await prismaClient.contact.create({
    data: {
      username: "test",
      first_name: "test",
      last_name: "test",
      email: "test@gmail.com",
      phone: "099329323",
    },
  });
};

export const getTestContact = async () => {
  return await prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

export const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: "test",
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@gmail.com`,
        phone: `099329323${i}`,
      },
    });
  }
};

export const removeAllTestAddress = async () => {
  return await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};

export const createTestAddress = async () => {
  const contact = await getTestContact();
  return await prismaClient.address.create({
    data: {
      contact_id: contact.id,
      street: "jalan test",
      city: "kota test",
      province: "provinsi test",
      country: "indonesia",
      postal_code: "233223",
    },
  });
};

export const getTestAddress = async () => {
  return await prismaClient.address.findFirst({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};
