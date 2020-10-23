export const types = {
    UPDATE_BRIGHTNESS: 'UPDATE_BRIGHTNESS',
    UPDATE_SATURATION: 'UPDATE_SATURATION',
    UPDATE_DEGREE: 'UPDATE_DEGREE',
    GENERATE_COLOR: 'GENERATE_COLOR',
    ERROR_COLOR: 'ERROR_COLOR',
};

export const mutations = {
    [types.UPDATE_BRIGHTNESS](state, number) {
        if(number <= 100 && number >= 0) {
            state.brightness =  parseFloat(number);
        }
    },
    [types.UPDATE_SATURATION](state, number) {
        if(number <= 100 && number >= 0) {
            state.saturation = parseFloat(number);
        }
    },
    [types.UPDATE_DEGREE](state, number) {
        if(number <= 360 && number >= 0) {
            state.degree = parseFloat(number);
        }
    },
    [types.GENERATE_COLOR](state) {
        const color = new state.ColorPalettesRange.Hsl(state.degree, state.saturation, state.brightness);
        state.color = color;
        state.cssColor = color.printHsl();
    },
    [types.ERROR_COLOR](state, payload) {
        console.log( payload.errorMessage)
        state.error[payload.typeError] = payload.errorMessage;
    },
};
