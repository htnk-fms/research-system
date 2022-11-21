<template>
  <div class="home">
    <v-card tile elevation="0" width="500" class="mx-auto mt-10">
      <h5>({{question.length}}問中{{currentQuestion+1}}問目)</h5>
      <h3>Q.{{ question[currentQuestion].text }}</h3>
      <h5 class="justify-center mx-4 mb-5">
        {{ question[currentQuestion].subtext }}
      </h5>
      <div v-if="question[currentQuestion].answer_type == 'radio'">
        <SelectForm
          :selectItems="question[currentQuestion].items"
          @selectAnswer="ans = $event"
          ref="answer"
        />
      </div>
      <div v-if="question[currentQuestion].answer_type == 'check'">
        <Checkbox
          :selectItems="['red', 'blue', 'yellow']"
          @selectAnswer="ans = $event"
          ref="answer"
        />
      </div>
      <div
        v-if="
          question[currentQuestion].answer_type == 'textarea' && proposeMethod==0
        "
      >
        <Textarea
          ref="answer"
          :changeSize="question[currentQuestion].changeSize"
          @inputAnswer="ans = $event"
        />
      </div>
      <div
        v-if="
          question[currentQuestion].answer_type == 'textarea' && proposeMethod==1
        "
      >
        <Textarea2 ref="answer" @inputAnswer="ans = $event" />
      </div>
      <div
        v-if="
          question[currentQuestion].answer_type == 'textarea' && proposeMethod==2
        "
      >
        <Textarea3 ref="answer" @inputAnswer="ans = $event" />
      </div>
      <v-row  >
        <v-col class="pa-0">
           <h4 style="margin-right:auto"></h4>
        </v-col>
       <v-col class="pa-0" >
         <v-card-actions class="justify-end">
          <v-btn color="primary" id="btn" :disabled="!ans" @click="toNext()"> 次へ </v-btn>
         </v-card-actions>
       </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import SelectForm from "@/components/SelectForm.vue";
import Checkbox from "@/components/Checkbox.vue";
import Textarea from "@/components/Textarea.vue";
import Textarea2 from "@/components/Textarea2.vue";
import Textarea3 from "@/components/Textarea3.vue";
import CookingSurvey from "@/assets/CookingSurvey.json";

export default {
  name: "Home",
  components: {
    SelectForm,
    Checkbox,
    Textarea,
    Textarea2,
    Textarea3
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
      question: CookingSurvey,
    };
  },
  mounted() {
    this.getUUID();
    this.clientOS = this.getOS();
    this.getWindowSize();
    this.defMethod();
    //
    this.submitInfo();
  },
  methods: {
    //postUserInfo
    submitInfo() {
      this.$axios
        .get("https://hatanaka.nkmr.io/research/api/post_user_info.php", {
          params: {
            uuid: this.$store.state.uuid,
            window_height: this.$store.state.windowHeight,
            window_width: this.$store.state.windowWidth,
            client_os: this.clientOS,
            method: this.proposeMethod,
          },
        })
        .then((response) => {
          console.log("status:", response.status);
        })
        .catch((error) => {
          alert("エラーが発生しました");
          console.log("err:", error);
        });
    },
    //回答を送信する関数
    submitAnswer() {
      this.$axios
        .get("https://hatanaka.nkmr.io/research/api/post_answer.php", {
          params: {
            uuid: this.$store.state.uuid,
            question_num: this.question[this.currentQuestion].id,
            answer: this.$refs.answer.ans,
            move_size: this.$refs.answer.currentInput,
            first_input_time: this.$refs.answer.firstInputTime,
          },
        })
        .then((response) => {
          console.log("status:", response.status);
        })
        .catch((error) => {
          alert("エラーが発生しました");
          console.log("err:", error);
        });
    },
    //次の設問へ進む関数だよ
    toNext() {
      this.submitAnswer();
      if (this.currentQuestion < this.question.length - 1) {
        this.currentQuestion = this.currentQuestion + 1;
        this.ans = null;
        this.$refs.answer.ans = undefined;
        if (this.question[this.currentQuestion].answer_type == "textarea") {
          this.$refs.answer.height = this.$refs.answer.defaultHeight;
          this.$refs.answer.currentInput = 0;
          this.$refs.answer.firstInput = true;
        }
        this.forceUpdateMyComponent();
      } else {
        this.$router.push("/complete");
      }
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
    },
    //windowSizeを取得するよ
    getWindowSize() {
      let Height = document.documentElement.clientHeight;
      let Width = document.documentElement.clientWidth;
      this.$store.commit("setWindowHeight", { windowHeight: Height });
      this.$store.commit("setWindowWidth", { windowWidth: Width });
    },
    toSorry() {},
    getOS() {
      let ua = window.navigator.userAgent.toLowerCase();
      let os;
      if (ua.indexOf("windows nt") !== -1) {
        os = "windows";
      } else if (ua.indexOf("android") !== -1) {
        os = "android";
        this.$router.push("/return");
      } else if (
        ua.indexOf("iphone") !== -1 ||
        ua.indexOf("ipad") !== -1 ||
        (ua.indexOf("macintosh") > -1 && "ontouchend" in document)
      ) {
        os = "ios";
        this.$router.push("/return");
      } else if (ua.indexOf("mac os x") !== -1) {
        os = "mac";
      } else {
        os = "??";
        this.$router.push("/return");
      }
      return os;
    },
    defMethod() {
      this.proposeMethod = Math.floor( Math.random() * 3 ) ;
    },
    forceUpdateMyComponent() {
      this.$forceUpdate();
    },
  },
};
</script>
