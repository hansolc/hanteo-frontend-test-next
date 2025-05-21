type ContentsTabs =
  | 'charts'
  | 'whook'
  | 'events'
  | 'news'
  | 'stores'
  | 'charge';

interface ContentsRequestType {
  tab: ContentsTabs;
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

export type { ContentsTabs, ContentsRequestType, ContentsInfo };
