<style scoped>

</style>
<template>
  <div>
    <div v-if="show">
      <v-btn icon @click="show=false">
        <v-icon>mdi-eye-off</v-icon>
      </v-btn>
      {{ password }}
    </div>
    <div v-else style="color: #666666;">
      <v-btn icon @click="show=true">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      ●●●●●●
    </div>
  </div>
</template>

<script>

export default {
  name: "PasswordText",
  mounted() {

  },
  data() {
    return {
      show: false,
    };
  },
  props: {
    defaultShow: {
      type: Boolean,
      default: false,
      require: false,
    },
    password: {
      type: String,
      default: "",
      require: true,
    },
  },
  methods: {
    showed(show) {
      this.$emit('showed', show);
    },
  },
  computed: {}
};
</script>
