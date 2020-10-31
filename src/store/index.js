import Vue from "vue";
import Vuex from "vuex";
import actions from "@/store/actions";
import {
  mutations
} from "@/store/mutations";

const ColorPalettesRange = require("@chiarapassaro/color-palettes-range/src/js");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ColorPalettesRange,
    degree: 360,
    saturation: 80,
    brightness: 50,
    color: undefined,
    cssColor: '',
    generated: false,
    random: {
      number: false,
      step: false
    },
    error: {
      brightness: '',
      saturation: '',
      degree: '',
    }
  },
  mutations,
  actions,
  getters: {
    isColor: state => state.color,
    getDegree: state => state.degree,
    getSaturation: state => state.saturation,
    getBrightness: state => state.brightness,
    getCssColor: state => state.cssColor,
  },
  modules: {}
});