<template>
    <v-radio-group v-model="ans" value="null" >
      <v-radio
        v-for="n in selectItems.length"
        :key="n"
        :label="selectItems[n-1].text"
        :value="selectItems[n-1].value"
        @click="sendAns()"
      ></v-radio>
    </v-radio-group>
</template>

<script>
export default {
    name: "Select",

    data(){
        return {
            ans: null,
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
    },
}
</script>

<style>

</style>