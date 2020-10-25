import {
    types
} from '../store/mutations';

export default {
    updateValue({
        commit,
        state
    }, payload) {
        commit(payload.mutation, payload.number);

        return new Promise((resolve, reject) => {
            commit(types.GENERATE_COLOR, state);
            if (state.color instanceof state.ColorPalettesRange.Hsl) {
                resolve(state);
            }
            reject(new Error("No color"));
        });
    },
    getError({
        commit
    }, payload) {
        commit(payload.mutation, payload);
    }
}