import { ref, Ref, reactive } from 'vue';

type UseScript = {
  [key: string]: Ref<boolean>;
} & {
  unMount?(): void;
}

export const useScript = (src: string): UseScript => {
    const output: UseScript = {
        scriptLoaded: ref(false),
        scriptError: ref(false),
    };
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;

    window.document.body.appendChild(script);

    const handleLoad = (): void => {
        output.scriptLoaded.value = true;
    };
    const handleError = (): void => {
        output.scriptError.value = true;
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    output.unMount = (): void => {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError);
    };

    return output;
};
