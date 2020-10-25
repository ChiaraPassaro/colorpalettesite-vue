<template>
  <div :id="id" :class="'palette palette--not-active del-' + (index + 1)">
    <div class="palette__content">
      <h2><span>{{name}}</span></h2>
      <ul class="palette__number-color">
        <li v-for="(color, index) in colors" :key="index" :class="'color ' + color.degree"><span class="circle" title="color"></span></li>
<!--        <li class="color first"><span class="circle" title="color"></span></li>-->
<!--        <li class="color deg120m"><span class="circle" title="color"></span></li>-->
<!--        <li class="color deg120"><span class="circle" title="color"></span></li>-->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaletteComponent",
  props: ['colors', 'index', 'id', 'name'],
}
</script>

<style scoped>

</style>