export const types = {
    UPDATE_BRIGHTNESS: 'UPDATE_BRIGHTNESS',
    UPDATE_SATURATION: 'UPDATE_SATURATION',
    UPDATE_DEGREE: 'UPDATE_DEGREE',
    GENERATE_COLOR: 'GENERATE_COLOR',
    ERROR_COLOR: 'ERROR_COLOR',
    INIT_STORE: 'INIT_STORE'
};

export const mutations = {
    [types.UPDATE_BRIGHTNESS](state, number) {
        state.brightness = number;
        localStorage.setItem('brightness', state.brightness);
    },
    [types.UPDATE_SATURATION](state, number) {
        state.saturation = number;
        localStorage.setItem('saturation', state.saturation);
    },
    [types.UPDATE_DEGREE](state, number) {
        state.degree = number;
        localStorage.setItem('degree', state.degree);
    },
    [types.GENERATE_COLOR](state) {
        const color = new state.ColorPalettesRange.Hsl(state.degree, state.saturation, state.brightness);
        state.generated = true;
        state.color = color;
        state.cssColor = color.printHsl();
        localStorage.setItem('cssColor', state.cssColor);
    },
    [types.ERROR_COLOR](state, payload) {
        state.error[payload.typeError] = payload.messageError;
    },
    [types.INIT_STORE](state) {
        state.degree = parseFloat(localStorage.getItem('degree')) || state.degree;
        state.saturation = parseFloat(localStorage.getItem('saturation')) || state.saturation;
        state.brightness = parseFloat(localStorage.getItem('brightness')) || state.brightness;
        state.cssColor = localStorage.getItem('cssColor') || state.cssColor;

    },
};