<style scoped>

</style>
<template>
  <div style="max-width: 200px;">
    <v-menu v-model="open" :close-on-content-click="false" transition="scale-transition" min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="iTime" :label="label" prepend-icon="mdi-clock-outline" :disabled="disabled"
                      readonly v-bind="attrs" v-on="on" class="free" dense/>
      </template>
      <v-time-picker v-model="iTime" format="24hr" @click:minute="saveData(iTime)"/>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: "MyTimePicker",
  mounted() {
    this.iTime = this.time;
  },
  data() {
    return {
      open: false,
      iTime: "08:00",
    };
  },
  props: {
    label: {
      type: String,
      require: true,
      default: "時間",
    },
    time: {
      type: String,
      require: true,
      default: "08:00",
    },
    disabled: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  methods: {
    saveData(data) {
      // this.$refs.menu.save(data);
      this.iTime = data;
      this.open = false;
      this.$emit('changed', data);
    },
  },
  watch: {
    time: function () {
      if (this.time !== this.iTime) {
        this.iTime = this.time;
      }
    },
  },
  computed: {}
};
</script>
