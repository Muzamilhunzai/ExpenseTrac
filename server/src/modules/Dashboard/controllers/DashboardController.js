// app/api/analytics/route.js
import getDashboardAnalytics from '@/services/DashboarServicejs';
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
    console.error('[Analytics Controller] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard analytics', message: error.message },
      { status: 500 }
    );
  }
}