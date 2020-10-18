import { watch } from 'vue';

interface WatchList {
  [key: string]: () => void;
}

export const useWatch = (fn: any, ...params: any[]): WatchList => {
    const watchList: WatchList = {};
    params.forEach((param): void => { watchList[param] = fn; });
    return watchList;
};
