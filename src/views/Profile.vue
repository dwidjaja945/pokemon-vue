<template>
  <div class="container">
    <div class="leftPanel">
        <div class="imageContainer">
            <img
                :src="getImage(id)"
                class="image"
            />
            <span class="name">
                {{capitalize(pokemonData?.name)}}
            </span>
        </div>
        <div class="typeContainer">
            <div class="typeTitle">Types:</div>
            <div class="types">
              <div
                v-for="({type}) in pokemonData?.types"
                :key="`type-${id}-${type.name}`"
                class="type"
              >
                {{capitalize(type.name)}}
              </div>
            </div>
        </div>
        <div
            class="bag"
        >
            <label for="savePokemon">
                In Bag:
                <input
                    type="checkbox"
                    id="savePokemon"
                    name="savePokemon"
                    v-model="pokemonSaved"
                    :checked="Boolean($store.state.savedPokemon[id])"
                />
            </label>
        </div>
        <div class="description">
            Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Doloribus veniam laboriosam
            rovident saepe commodi! Error, deleniti inventore
            autem laborum et ratione labore placeat sed minus fuga
            quis quidem modi incidunt reiciendis vitae hic, enim
            perferendis ipsum repellendus officia quod dicta?
        </div>
    </div>
    <div>
        <div ref="mapRef" class="map" />
    </div>
</div>
</template>

<script>
import Vue, { defineComponent } from 'vue';
import { capitalize, getImage } from '@/toolkit/helpers';

const getPokemonDataEndpoint = id =>
    `https://pokeapi.co/api/v2/pokemon/${id}`;
const getPokemonLocationEndpoint = id =>
    `https://api.craft-demo.net/pokemon/${id}`;

const getPokemonData = id => fetch(getPokemonDataEndpoint(id))
    .then(res => res.json())
    .then(response => response);

const getPokemonLocation = id => fetch(getPokemonLocationEndpoint(id), {
    method: 'GET',
    headers: {
        'x-api-key': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l',
    },
})
    .then(res => res.json())
    .then(response => response);

export default defineComponent({
    name: 'Profile',
    async beforeCreate() {
        const pokemonData = await getPokemonData(this.$route.params.id);
        this.pokemonData = pokemonData;
        const { locations } = await getPokemonLocation(this.$route.params.id);
        this.locations = locations;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`;
        script.defer = true;
        script.async = true;

        window.document.body.appendChild(script);
        this.script = script;

        script.addEventListener('load', () => {
            this.scriptLoaded = true;
        });
    },
    beforeUnmount() {
        window.document.body.removeChild(this.script);
    },
    watch: {
        pokemonSaved() {
            this.$store.dispatch('setSavedPokemon', this.id);
        },
        scriptLoaded() {
            if (this.scriptLoaded && this.locations.length) {
                const firstLocation = this.locations[0];
                if (firstLocation) {
                    const [lat, lng] = firstLocation?.split(',');
                    const center = {
                        lat: Number(lat),
                        lng: Number(lng),
                    };
                    const map = this.createGoogleMap(center);
                    this.locations.forEach((location) => {
                        const [lat, lng] = location.split(',');
                        const position = {
                            lat: Number(lat),
                            lng: Number(lng),
                        };
                        const marker = new window.google.maps.Marker({
                            position,
                            map,
                        });
                    });
                }
            }
        },
    },
    data() {
        return {
            id: this.$route.params.id,
            pokemonData: null,
            pokemonSaved: this.$store.state.savedPokemon[this.$route.params.id],
            locations: [],
            scriptLoaded: false,
        };
    },
    methods: {
        capitalize,
        getImage,
        createGoogleMap(center) {
            return new window.google.maps.Map(this.$refs.mapRef, {
                zoom: 10,
                center,
            });
        },
    },
});
</script>

<style lang="scss" scoped>
.container {
    display: grid;
    grid-template-columns: 2fr 3fr;
}

.leftPanel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.imageContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image {
    width: 50%;
    min-width: 200px;
    margin-bottom: 20px;
    min-height: 300px;
}

.name {
    font-weight: bold;
    font-size: 1.25rem;
}

.bag {
    margin: 20px 0;
}

.typeTitle {
    font-weight: bold;
}

.typeContainer {
    margin-top: 20px;
}

.types {
    display: flex;
}

.type {
    margin-right: 10px;
}

.description {
    margin: 30px 50px;
}

.map {
    width: 100%;
    height: 100%;
}
</style>
