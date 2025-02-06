import { NextResponse } from 'next/server';
import { OperatorController } from './controller';

export async function GET() {
  try {
    const controller = new OperatorController();
    const operators = await controller.getOperators();
    return NextResponse.json(operators);
  } catch (error) {
    console.error('Error fetching operators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch operator data' },
      { status: 500 }
    );
  }
} 