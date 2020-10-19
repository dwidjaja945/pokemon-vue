import { ref, Ref, reactive } from 'vue';

interface UseScript {
  [key: string]: Ref<boolean>;
}

export const useScript = (src: string): UseScript => {
    const output = {
        loaded: ref(false),
        error: ref(false),
    };
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;

    window.document.body.appendChild(script);

    script.addEventListener('load', () => {
        output.loaded.value = true;
    });

    return output;
};
