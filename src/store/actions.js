import { types } from '../store/mutations';

export default {
    updateValue({ commit, state }, payload) {
        console.log('commit degree', payload);
        commit(payload.mutation, payload.number);

        return new Promise((resolve, reject) => {
            commit(types.GENERATE_COLOR, state);
            console.log('commit GENERATE_COLOR', state);
            if(state.color instanceof state.ColorPalettesRange.Hsl) {
                resolve(state);
            }

            reject(new Error("No color"));
        });
    },
}