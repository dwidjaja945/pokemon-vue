import { createStore } from 'vuex';

interface State {
  savedPokemon: {
    [key: string]: boolean;
  };
}

export default createStore<State>({
    state: {
        savedPokemon: {},
    },
    mutations: {
        setInitialSavedPokemon(state: State, id: string) {
            const item = localStorage.getItem(id);
            if (item) {
                state.savedPokemon[id] = true;
            }
        },
        setSavedPokemon(state, id) {
            const { savedPokemon: newSavedPokemon } = state;
            const item = localStorage.getItem(id);
            if (newSavedPokemon[id] || item) {
                localStorage.removeItem(id);
                delete newSavedPokemon[id];
            } else {
                localStorage.setItem(id, 'true');
                newSavedPokemon[id] = true;
            }
            state.savedPokemon = newSavedPokemon;
        },
    },
    actions: {
        setInitialSavedPokemon({ commit }, pokemonList: any[]): void {
            for (const { entry_number } of pokemonList) {
                commit('setInitialSavedPokemon', entry_number);
            }
        },
        setSavedPokemon({ commit }, id: string) {
            commit('setSavedPokemon', id);
        },
    },
    modules: {
    },
});
