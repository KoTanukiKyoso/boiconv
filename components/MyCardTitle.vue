<template>
  <div>
    <v-card-title class="mb-3 pb-0 mx-6 px-0"
                  :style="{borderBottom: `solid 1px ${color}`, width: `${width}px`}">
      <slot/>
    </v-card-title>
  </div>
</template>

<script>
export default {
  name: "MyCardTitle",
  props: {
    color: {
      type: String,
      default: "grey",
      require: true,
    },
    width: {
      type: Number,
      default: 200,
      require: true,
    }
  },
};
</script>

<style scoped>

</style>
