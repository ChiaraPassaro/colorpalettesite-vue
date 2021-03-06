<template>
  <section :class="['palettes', endedAnimation ? 'active' : '']">
    <div
      v-for="(row, index) in schemas"
      :key="index"
      :class="'row row-' + (index + 1)"
    >
      <PaletteComponent
        v-for="(schema, index) in schemas[index]"
        :id="schema.id"
        :key="index"
        :colors="schema.colors"
        :index="index"
        :name="schema.name"
        :active="isActiveSchema(schema)"
        :endedAnimation="endedAnimation"
      ></PaletteComponent>
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
  props: ["activeId"],
  data() {
    return {
      durationAnimation: 800 * 6,
      isActive: false,
      schemas: [
        [
          {
            id: "triad",
            name: "Triad",
            colors: [
              { degree: "first" },
              { degree: "deg120m" },
              { degree: "deg120" }
            ]
          },
          {
            id: "splitComplementary",
            name: "Split Complementary",
            colors: [
              { degree: "first" },
              { degree: "deg160" },
              { degree: "deg160m" }
            ]
          },
          {
            id: "complementary",
            name: "Complementary",
            colors: [
              { degree: "first" },
              { degree: "deg180" },
              { degree: "deg140" },
              { degree: "deg140m" },
              { degree: "deg160" },
              { degree: "deg160m" }
            ]
          },
          {
            id: "mono",
            name: "Monochrome",
            colors: [
              { degree: "first" },
              { degree: "deg25" },
              { degree: "deg45" },
              { degree: "deg65" },
              { degree: "deg85" }
            ]
          }
        ],
        [
          {
            id: "analogous",
            name: "Analogous",
            colors: [
              { degree: "first" },
              { degree: "deg25" },
              { degree: "deg45" },
              { degree: "deg65" },
              { degree: "deg85" }
            ]
          },
          {
            id: "tetradic",
            name: "Tetradic",
            colors: [
              { degree: "deg30m" },
              { degree: "deg150" },
              { degree: "deg30" },
              { degree: "deg150m" }
            ]
          },
          {
            id: "square",
            name: "Square",
            colors: [
              { degree: "deg45" },
              { degree: "deg45m" },
              { degree: "deg130" },
              { degree: "deg130m" }
            ]
          },
          {
            id: "random",
            name: "Random Dominant",
            colors: [
              { degree: "first" },
              { degree: "deg45" },
              { degree: "deg90" },
              { degree: "deg135" },
              { degree: "deg180" },
              { degree: "deg135m" },
              { degree: "deg90m" },
              { degree: "deg45m" }
            ]
          }
        ]
      ]
    };
  },
  computed: {
    endedAnimation() {
      return this.isActive;
    }
  },
  methods: {
    isActiveSchema(element) {
      return element.id === this.activeId;
    }
  },
  mounted() {
    setTimeout(() => {
      this.isActive = true;
    }, this.durationAnimation);
  }
};
</script>
