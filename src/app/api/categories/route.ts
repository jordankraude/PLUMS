import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Retrieve all categories
    const allCategories = await prisma.categories.findMany();

    // Log the retrieved categories
    console.log('All categories:', allCategories);

    // Return the data in the response along with a 200 status code
    return NextResponse.json({
      data: allCategories
    }, {
      status: 200
    });
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Internal Server Error'
    }, {
      status: 500
    });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
