<template>
  <div class="flex flex-center column" style="min-height:700px ">
<!--    привязать numberQuestion.value  к q-tab-panel чтобы была красивая анимация  свайпа -->
    <q-card v-if="!showFinalResult" class="q-pa-md" style="min-width: 340px">

      <q-card-section class="flex  justify-between">
        <p class="text-weight-bold"> {{ this.materials[this.numberMaterial].tests[0].nameOfTest}}</p>
        <p :style="displayMinutes < 2 ? 'color:red':false">0{{displayMinutes}}:<span v-if="displaySecond < 10">0</span>{{ displaySecond }}</p>
      </q-card-section>

      <q-separator/>

      <q-card-section>
          <div>
            {{questions[numberQuestion].question}}
          </div>
          <div v-if="!testBehavior" class="flex column">
            <q-radio
              v-model="answerQuestion"
              v-for="(answer,index) in questions[numberQuestion].answers"
              :key="answer"
              :val="index"
              :label="answer"
            />
          </div>
          <div v-if="testBehavior" class="flex column">
            <q-radio
              v-model="answerQuestion"
              v-for="(answer,index) in questions[numberQuestion].answers"
              :key="answer"
              :val="index"
              :label="answer"
              @click="incrementNumberTest"
            />
          </div>

          <div class="q-mt-md">Вопрос {{numberQuestion + 1}} из {{questions.length}}</div>
      </q-card-section>

      <q-separator v-if="!testBehavior" class="q-my-md" />

      <q-card-actions v-if="!testBehavior">
        <q-btn class="bg-primary text-white text-weight-bold full-width" label="Ответить" @click="incrementNumberTest"/>
      </q-card-actions>
    </q-card>

    <q-card v-if="showFinalResult" class="q-pa-md text-weight-bold" style="min-width: 340px">
       <q-card-section>
        <div :class="`flex column text-${colorOfResult}`">
          Ваш результат: {{rightAnswers}} / {{questions.length}}
        </div>
      </q-card-section>

      <q-card-actions class="q-mt-md">
        <q-btn class="bg-primary text-white text-weight-bold full-width" label="Перейти к главному меню" @click="$router.push('/')"/>
      </q-card-actions>
    </q-card>

    <Teleport to="body">
      <q-dialog v-model="dialogFail" persistent>
        <q-card class="q-pa-md">
          <q-card-section class="q-mb-md">
            К сожалению ваше время на прхождние теста вышло!
          </q-card-section>
          <q-card-actions class="flex justify-between">
            <q-btn @click="$router.push('tests')"  color="primary" class="rounded-borders" label="Вернуться к списку тестов"/>
            <q-btn @click="$router.go()"  color="primary" class="rounded-borders" label="Пройти ещё раз"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </Teleport>
  </div>
</template>

<script>
import {defineComponent} from "vue";

//в целом вместе с номером тест можно передавать и вопросы

