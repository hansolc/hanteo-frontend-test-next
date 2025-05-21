import { contentListSchema, ContentsListResponse } from '@/schema/contents';
import { ActionResult } from '@/types/action';
import { ContentsRequestType } from '@/types/contents';

export const getContentsByKey = async ({
  key,
  limit = 30,
  skip = 0,
}: ContentsRequestType): Promise<ActionResult<ContentsListResponse>> => {
  try {
    const params = new URLSearchParams({
      key,
      limit: String(limit),
      skip: String(skip),
    });

    const res = await fetch(`/api/contents?${params.toString()}`);

    if (res.status === 400) {
      return {
        status: 'error',
        error: '키 값이 없거나 부적절한 키입니다.',
      };
    }
    const jsonData = res.json();

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
