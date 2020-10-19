interface WatchList {
  [key: string]: () => void;
}

export const useWatch = (fn: any, ...params: string[]): WatchList =>
    params.reduce<WatchList>((accum, curr) =>
        accum[curr] = fn, {});
