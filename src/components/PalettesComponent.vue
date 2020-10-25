<template>
  <section class="palettes">
    <div v-for="(row, index) in schemas" :key="index" :class="'row row-'+ (index+1)">
      <PaletteComponent v-for="(schema, index) in schemas[index]" :key="index" :id="schema.id" :colors="schema.colors"
                        :name="schema.name" :index="index"></PaletteComponent>
    </div>
  </section>
</template>

<script>
import PaletteComponent from "@/components/PaletteComponent";

export default {
  name: "PalettesComponent.vue",
  components: {
    PaletteComponent
  },
  data() {
    return {
      schemas: [
        [
          {
            id: 'triad',
            name: 'Triad',
            colors: [
              {degree: 'first'},
              {degree: 'deg120m'},
              {degree: 'deg120'},
            ]
          },
          {
            id: 'split-complementary',
            name: 'Split Complementary',
            colors: [
              {degree: 'first'},
              {degree: 'deg160'},
              {degree: 'deg160m'},
            ]
          },
          {
            id: 'complementary',
            name: 'Complementary',
            colors: [
              {degree: 'first'},
              {degree: 'deg180'},
              {degree: 'deg140'},
              {degree: 'deg140m'},
              {degree: 'deg160'},
              {degree: 'deg160m'},
            ]
          },
          {
            id: 'mono',
            name: 'Monochrome',
            colors: [
              {degree: 'first'},
              {degree: 'deg25'},
              {degree: 'deg45'},
              {degree: 'deg65'},
              {degree: 'deg85'},
            ]
          },
        ],
        [
          {
            id: 'analogous',
            name: 'Analogous',
            colors: [
              {degree: 'first'},
              {degree: 'deg25'},
              {degree: 'deg45'},
              {degree: 'deg65'},
              {degree: 'deg85'},
            ]
          },
          {
            id: 'tetradic',
            name: 'Tetradic',
            colors: [
              {degree: 'first'},
              {degree: 'deg30m'},
              {degree: 'deg150'},
              {degree: 'deg30'},
              {degree: 'deg150m'},
            ]
          },
          {
            id: 'square',
            name: 'Square',
            colors: [
              {degree: 'first'},
              {degree: 'deg45'},
              {degree: 'deg45m'},
              {degree: 'deg130'},
              {degree: 'deg130m'},
            ]
          },
          {
            id: 'random',
            name: 'Random Dominant',
            colors: [
              {degree: 'first'},
              {degree: 'deg45'},
              {degree: 'deg90'},
              {degree: 'deg135'},
              {degree: 'deg180'},
              {degree: 'deg135m'},
              {degree: 'deg90m'},
              {degree: 'deg45m'},
            ]
          }
        ]
      ]
    }
  }
}
</script>

<style scoped>

</style>