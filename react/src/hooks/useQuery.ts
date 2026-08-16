import { useCallback, useState } from 'react';

export type UseQueryOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export function useQuery<
  Data,
  Fn extends (...args: any[]) => Promise<Data>,
  Args extends Parameters<Fn>
>(fn: Fn, options?: UseQueryOptions<Data>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Data>();

  const query = useCallback(
    async (...args: Args) => {
      setLoading(true);
      setError(undefined);

      let res: Data | undefined = undefined;
      try {
        res = await fn(...args);
        if (options?.onSuccess) options?.onSuccess(res);
        setData(res);
      } catch (e: any) {
        setError(e);
        if (options?.onError) options.onError(e);
      }

      setLoading(false);
      return res;
    },
    [fn, options?.onError, options?.onSuccess]
  );

  return [query as Fn, { data, loading, error }] as const;
}
