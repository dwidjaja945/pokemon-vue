import { ComponentOptions } from 'vue';

interface WatchList {
  [key: string]: () => void;
}

export const useWatch = (fn: any, ...params: string[]): WatchList =>
    params.reduce<WatchList>((accum, curr) =>
        accum[curr] = fn, {});

export const useWatchMixin = (fn: Function, ...params: string[]): ComponentOptions => ({
    watch: {
        ...useWatch(fn, ...params),
    },
});
