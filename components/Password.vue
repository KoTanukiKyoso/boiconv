<style scoped>

</style>
<template>
  <div>
    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
        label="Normal with hint text" hint="At least 8 characters" counter
        @click:append="show1 = !show1"/>
  </div>
</template>

<script>

export default {
  name: "Eyes",
  mounted() {
  },
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      require: true,
    },
    showTip: {
      type: String,
      default: "",
      require: false,
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
