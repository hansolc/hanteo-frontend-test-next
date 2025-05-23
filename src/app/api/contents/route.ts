import { ContentsListResponse } from '@/schema/contents';
import { ContentsTabs } from '@/types/contents';
import { NextRequest, NextResponse } from 'next/server';

const contentsTypeObj: Record<ContentsTabs, []> = {
  charts: [],
  whook: [],
  events: [],
  news: [],
  stores: [],
  charge: [],
} as const;

const getContentsData = ({
  limit,
  skip,
  tab = 'charts',
}: {
  limit: number;
  skip: number;
  tab?: string;
}): ContentsListResponse['contents'] => {
  return Array.from({ length: limit }, (_, idx) => {
    return {
      id: `id_${tab}_${idx + skip + 1}`,
      img: '/sample.jpg',
      title: `제목: ${tab}의 ${idx + skip + 1}번째 제목`,
      artist: `서브제목: ${tab}의 ${idx + skip + 1}번째 서브제목`,
      ranking: idx + skip + 1,
    };
  });
};

export async function GET(request: NextRequest) {
  try {
    // delay for test
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab');
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    if (!tab) {
      return NextResponse.json(
        { error: 'Missing key parameter' },
        { status: 400 }
      );
    }

    if (!(tab in contentsTypeObj)) {
      return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
    }

    const result = getContentsData({ limit, skip, tab });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: '알 수 없는 오류입니다.' },
      { status: 500 }
    );
  }
}
