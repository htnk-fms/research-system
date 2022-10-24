<template>
<div>
      <v-checkbox
        dense
        v-model="ans"
        v-for="n in 3"
        :key="n"
        :label="selectItems[n-1]"
        :value="selectItems[n-1]"
        @click="sendAns()"
      ></v-checkbox>
</div>
</template>

<script>
export default {
    name: "Checkbox",

    data(){
        return {
            ans: [],
        }
    },
    props: {
        selectItems: {
            type: Array,
            default: null,
            required: true
        }
    },
    methods: {
        sendAns(){
            this.$emit("selectAnswer", this.ans);
        }
    }
}
</script>

<style>

</style>