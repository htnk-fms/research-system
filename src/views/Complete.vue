<template>
  <div>
       <v-card tile elevation="0" width="500" class="mx-auto mt-10">
           <h1 class="text-decoration-underline">アンケート終了</h1>
    <h4>アンケートへの回答は以上です。ありがとうございました。<br>
        以下のコードとIDをクラウドソーシングの画面に戻って入力してください。<br>
        こちらを終わらせないと、アンケートに回答したことにならないためご注意ください。
    </h4>
    <br>
    <h3>コード:D</h3>
    <h3>ID:　{{ $store.state.uuid }}</h3>
    <v-btn @click="writeToClipboard($store.state.uuid)">IDをコピー</v-btn>
       </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    writeToClipboard(text) {
      navigator.clipboard.writeText(text).catch((e) => {
        console.error(e);
      });
    },
  },
};
</script>

<style>
</style>