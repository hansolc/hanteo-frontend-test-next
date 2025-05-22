import { contentListSchema, ContentsListResponse } from '@/schema/contents';
import { ActionResult } from '@/types/action';
import { ContentsRequestType } from '@/types/contents';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getContentsBytab = async ({
  tab,
  limit = 30,
  skip = 0,
}: ContentsRequestType): Promise<ActionResult<ContentsListResponse>> => {
  try {
    const params = new URLSearchParams({
      tab,
      limit: String(limit),
      skip: String(skip),
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/contents?${params.toString()}`
    );

    if (res.status === 400) {
      return {
        status: 'error',
        error: '키 값이 없거나 부적절한 키입니다.',
      };
    }
    const jsonData = await res.json();

    // await delay(3000);

    const { success, data } = contentListSchema.safeParse(jsonData);

    if (!success) {
      return {
        status: 'error',
        error: '예상치 못한 데이터 형식입니다.',
      };
    }

    return {
      status: 'success',
      data: {
        contents: data,
        limit: limit,
        skip: skip,
        total: 150,
      },
    };
  } catch (error) {
    return { status: 'error', error: '알수없는 오류 입니다.' };
  }
};
