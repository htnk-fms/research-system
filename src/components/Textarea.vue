<template>
  <div>
    <v-textarea
      v-model="ans"
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
      ans: "",
      currentInput: 0,
      defaultHeight: null,
      height: null,
      changeBox: null,
      firstInput: true,
      firstInputTime: 0,
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
      if (this.firstInput) {
        const d = new Date(); // Today
        const DateTimeFormat = "YYYY-MM-DD hh:mi:ss"; // "2019/10/04 12:34:56" -> "20191004_123456"
        this.firstInputTime = DateTimeFormat.replace(
          /YYYY/g,
          String(d.getFullYear())
        )
          .replace(/MM/g, ("0" + (d.getMonth() + 1)).slice(-2))
          .replace(/DD/g, ("0" + d.getDate()).slice(-2))
          .replace(/hh/g, ("0" + d.getHours()).slice(-2))
          .replace(/mi/g, ("0" + d.getMinutes()).slice(-2))
          .replace(/ss/g, ("0" + d.getSeconds()).slice(-2));
        this.firstInput = false;
      }
      if (this.currentInput > this.ans.length) {
        return this.height;
      }
      const height = this.defaultHeight - this.ans.length * this.changeBox;
      if (height <= 24 * 5) {
        return null;
      }
      this.currentInput = this.ans.length;
      return height;
    },
  },
  mounted() {
    this.defaultHeight = document.documentElement.clientHeight - 200;
    this.height = this.defaultHeight;
    this.changeBox = (this.defaultHeight - 120) / this.changeSize;
  },
};
</script>