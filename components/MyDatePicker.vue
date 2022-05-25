<style scoped>

</style>
<template>
  <div style="max-width: 200px;">
    <v-menu ref="menu" v-model="open" :close-on-content-click="false" transition="scale-transition" min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="iDate" :label="label" prepend-icon="mdi-calendar" :disabled="disabled"
                      readonly v-bind="attrs" v-on="on" class="free" dense/>
      </template>
      <v-date-picker v-model="iDate" no-title scrollable locale="ja" :type="type"
                     :min="min" :max="max" @click:date="saveData(iDate)" @click:month="saveData(iDate, 'month')"/>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: "MyDatePicker",
  mounted() {
    this.iDate = this.date;
  },
  data() {
    return {
      open: false,
      iDate: "2022-01-01",
    };
  },
  props: {
    label: {
      type: String,
      require: true,
      default: "日付",
    },
    type: {
      type: String,
      require: true,
      default: "date",
    },
    date: {
      type: String,
      require: true,
      default: "2022-01-01",
    },
    min: {
      type: String,
      require: true,
      default: null,
    },
    max: {
      type: String,
      require: true,
      default: null,
    },
    disabled: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  methods: {
    saveData(data, type = "date") {
      if (type !== this.type) {
        return;
      }
      // this.$refs.menu.save(data);
      // console.log(data);
      this.iDate = data;
      this.open = false;
      this.$emit('changed', data);
    },
  },
  watch: {
    date: function () {
      if (this.date !== this.iDate) {
        this.iDate = this.date;
      }
    },
  },
  computed: {}
};
</script>
