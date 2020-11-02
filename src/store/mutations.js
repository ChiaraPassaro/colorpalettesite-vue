export const types = {
  UPDATE_BRIGHTNESS: "UPDATE_BRIGHTNESS",
  UPDATE_SATURATION: "UPDATE_SATURATION",
  UPDATE_DEGREE: "UPDATE_DEGREE",
  GENERATE_COLOR: "GENERATE_COLOR",
  ERROR_COLOR: "ERROR_COLOR",
  INIT_STORE: "INIT_STORE",
  GENERATE_PALETTES: "GENERATE",
  SET_RANDOM_DATA: "SET_RANDOM",
  SET_RANDOM_PALETTE: 'SET_RANDOM_PALETTE',
  SET_OPEN_PALETTE: 'SET_OPEN_PALETTE'
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
    state.palettes.random.number = localStorage.getItem("random.number") || state.palettes.random.number;
    state.palettes.random.percDominant = localStorage.getItem("random.percDominant") || state.palettes.random.percDominant;
    state.palettes.random.step = localStorage.getItem("random.step") || state.palettes.random.step;
    state.palettes.palette = (state.color) ? new state.ColorPalettesRange.SetColorPalette(state.color) : undefined;
  },
  [types.GENERATE_PALETTES](state, palettes) {
    state.palettes.palette = palettes;
  },
  [types.SET_RANDOM_DATA](state, payload) {
    state.palettes.random.number = payload.number;
    state.palettes.random.percDominant = payload.percDominant;
    localStorage.setItem("random.number", state.palettes.random.number);
    localStorage.setItem("random.percDominant", state.palettes.random.percDominant);
  },
  [types.SET_RANDOM_PALETTE](state, payload) {
    state.palettes.random.colors = payload.colors;
    state.palettes.random.step = payload.step;
    localStorage.setItem("random.colors", state.palettes.random.colors);
    localStorage.setItem("random.step", state.palettes.random.step);
  },
  [types.SET_OPEN_PALETTE](state, payload) {
    this.state.palettes.open = payload.open;
  }
};
