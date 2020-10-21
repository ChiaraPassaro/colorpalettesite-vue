export const types = {
    UPDATE_BRIGHTNESS: 'UPDATE_BRIGHTNESS',
    UPDATE_SATURATION: 'UPDATE_SATURATION',
    UPDATE_DEGREE: 'UPDATE_DEGREE',
    GENERATE_COLOR: 'GENERATE_COLOR',
};

export const mutations = {
    [types.UPDATE_BRIGHTNESS](state, number) {
        state.brightness =  parseFloat(number);
    },
    [types.UPDATE_SATURATION](state, number) {
        state.saturation = parseFloat(number);
    },
    [types.UPDATE_DEGREE](state, number) {
        console.log(number)
        state.degree = parseFloat(number);
    },
    [types.GENERATE_COLOR](state) {
        console.log(state.degree, state.saturation, state.brightness);
        const color = new state.ColorPalettesRange.Hsl(state.degree, state.saturation, state.brightness);
        state.color = color;
        state.cssColor = color.printHsl();
    },
};
