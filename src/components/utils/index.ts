type FetcherArgs = Parameters<typeof fetch>;
type FetcherReturn<T> = Promise<T>;

const fetcher = <T>(...args: FetcherArgs): FetcherReturn<T> => {
  return fetch(...args).then((res) => res.json() as T);
};

export { fetcher };
