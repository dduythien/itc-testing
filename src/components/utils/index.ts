type FetcherArgs = Parameters<typeof fetch>;
type FetcherReturn<T> = Promise<T>;

const fetcher = <T>(...args: FetcherArgs): FetcherReturn<T> => {
  return fetch(...args).then((res) => res.json() as T);
};

const fetchers = async (urls: string[]) => {
  // If we received an array of URLs, fetch them all in parallel
  if (Array.isArray(urls)) {
    const responses = await Promise.all(
      urls.map((url) => fetch(url).then((r) => r.json()))
    );
    return responses;
  }

  // Otherwise, handle single URL case
  const response = await fetch(urls);
  return response.json();
};

export { fetcher, fetchers };
