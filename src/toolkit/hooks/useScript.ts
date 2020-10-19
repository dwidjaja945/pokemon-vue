import { ref, Ref } from 'vue';

interface UseScript {
  [key: string]: Ref<boolean>;
}

export const useScript = (src: string): UseScript => {
    const scriptLoaded = ref(false);
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;

    window.document.body.appendChild(script);

    script.addEventListener('load', () => {
        scriptLoaded.value = true;
    });

    return { loaded: scriptLoaded };
};