const questions = [
  {
    question: "Choose the correct verb form in the present simple tense: \n He usually _______ breakfast at 7 am.",
    answers:  ['eat','eating','ate', 'eats'],
    correctAnswer:  1
  },
  {
    question: "Choose the correct verb form in the present continuous tense:\nThey _______ a movie right now.",
    answers:  ['watch','watching','watched', 'watches'],
    correctAnswer: 2
  },
  {
    question: "Choose the correct verb form in the past simple tense:\nWe _______ to the beach last weekend.",
    answers:  ['go','going','went', 'goes'],
    correctAnswer: 3
  },
  {
    question: "Choose the correct verb form in the future continuous tense:\nThey _______ a party on Saturday evening.",
    answers:  ['plan','planning','planned', 'will be planning'],
    correctAnswer: 4
  },
  {
    question: "Choose the correct verb form in the present perfect tense:\nShe _______ the book already.",
    answers:  ['read','reading','reads', 'has read'],
    correctAnswer: 4
  }
  ,
  {
    question: "Choose the correct verb form in the future perfect tense:\nBy next year, I _______ the language.",
    answers:  ['learn','learning','will learn', 'would learn'],
    correctAnswer: 3
  }
  ,
  {
    question: "Choose the correct verb form in the present perfect continuous tense:\nWe _______ for six hours.",
    answers:  ['study','studying','studied', 'have been studying'],
    correctAnswer: 4
  }
]
// const questions = [
//   {
//     question: "ЛУчший ЯП?",
//     answers:  ['Java','JavaScript','Mocha', 'Python'],
//     correctAnswer:  1
//   },
//   {
//     question: "Не ЛУчший ЯП?",
//     answers:  ['Java','JavaScript','Huskell', 'Python'],
//     correctAnswer: 3
//   },
//   {
//     question: "Возможно ЛУчший ЯП?",
//     answers:  ['Java','Pascal','Mocha', 'Python'],
//     correctAnswer: 2
//   },
//   {
//     question: "Явно не лучший ЛУчший ЯП?",
//     answers:  ['С++','JavaScript','Mocha', 'Python'],
//     correctAnswer: 4
//   }
// ]

export default defineComponent({
  name: 'TestPage',
  data(){
    return{
      materials: null,
      showFinalResult: false,
      questions: [],
      answerQuestion:'',
      numberQuestion:0,
      rightAnswers:0,
      numberMaterial:null,
      testBehavior: false,
      dialogFail: false,
      displaySecond: 59,
      displayMinutes: 5,
      timer: null,
    }
  },
  mounted() {
    this.startTimer()
  },
  methods: {
    incrementNumberTest(){
      if(this.answerQuestion !== '') {
        if(this.answerQuestion + 1 === this.questions[this.numberQuestion].correctAnswer){
          this.rightAnswers+=1
        }
        this.numberQuestion+=1
        this.answerQuestion = ''
      }
      if(this.numberQuestion === this.questions.length){
        this.showFinalResult = true
      }
      if(this.rightAnswers === this.questions.length){
        this.materials[this.numberMaterial].tests[0].isFinished = true
        this.materials[this.numberMaterial].isFinished = true
      }
    },
    async getMaterials() {
      // const response = await fetch('src/api.json')
      // const data = await response.json();
      // this.materials = data.materials

      if(!localStorage.getItem('materials')){
        console.log('no materials in local storage')
        localStorage.setItem("materials", JSON.stringify(this.initMaterials));
        this.materials = this.initMaterials
      }
      else {
        console.log('materials in local storage')
        this.materials = JSON.parse(localStorage.getItem('materials'))
      }

      for (let material of this.materials) {
        this.progress += material.isFinished ? 1 : 0
      }
      this.progress = (this.progress / 10).toFixed(1)

    },
    startTimer() {
      this.timer = setInterval(() => {
          this.displaySecond--
          if(this.displaySecond === -1){
            this.displayMinutes--
            this.displaySecond = 59
          }
        if(this.displayMinutes === 0 && this.displaySecond === 0) {
          this.displaySecond--
          this.dialogFail = true
          clearInterval(this.timer)
        }
      }, 1000)


    },
  },
  watch: {
    materials:{
      handler(val, newVal) {
        console.log('materials setted by watcher local storage')
        localStorage.setItem("materials", JSON.stringify(val));
      },
      deep: true
    },

  },
  computed:{
    colorOfResult(){
      if((this.rightAnswers / this.questions.length) > 0.7) {
        return 'positive'
      }
      else if((this.rightAnswers / this.questions.length) > 0.4) {
        return 'warning'
      }
      else {
        return 'negative'
      }
    }
  },
  created() {
    this.getMaterials()
    this.numberMaterial = this.$route.query.materialNumber
    this.questions =  this.materials[this.numberMaterial].tests[0].questions
    if(localStorage.getItem('testBehavior')){
      this.testBehavior = JSON.parse(localStorage.getItem('testBehavior'))
    }
  }
})

</script>
