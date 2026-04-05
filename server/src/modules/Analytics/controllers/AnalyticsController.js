import getDashboardAnalytics from '@/services/AnalyticsService.js';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const analytics = await getDashboardAnalytics(session.user.id);

    return NextResponse.json({
      success: true,
      data: analytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Dashboard Analytics] GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard analytics', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    return NextResponse.json(
      {
        success: true,
        message: 'Transaction created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Dashboard Analytics] POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create resource', message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {}

export async function DELETE(request) {}