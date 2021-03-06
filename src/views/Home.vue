<template>
  <div class="home">
    <div class="button-toggle">
      <Button
        @on-click="handleToggle(ALL)"
        :outlined="toggleMode === SAVED"
        className="button"
      >
        All
      </Button>
      <Button
        @on-click="handleToggle(SAVED)"
        :outlined="toggleMode === ALL"
        className="button"
        >
        Saved
      </Button>
    </div>
    <div class="inputContainer">
      <div class="inputContent" >
          <input
              v-model="searchValue"
              type="text"
              placeholder="Search..."
              class="input"
          />
          <button @click="searchValue = ''" v-show="searchValue.length" class="searchIconContainer">
            <span>X</span>
          </button>
      </div>
    </div>
    <ul v-show="Boolean(pokemonList.length)" class="pokemonContainer">
      <li v-for="pokemon in pokemonList" :key="pokemon.entry_number">
        <router-link class="panel" :to="`/pokemon/${pokemon.entry_number}`">
          <img
            :src="getImage(pokemon.entry_number)"
            :alt="pokemon.pokemon_species.name"
            class="pokemonImage"
          />
          <span class="name">{{capitalize(pokemon.pokemon_species.name)}}</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
import { Store, useStore } from 'vuex';
import { capitalizeMixin, getImageMixin } from '@/toolkit/helpers';
import Button from '@/components/Button.vue';
import { VuexState } from '@/store';

const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokedex/2';

enum ToggleMode {
    ALL = 1,
    SAVED = 2,
}

interface PokemonListItem {
  entry_number: number;
  [key: string]: any;
}

type PokemonList = PokemonListItem[];

interface PokemonImages {
  [entry_number: string]: string;
}

export default defineComponent({
    name: 'Home',
    components: { Button },
    mixins: [
        getImageMixin,
        capitalizeMixin,
    ],
    data(): {
      ALL: ToggleMode;
      SAVED: ToggleMode;
      pokemonList: PokemonList;
      originalList: PokemonList;
      toggleMode: ToggleMode;
      searchValue: string;
      store: Store<VuexState>;
      } {
        return {
            ALL: ToggleMode.ALL,
            SAVED: ToggleMode.SAVED,
            pokemonList: [],
            originalList: [],
            toggleMode: ToggleMode.ALL,
            searchValue: '',
            store: useStore(),
        };
    },
    watch: {
        searchValue() {
            if (this.searchValue.length === 0) {
                this.pokemonList = this.originalList;
            }
            this.pokemonList = this.originalList
                .filter(
                    (pokemonData: PokemonListItem) => pokemonData.pokemon_species.name
                        .includes(this.searchValue),
                );
        },
        toggleMode() {
            if (this.toggleMode === ToggleMode.ALL) {
                this.pokemonList = this.originalList;
                return;
            }
            const newList = this.originalList
                .filter((pokemonData: any) =>
                    Boolean(this.store.state.savedPokemon[pokemonData.entry_number]));
            this.pokemonList = newList;
        },
        originalList() {
            this.store.dispatch('setInitialSavedPokemon', this.originalList);
        },
    },
    beforeCreate() {
        fetch(API_ENDPOINT)
            .then((res) => res.json())
            .then((resp) => {
                this.pokemonList = resp.pokemon_entries;
                this.originalList = this.pokemonList;
            });
    },
    methods: {
        handleToggle(toggleMode: ToggleMode) {
            this.toggleMode = toggleMode;
        },
    },
});
</script>

<style lang="scss" scoped>
.button-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.button {
    min-width: 100px;
    border-radius: 6px;
    margin: 0 5px;
}
.inputContainer {
    display: inline-block;
    margin: 20px 0;
}

.inputContent {
    position: relative;
    border: 1px solid gray;
    border-radius: 15px;
    display: grid;
    grid-template-columns: 1fr 2em;
}

.input {
    background-color: transparent;
    color: inherit;
    padding: 0.75em 1em;
    border: none;

    &::placeholder {
        color: inherit;
    }

    &:focus {
        outline: none;
    }
}
.searchIconContainer {
  background-color: transparent;
  border: none;
  border-radius: 50%;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemonContainer {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    list-style: none;
}

.panel {
    height: 300px;
    width: 250px;
    border-color: transparent;
    border-radius: 6px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 10px;
    padding: 20px;
    transition: box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.45);
    }

    &.skeleton {
        background-color: lightgray;
    }
}

.pokemonImage {
    width: 80%;
}

.name {
    font-weight: bold;
    font-size: 1.5rem;
}
</style>
