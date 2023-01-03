import { prisma } from "~/server/db/client";
import { json, type APIEvent } from "solid-start";

export async function GET() {
  return json(await prisma.student.findMany());
}
