type ContentsKey = 'charts' | 'whook' | 'events' | 'news' | 'stores' | 'charge';

interface ContentsRequestType {
  key: ContentsKey;
  limit?: number;
  skip?: number;
}

interface ContentsInfo {
  id: string;
  img: string;
  ranking: number;
  title: string;
  artist: string;
}

export type { ContentsKey, ContentsRequestType, ContentsInfo };
