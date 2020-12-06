export const types = {
  UPDATE_BRIGHTNESS: "UPDATE_BRIGHTNESS",
  UPDATE_SATURATION: "UPDATE_SATURATION",
  UPDATE_DEGREE: "UPDATE_DEGREE",
  GENERATE_COLOR: "GENERATE_COLOR",
  ERROR_COLOR: "ERROR_COLOR",
  INIT_STORE: "INIT_STORE",
  GENERATE_PALETTES: "GENERATE_PALETTES",
  SET_DATA_PALETTES: "SET_DATA_PALETTES",
  SET_RANDOM_PALETTE: "SET_RANDOM_PALETTE",
  SET_TRIAD_PALETTE: "SET_TRIAD_PALETTE",
  SET_SPLITCOMPLEMENTAR_PALETTE: "SET_SPLITCOMPLEMENTAR_PALETTE",
  SET_COMPLEMENTAR_NUMBER: "SET_COMPLEMENTAR_NUMBER",
  SET_COMPLEMENTAR_STEP: "SET_COMPLEMENTAR_STEP",
  SET_COMPLEMENTAR_PALETTE: "SET_COMPLEMENTAR_PALETTE",
  SET_OPEN_PALETTE: "SET_OPEN_PALETTE",
  SET_TOTAL_OPEN_PALETTE: "SET_TOTAL_OPEN_PALETTE",
  SET_OPEN_FEEDBACK: "SET_OPEN_FEEDBACK",
  SET_NUMBER_START_SQUARE_COLORS: "SET_NUMBER_START_SQUARE_COLORS"
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

    //todo add palettes
    state.palettes.random.number =
      localStorage.getItem("Random.number") || state.palettes.random.number;
    state.palettes.random.percDominant =
      localStorage.getItem("Random.percDominant") ||
      state.palettes.random.percDominant;
    state.palettes.random.step =
      localStorage.getItem("Random.step") || state.palettes.random.step;

    state.palettes.complementary.step =
      localStorage.getItem("Complementary.step") ||
      state.palettes.complementary.step;
    state.palettes.complementary.number =
      localStorage.getItem("Complementary.number") ||
      state.palettes.complementary.number;
    state.palettes.complementary.colors =
      localStorage.getItem("Complementary.colors") ||
      state.palettes.complementary.colors;

    state.palettes.splitComplementary.step =
      localStorage.getItem("SplitComplementary.step") ||
      state.palettes.splitComplementary.step;
    state.palettes.splitComplementary.colors =
      localStorage.getItem("SplitComplementary.colors") ||
      state.palettes.splitComplementary.colors;

    state.palettes.triad.colors =
      localStorage.getItem("Triad.colors") || state.palettes.triad.colors;
    state.palettes.triad.step =
      localStorage.getItem("Triad.step") || state.palettes.triad.step;

    state.palettes.palette = state.color
      ? new state.ColorPalettesRange.SetColorPalette(state.color)
      : {};
  },
  [types.GENERATE_PALETTES](state, palettes) {
    state.palettes.palette = palettes;
  },
  [types.SET_DATA_PALETTES](state, payload) {
    state.palettes[payload.data.type][payload.data.name] = payload.data.value;
    localStorage.setItem(
      `Random.${payload.data.name}`,
      state.palettes[payload.data.type][payload.data.name]
    );
  },
  [types.SET_RANDOM_PALETTE](state, payload) {
    state.palettes.random.colors = payload.colors;
    state.palettes.random.step = payload.step;
    localStorage.setItem("Random.colors", state.palettes.random.colors);
    localStorage.setItem("Random.step", state.palettes.random.step);
  },
  [types.SET_COMPLEMENTAR_NUMBER](state, payload) {
    state.palettes.complementary.number = parseInt(payload.number);

    localStorage.setItem(
      "Complementary.number",
      state.palettes.complementary.number
    );
  },
  [types.SET_COMPLEMENTAR_STEP](state, payload) {
    state.palettes.complementary.step = parseFloat(payload.step);

    localStorage.setItem(
      "Complementary.step",
      state.palettes.complementary.step
    );
  },
  [types.SET_COMPLEMENTAR_PALETTE](state, payload) {
    state.palettes.complementary.colors = payload.colors;
    localStorage.setItem(
      "Complementary.colors",
      state.palettes.complementary.colors
    );
  },
  [types.SET_TRIAD_PALETTE](state, payload) {
    state.palettes.triad.colors = payload.colors;
    state.palettes.triad.step = payload.step;

    localStorage.setItem("Triad.colors", state.palettes.triad.colors);
    localStorage.setItem("Triad.step", state.palettes.triad.step);
  },
  [types.SET_SPLITCOMPLEMENTAR_PALETTE](state, payload) {
    state.palettes.splitComplementary.colors = payload.colors;
    state.palettes.splitComplementary.step = payload.step;

    localStorage.setItem(
      "SplitComplementary.colors",
      state.palettes.splitComplementary.colors
    );
    localStorage.setItem(
      "SplitComplementary.step",
      state.palettes.splitComplementary.step
    );
  },
  [types.SET_OPEN_PALETTE](state, payload) {
    this.state.palettes.open = payload.open;
  },
  [types.SET_TOTAL_OPEN_PALETTE](state, payload) {
    this.state.palettes.totalOpen = payload.totalOpen;
  },
  [types.SET_OPEN_FEEDBACK](state, payload) {
    this.state.feedback.status = payload.status;
    this.state.feedback.message = payload.message;
  },
  [types.SET_NUMBER_START_SQUARE_COLORS](state, payload) {
    this.state.palettes.numberStartSquareColors =
      payload.numberStartSquareColors;
  }
};
