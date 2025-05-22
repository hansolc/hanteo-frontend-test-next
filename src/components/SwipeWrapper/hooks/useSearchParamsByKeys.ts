import { isValidValue } from '@/utils/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type SetParamFn<T> = <K extends keyof T>(key: K, value: T[K]) => void;

const useSearchParamsByKeys = <T extends Record<string, string>>({
  initial,
  validKeys,
}: {
  initial: T;
  validKeys: {
    [K in keyof T]: T[K][];
  };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;

    for (const key in initial) {
      const param = searchParams.get(key);
      const validList = validKeys?.[key];

      // url에 key 가 등록되지 않은 경우 초기값
      if (!param) {
        params.set(key, String(initial[key]));
        changed = true;
      }
      // key가 있지만 validKeys에 등록되지 않은 경우 첫번째 인덱스 value 로 설정
      else if (!isValidValue(param, validList)) {
        params.set(key, String(validList[0]));
        changed = true;
      }
    }
    console.log(params.toString());
    if (changed) {
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, []);

  const setParam: SetParamFn<T> = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(String(key), String(value));
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  return { setParam };
};

export default useSearchParamsByKeys;
