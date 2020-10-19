export const getImageMixin = {
    methods: {
        getImage(id: string) {
            return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        },
    },
};
