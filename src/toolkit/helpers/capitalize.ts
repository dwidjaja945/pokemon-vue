export const capitalizeMixin = {
    methods: {
        capitalize(input: string): string {
            if (!input) return '';
            const inputArray = input.split('');
            inputArray[0] = inputArray[0].toUpperCase();
            return inputArray.join('');
        },
    },
};
