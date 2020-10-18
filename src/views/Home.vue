<template>
  <div class="home">
    <div class="button-toggle">
      <Button
        @on-click="handleToggle(ALL)"
        :outlined="toggleMode === SAVED"
        className="button"
        content="All"
      />
      <Button
        @on-click="handleToggle(SAVED)"
        :outlined="toggleMode === ALL"
        className="button"
        content="Saved"
        />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
import Button from '@/components/Button.vue';

const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokedex/2';

enum ToggleMode {
  ALL = 1,
  SAVED = 2,
}

export default defineComponent({
  name: 'Home',
  components: { Button },
  data() {
    return {
      ALL: ToggleMode.ALL,
      SAVED: ToggleMode.SAVED,
      pokemonList: [],
      toggleMode: ToggleMode.ALL,
    };
  },
  created() {
    // fetch(API_ENDPOINT)
    //   .then((res) => res.json())
    //   .then((resp) => {
    //     this.pokemonList = resp.pokemon_entries;
    //   });
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
</style>
