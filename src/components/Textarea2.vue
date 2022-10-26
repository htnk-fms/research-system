<template>
  <div>
    <v-textarea
    v-model="ans"
      label="ここに入力してください"
      solo
      auto-grow
      @input="height = changeHeight()"
      hide-spin-buttons
      no-resize
    >
    </v-textarea>
  </div>
</template>
 <script>
export default {
  name: "TextArea",
  data() {
    return {
      ans: "",
      currentInput: 0,
      defaultHeight: null,
      height: null,
    };
  },
  props: {
      changeSize: {
          type: Number,
          default: 15,
          required: false,
      },
  },
  methods: {
    changeHeight() {
      this.$emit("inputAnswer", this.ans);
      if (this.currentInput > this.ans.length) {
        return this.height;
      }
      const height = this.defaultHeight - this.ans.length * this.changeSize;
      if (height < 24 * 5) {
        return null;
      }
      this.currentInput = this.ans.length;
      return height;
    },
  },
  mounted() {
    this.defaultHeight = document.documentElement.clientHeight - 120;
    this.height = this.defaultHeight;
  },
};
</script>