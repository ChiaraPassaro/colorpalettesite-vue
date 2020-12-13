import Vue from "vue";
import Vuex from "vuex";
import actions from "@/store/actions";
import { mutations } from "@/store/mutations";

const ColorPalettesRange = require("@chiarapassaro/color-palettes-range/src/js");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ColorPalettesRange,
    degree: 360,
    saturation: 80,
    brightness: 50,
    color: undefined,
    cssColor: "",
    generated: false,
    error: {
      brightness: "",
      saturation: "",
      degree: ""
    },
    palettes: {
      open: false,
      totalOpen: false,
      palette: undefined,
      numberStartSquareColors: 0,
      random: {
        colors: {},
        step: 360, //all degree
        number: 10,
        percDominant: 50
      },
      triad: {
        colors: {},
        step: 0
      },
      splitComplementary: {
        colors: {},
        step: 0
      },
      complementary: {
        colors: {},
        step: 10,
        number: 4
      },
      analogous: {
        colors: {},
        step: 10,
        number: 4,
        typeScheme: "allArch"
      }
    },
    feedback: {
      message: "",
      status: false
    }
  },
  mutations,
  actions,
  getters: {
    baseColor: state => state.color,
    getDegree: state => state.degree,
    getSaturation: state => state.saturation,
    getBrightness: state => state.brightness,
    getCssColor: state => state.cssColor,
    getColors(state) {
      return palette => {
        console.log(
          Object.prototype.hasOwnProperty.call(state.palettes, palette),
          state.palettes[palette]
        );
        return Object.prototype.hasOwnProperty.call(state.palettes, palette)
          ? state.palettes[palette].colors
          : false;
      };
    },
    getNumber(state) {
      return palette => {
        return Object.prototype.hasOwnProperty.call(state.palettes, palette) &&
          Object.prototype.hasOwnProperty.call(
            state.palettes[palette],
            "number"
          )
          ? state.palettes[palette].number
          : false;
      };
    },
    getStep(state) {
      return palette => {
        return Object.prototype.hasOwnProperty.call(state.palettes, palette) &&
          Object.prototype.hasOwnProperty.call(state.palettes[palette], "step")
          ? state.palettes[palette].step
          : false;
      };
    },
    getPalette(state) {
      return palette => {
        return Object.prototype.hasOwnProperty.call(state.palettes, palette)
          ? state.palettes[palette]
          : false;
      };
    },
    getPercDominant(state) {
      return palette => {
        return Object.prototype.hasOwnProperty.call(state.palettes, palette) &&
          Object.prototype.hasOwnProperty.call(
            state.palettes[palette],
            "percDominant"
          )
          ? state.palettes[palette].percDominant
          : false;
      };
    },
    getTypeScheme(state) {
      return palette => {
        return Object.prototype.hasOwnProperty.call(state.palettes, palette) &&
          Object.prototype.hasOwnProperty.call(
            state.palettes[palette],
            "typeScheme"
          )
          ? state.palettes[palette].typeScheme
          : false;
      };
    },
    ColorPaletteObject: state => state.ColorPalettesRange,
    PaletteObject: state => state.palettes.palette
  },
  modules: {}
});
