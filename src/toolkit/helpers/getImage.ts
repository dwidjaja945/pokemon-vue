export const getImageMixin = {
    methods: {
        getImage(id: number | string) {
            return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        },
    },
};
