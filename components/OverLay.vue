<style scoped>
.overlay {
  z-index: 305;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background: rgba(0, 0, 0, 0.7);*/
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <transition name="opacity">
    <div class="overlay" v-if="tasks != 0">
      <v-progress-circular size="50" indeterminate color="primary"/>
    </div>
  </transition>
</template>

<script>

export default {
  name: "Overlay",
  data: () => ({}),
  methods: {},
  computed: {
    tasks: function () {
      return this.$store.getters.tasks;
    },
  },
};
</script>
