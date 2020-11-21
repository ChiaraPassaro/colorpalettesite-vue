import { types } from "@/store/mutations";

export default {
  updateValue({ commit, state }, payload) {
    commit(payload.mutation, payload.number);

    return new Promise((resolve, reject) => {
      commit(types.GENERATE_COLOR, state);
      if (state.color instanceof state.ColorPalettesRange.Hsl) {
        resolve(state);
      }
      reject(new Error("No color"));
    });
  },
  getError({ commit }, payload) {
    commit(payload.mutation, payload);
  },
  generatePalettes({ commit, state }, payload) {
    commit(payload.mutation, payload.palettes);
    return new Promise((resolve, reject) => {
      if (state.palettes) {
        resolve(state);
      }
      reject(new Error("No palettes"));
    });
  },
  setRandomData({ commit }, payload) {
    commit(payload.mutation, payload);
  },
  setRandomPalette({ commit }, payload) {
    commit(payload.mutation, payload);
  },
  setTriadPalette({ commit }, payload) {
    commit(payload.mutation, payload);
  },
  setSplitComplementarPalette({ commit }, payload) {
    commit(payload.mutation, payload);
  },
  setOpenPalette({ commit }, payload) {
    commit(payload.mutation, payload);
  },
  setOpenFeedback({ commit }, payload) {
    commit(payload.mutation, payload);
  },
  setNumberStartSquareColors({ commit }, payload) {
    commit(payload.mutation, payload);
  }
};
