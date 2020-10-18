import { ref, Ref } from 'vue';

export const useScript = (src: string): Ref<boolean> => {
    const scriptLoaded = ref(false);
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.async = true;

    window.document.body.appendChild(script);

    script.addEventListener('load', () => {
        scriptLoaded.value = true;
    });

    return scriptLoaded;
};
