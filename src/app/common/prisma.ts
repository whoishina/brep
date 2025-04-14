import { PrismaClient } from "@prisma/client";
import Elysia from "elysia";

const prisma = new PrismaClient();
export const usePrisma = new Elysia().decorate("prisma", prisma);
export default prisma;
