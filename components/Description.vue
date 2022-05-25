<style scoped></style>
<template>
  <div v-if="text">
    <component :is="showOver ? 'v-tooltip' : 'div'" bottom>
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on">
          <div v-for="(line,i) of dText.split(/\r?\n/g)" :key="i">
            <div v-if="line"
                 :style="{'line-height': lineHeight, 'font-size': fontSize + 'px', color: color}">{{ line }}
            </div>
            <div v-else style="height: 12px;"></div>
          </div>
        </div>
      </template>
      <span v-html="nt"/>
    </component>
  </div>
</template>

<script>
export default {
  name: "Description",
  mounted() {
    this.nt = this.text.replace(/\r?\n/g, '<br>');
  },
  data() {
    return {
      nt: ""
    };
  },
  props: {
    text: {
      type: String,
      default: "",
      require: true,
    },
    color: {
      type: String,
      default: "#555555",
      require: true,
    },
    fontSize: {
      type: Number,
      default: 16,
      require: true,
    },
    max: {
      type: Number,
      default: 0,
      require: true,
    },
    lineHeight: {
      type: String,
      default: "1.7em",
      require: true,
    },
    showOver: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  methods: {},
  computed: {
    dText: function () {
      let dText = this.text;
      this.nt = this.text.replace(/\r?\n/g, '<br>');
      if (this.max !== 0) {
        if (Array.from(this.text).length > this.max) {
          dText = this.text.substring(0, this.max) + "...";
        }
      }
      return dText;
    },
  }
};
</script>
