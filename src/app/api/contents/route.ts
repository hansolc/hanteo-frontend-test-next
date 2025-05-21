import { NextRequest, NextResponse } from 'next/server';

export type ContentsType = {
  keys: 'charts' | 'whook' | 'events' | 'news' | 'stores' | 'charge';
  contentsInfo: {
    id: string;
    img: string;
    ranking: number;
    title: string;
    artist: string;
  };
};

const contentsTypeObj: Record<ContentsType['keys'], []> = {
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
  key = 'charts',
}: {
  limit: number;
  skip: number;
  key?: string;
}): Array<ContentsType['contentsInfo']> => {
  return Array.from({ length: limit }, (_, idx) => {
    return {
      id: `id_${key}_${idx + skip + 1}`,
      img: '',
      title: `title${idx + skip + 1}`,
      artist: `artist${idx + skip + 1}`,
      ranking: idx + skip + 1,
    };
  });
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);

    if (!key) {
      return NextResponse.json(
        { error: 'Missing key parameter' },
        { status: 400 }
      );
    }

    if (!(key in contentsTypeObj)) {
      return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
    }

    const result = getContentsData({ limit, skip, key });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
