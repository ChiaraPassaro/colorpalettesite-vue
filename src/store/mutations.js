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
  SET_COMPLEMENTAR_PALETTE: "SET_COMPLEMENTAR_PALETTE",
  SET_OPEN_PALETTE: "SET_OPEN_PALETTE",
  SET_TOTAL_OPEN_PALETTE: "SET_TOTAL_OPEN_PALETTE",
  SET_OPEN_FEEDBACK: "SET_OPEN_FEEDBACK",
  SET_NUMBER_START_SQUARE_COLORS: "SET_NUMBER_START_SQUARE_COLORS"
};

//todo non si possono salvare funzioni in local storage, conservare solo dati per generare colori eliminare tutti i colors e calcolarli in init

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

    state.generated = localStorage.getItem("generated") || state.generated;
    state.cssColor = localStorage.getItem("cssColor") || state.cssColor;
    state.color = new state.ColorPalettesRange.Hsl(
      state.degree,
      state.saturation,
      state.brightness
    );

    //todo add palettes
    /***
     * Object Palette
     */
    state.palettes.palette = state.color
      ? new state.ColorPalettesRange.SetColorPalette(state.color)
      : {};

    /***
     * Random
     */
    state.palettes.random.number =
      localStorage.getItem("Random.number") || state.palettes.random.number;
    state.palettes.random.percDominant =
      localStorage.getItem("Random.percDominant") ||
      state.palettes.random.percDominant;
    state.palettes.random.step =
      localStorage.getItem("Random.step") || state.palettes.random.step;

    /***
     * Complementary
     */
    state.palettes.complementary.step =
      localStorage.getItem("Complementary.step") ||
      state.palettes.complementary.step;
    state.palettes.complementary.number =
      localStorage.getItem("Complementary.number") ||
      state.palettes.complementary.number;

    /***
     * SplitComplementary
     */
    state.palettes.splitComplementary.step =
      localStorage.getItem("SplitComplementary.step") ||
      state.palettes.splitComplementary.step;

    /***
     * Triad
     */
    state.palettes.triad.step =
      localStorage.getItem("Triad.step") || state.palettes.triad.step;
  },
  [types.GENERATE_PALETTES](state, palettes) {
    state.palettes.palette = palettes;
  },
  [types.SET_DATA_PALETTES](state, payload) {
    console.log(payload.data.type, payload.data.name);
    state.palettes[payload.data.type][payload.data.name] = payload.data.value;
    const namePalette =
      payload.data.type[0].toUpperCase() + payload.data.type.substring(1);
    console.log(`${namePalette}.${payload.data.name}`);

    localStorage.setItem(
      `${namePalette}.${payload.data.name}`,
      state.palettes[payload.data.type][payload.data.name]
    );
  },
  [types.SET_RANDOM_PALETTE](state, payload) {
    state.palettes.random.colors = payload.colors;
    state.palettes.random.step = payload.step;
    localStorage.setItem("Random.step", state.palettes.random.step);
  },
  [types.SET_COMPLEMENTAR_PALETTE](state, payload) {
    state.palettes.complementary.colors = payload.colors;
  },
  [types.SET_TRIAD_PALETTE](state, payload) {
    state.palettes.triad.colors = payload.colors;
    state.palettes.triad.step = payload.step;
  },
  [types.SET_SPLITCOMPLEMENTAR_PALETTE](state, payload) {
    state.palettes.splitComplementary.colors = payload.colors;
    state.palettes.splitComplementary.step = payload.step;
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
