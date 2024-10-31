import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userService = {
  async getAllUsers() {
    return prisma.user.findMany();
  },

  async getUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  async createUser(data: {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    console.log(data);
    return prisma.user.create({ data });
  },

  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  },
};
