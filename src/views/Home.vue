<template>
  <div class="home">
    <v-card tile elevation="0" width="500" class="mx-auto mt-10">
      <h3>Q.{{ question[currentQuestion].text }}{{ans}}</h3>
      <div v-if="question[currentQuestion].answer_type == 'radio'">
        <SelectForm
          :selectItems="question[currentQuestion].items"
          @selectAnswer="ans = $event"
        />
      </div>
      <div v-if="question[currentQuestion].answer_type == 'check'">
        <Checkbox
          :selectItems="['red', 'blue', 'yellow']"
          @selectAnswer="ans = $event"
        />
      </div>
      <div v-if="question[currentQuestion].answer_type == 'textarea' && proposeMethod">
        <Textarea :changeSize="question[currentQuestion].changeSize" @inputAnswer="ans = $event" />
      </div>
      <div v-if="question[currentQuestion].answer_type == 'textarea' && !proposeMethod">
        <Textarea2 @inputAnswer="ans = $event" />
      </div>
      <v-row class="justify-end">
        <v-btn id="btn" :disabled="!ans" @click="toNext()"> 次へ </v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import SelectForm from '@/components/SelectForm.vue';
import Checkbox from '@/components/Checkbox.vue';
import Textarea from '@/components/Textarea.vue';
import Textarea2 from '@/components/Textarea2.vue';
import CookingSurvey from '@/assets/CookingSurvey.json';

export default {
  name: "Home",
  components: {
    SelectForm,
    Checkbox,
    Textarea,
    Textarea2,
  },
  data() {
    return {
      currentQuestion: 0,
      clientOS: null,
      windowHeight: null,
      windowWidth: null,
      ans: null,
      proposeMethod: true,
      //今後書き換え必要なやつ
      questions: 12, //問題数
      question: CookingSurvey,
    };
  },
  mounted() {
    this.getUUID();
    this.clientOS = this.getOS();
    this.getWindowSize()
    this.defMethod();
    //
    console.log(this.clientOS)
    console.log(this.$store.state.windowHeight)
    console.log(this.$store.state.windowWidth)
  },
  methods: {
    //回答を送信する関数
    submitAnswer() {},
    //次の設問へ進む関数だよ
    toNext() {
      this.currentQuestion = this.currentQuestion + 1;
      this.ans = null;
      this.forceUpdateMyComponent();
    },
    //uuidの生成
    getUUID() {
      // 生成する文字列の長さ
      let l = 16;

      // 生成する文字列に含める文字セット
      let c = "abcdefghijklmnopqrstuvwxyz0123456789";

      let cl = c.length;
      let r = "";
      for (let i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)];
      }
      //return r
      this.$store.commit("setUUID", { uuid: r });
      console.log(this.$store.state.uuid);
    },
    //windowSizeを取得するよ
    getWindowSize() {
      let Height = document.documentElement.clientHeight;
      let Width = document.documentElement.clientWidth;
      this.$store.commit("setWindowHeight", {windowHeight: Height});
      this.$store.commit("setWindowWidth", {windowWidth: Width});
    },
    toSorry(){

    },
    getOS() {
      let ua = window.navigator.userAgent.toLowerCase();
      let os;
      console.log(os);
      if (ua.indexOf("windows nt") !== -1) {
        os = "windows";
      } else if (ua.indexOf("android") !== -1) {
        os = "android";
        this.$router.push('/return');
      } else if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1 || ( ua.indexOf('macintosh') > -1 && 'ontouchend' in document)) {
        os = "ios";
        this.$router.push('/return');
      } else if (ua.indexOf("mac os x") !== -1) {
        os = "mac";
      } else {
        os = "??";
        this.$router.push('/return');
      }
      return os;
    },
    defMethod(){
      if (Math.random() < 0.5) {
        console.log("提案手法");
    } else {
      console.log("比較手法");
      this.proposeMethod = false;
    }
    },
    forceUpdateMyComponent() {
      this.$forceUpdate()
      console.log("do")
    },
  },
};
</script>
