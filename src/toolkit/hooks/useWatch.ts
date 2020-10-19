import { watch } from 'vue';

interface WatchList {
  [key: string]: () => void;
}

export const useWatch = (fn: any, ...params: any[]): WatchList => {
    const watchList = params.reduce<WatchList>((accum, curr) =>
        accum[curr] = fn, {});
    return watchList;
};
