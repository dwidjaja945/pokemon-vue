<template>
  <div class="container">
    <div class="leftPanel">
        <Button
          @on-click="$router.push('/')"
         >
           Back
         </Button>
        <div class="imageContainer">
            <img
                :src="getImage(id)"
                class="image"
            />
            <span class="name">
                {{ capitalize(pokemonData?.name) }}
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

<script lang="ts">
import {
    defineComponent,
} from 'vue';
import Button from '@/components/Button.vue';
import { capitalizeMixin, getImageMixin } from '@/toolkit/helpers';
import { useScriptMixin, useWatch } from '@/toolkit/hooks';
import { useStore } from 'vuex';

const getPokemonDataEndpoint = (id: string): string =>
    `https://pokeapi.co/api/v2/pokemon/${id}`;
const getPokemonLocationEndpoint = (id: string): string =>
    `https://api.craft-demo.net/pokemon/${id}`;

const getPokemonData = (id: string): Promise<any> => fetch(getPokemonDataEndpoint(id))
    .then(res => res.json())
    .then(response => response);

const getPokemonLocation = (id: string): Promise<any> => fetch(getPokemonLocationEndpoint(id), {
    method: 'GET',
    headers: {
        'x-api-key': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l',
    },
}).then(res => res.json())
    .then(response => response);

const currentWindow: Window & typeof window.globalThis & {
  google?: any;
} = window;

export default defineComponent({
    name: 'Profile',
    components: { Button },
    mixins: [
        useScriptMixin(`https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAP_API_KEY}`),
        capitalizeMixin,
        getImageMixin,
    ],
    async created() {
        this.pokemonData = await getPokemonData(this.$route.params.id);
        const { locations } = await getPokemonLocation(this.$route.params.id);
        this.locations = locations;
    },
    watch: {
        pokemonSaved() {
            this.$store.dispatch('setSavedPokemon', this.id);
        },
        ...useWatch(function (this: any): void {
            this.createMap();
        }, 'scriptLoaded', 'locations'),
    },
    data() {
        const store = useStore();
        const { id } = this.$route.params;
        return {
            id: this.$route.params.id,
            pokemonData: null,
            pokemonSaved: store.state.savedPokemon[String(id)],
            locations: [],
            store,
        };
    },
    methods: {
        createGoogleMap(center: {[key: string]: string}) {
            return new currentWindow.google.maps.Map(this.$refs.mapRef, {
                zoom: 10,
                center,
            });
        },
        createMap() {
            if (this.scriptLoaded && this.locations.length) {
                const firstLocation = this.locations[0];
                if (firstLocation) {
                    const [lat, lng] = firstLocation?.split(',');
                    const center = {
                        lat: Number(lat),
                        lng: Number(lng),
                    };
                    const map = this.createGoogleMap(center);
                    this.locations.forEach((location: string): void => {
                        const [lat, lng] = location.split(',');
                        const position = {
                            lat: Number(lat),
                            lng: Number(lng),
                        };
                        const marker = new currentWindow.google.maps.Marker({
                            position,
                            map,
                        });
                    });
                }
            }
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
    min-width: 300px;
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
