import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as typeof global & { prisma: PrismaClient }
 
export const Database = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = Database