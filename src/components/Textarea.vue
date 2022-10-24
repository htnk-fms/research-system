<template>
  <div>
    <v-textarea
    v-model="inputText"
      label="ここに入力してください"
      solo
      auto-grow
      @input="height = changeHeight()"
      :height="height"
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
      inputText: "",
      currentInputLength: 0,
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
      this.$emit("inputAnswer", this.inputText);
      if (this.currentInput > this.inputText.length) {
        return this.height;
      }
      const height = this.defaultHeight - this.inputText.length * this.changeSize;
      if (height < 24 * 5) {
        return null;
      }
      this.currentInput = this.inputText.length;
      return height;
    },
  },
  mounted() {
    this.defaultHeight = document.documentElement.clientHeight - 120;
    this.height = this.defaultHeight;
    console.log(this.changeSize)
  },
};
</script>