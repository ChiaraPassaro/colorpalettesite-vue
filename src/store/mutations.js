export const types = {
  UPDATE_BRIGHTNESS: "UPDATE_BRIGHTNESS",
  UPDATE_SATURATION: "UPDATE_SATURATION",
  UPDATE_DEGREE: "UPDATE_DEGREE",
  GENERATE_COLOR: "GENERATE_COLOR",
  ERROR_COLOR: "ERROR_COLOR",
  INIT_STORE: "INIT_STORE",
  GENERATE_PALETTES: "GENERATE",
  SET_RANDOM: "SET_RANDOM"
};

export const mutations = {
  [types.UPDATE_BRIGHTNESS](state, number) {
    state.brightness = number;
    localStorage.setItem("brightness", state.brightness);
  },
  [types.UPDATE_SATURATION](state, number) {
    state.saturation = number;
    localStorage.setItem("saturation", state.saturation);
  },
  [types.UPDATE_DEGREE](state, number) {
    state.degree = number;
    localStorage.setItem("degree", state.degree);
  },
  [types.GENERATE_COLOR](state) {
    const color = new state.ColorPalettesRange.Hsl(
      state.degree,
      state.saturation,
      state.brightness
    );
    state.generated = true;
    state.color = color;
    state.cssColor = color.printHsl();
    localStorage.setItem("cssColor", state.cssColor);
    localStorage.setItem("generated", state.generated);
    localStorage.setItem("color", state.color);
  },
  [types.ERROR_COLOR](state, payload) {
    state.error[payload.typeError] = payload.messageError;
  },
  [types.INIT_STORE](state) {
    state.degree = parseFloat(localStorage.getItem("degree")) || state.degree;
    state.saturation =
      parseFloat(localStorage.getItem("saturation")) || state.saturation;
    state.brightness =
      parseFloat(localStorage.getItem("brightness")) || state.brightness;
    state.cssColor = localStorage.getItem("cssColor") || state.cssColor;
    state.generated = localStorage.getItem("generated") || state.generated;
    state.color = new state.ColorPalettesRange.Hsl(
      state.degree,
      state.saturation,
      state.brightness
    );
  },
  [types.GENERATE_PALETTES](state, palettes) {
    state.palettes = palettes;
  },
  [types.SET_RANDOM](state, payload) {
    state.random.number = payload.number;
    state.random.step = payload.stepDegree;
    console.log(state.random.number, state.random.step);
  }
};
