import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Create the new category
    const { name } = await req.json();
    const newCategory = await prisma.categories.create({
      data: {
        name,
      },
    });

    // Log the created category
    console.log('Created category:', newCategory);

    // Return the newly created category
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);

    // Return an error response
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    // Retrieve all categories
    const allCategories = await prisma.categories.findMany();

    // Log the retrieved categories
    console.log('All categories:', allCategories);

    // Return the data in the response along with a 200 status code
    return NextResponse.json({ data: allCategories }, { status: 200 });
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);

    // Return an error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function PUT(categoryId: string, newName: string) {
  try {
    // Update the category with the provided category ID
    const updatedCategory = await prisma.categories.update({
      where: { id: categoryId },
      data: { name: newName },
    });

    // Log the updated category
    console.log('Updated category:', updatedCategory);

    // Return the updated category
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    // Log any errors that occur during the update process
    console.error('Error:', error);

    // Return an error response
    return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function DELETE(categoryId: string) {
  try {
    // Delete the category by its ID
    await prisma.categories.delete({ where: { id: categoryId } });

    // Log the deleted category
    console.log('Deleted category with ID:', categoryId);

    // Return a success response with a 200 status code
    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error('Error:', error);

    // Return an error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}


