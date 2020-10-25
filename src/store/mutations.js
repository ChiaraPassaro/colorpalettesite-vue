export const types = {
    UPDATE_BRIGHTNESS: 'UPDATE_BRIGHTNESS',
    UPDATE_SATURATION: 'UPDATE_SATURATION',
    UPDATE_DEGREE: 'UPDATE_DEGREE',
    GENERATE_COLOR: 'GENERATE_COLOR',
    ERROR_COLOR: 'ERROR_COLOR',
};

export const mutations = {
    [types.UPDATE_BRIGHTNESS](state, number) {
        state.brightness = number;
    },
    [types.UPDATE_SATURATION](state, number) {
        state.saturation = number;
    },
    [types.UPDATE_DEGREE](state, number) {
        state.degree = number;
    },
    [types.GENERATE_COLOR](state) {
        const color = new state.ColorPalettesRange.Hsl(state.degree, state.saturation, state.brightness);
        state.generated = true;
        state.color = color;
        state.cssColor = color.printHsl();
    },
    [types.ERROR_COLOR](state, payload) {
        state.error[payload.typeError] = payload.messageError;
    },
};