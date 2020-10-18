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
    setSavedPokemon({ commit }, id) {
      commit('setSavedPokemon', id);
    },
  },
  modules: {
  },
});
