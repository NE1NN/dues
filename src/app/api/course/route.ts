import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export const GET = async (req: NextRequest) => {
  const courses = await prisma.course.findMany();
  console.log(courses)
  return NextResponse.json(courses);
};