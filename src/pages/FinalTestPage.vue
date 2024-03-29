<template>
    <div>
      <h3> Итоговый тест </h3>

      <div class="test-body">
        <ol>
          <li v-for="(testQuestion, index) in finalTestQuestion"
              :key="testQuestion.answer"
          >
            <div v-if="testQuestion.type === 'radio'">
              <div class="text-bold"> {{testQuestion.task}}</div>
              <div>
                {{testQuestion.question}}
              </div>

              <div class="flex column">
                <q-radio
                  v-model="finalResult.questions[index]"
                  v-for="(answer) in testQuestion.answers"
                  :key="answer"
                  :val="answer"
                  :label="answer"
                  @click="finalResult.questionsRight[index] = testQuestion.answer"
                />
              </div>
            </div>

            <div v-if="testQuestion.type === 'input'">
              <div class="text-bold"> {{testQuestion.task}}</div>

              <span>
                {{testQuestion.question}}
                <q-input
                  v-model="finalResult.questions[index]"
                  @click="finalResult.questionsRight[index] = testQuestion.answer"
                  dense
                  style="width: 150px; display: inline-block"
                />
              </span>
            </div>

            <div v-if="testQuestion.type === 'inline-input'">
              <div class="text-bold"> {{testQuestion.task}}</div>
              <span>
                {{testQuestion.questionStart}}
                <q-input
                  v-model="finalResult.questions[index]"
                  @click="finalResult.questionsRight[index] = testQuestion.answer"
                  dense
                  style="width: 150px; display: inline-block"
                />
                {{testQuestion.questionContinue}}
              </span>
            </div>

          </li>
        </ol>
      </div>

      <div class="flex justify-center" style="margin-bottom: 100px">
        <q-btn
          text-color="white"
          :style="`background-color:${colorBtn}`"
          label="Проверить / заменить на в локализации"
          @click="checkAnswers"
        />
      </div>


    </div>
</template>
<script>

import { defineComponent } from "vue";

export default defineComponent({
  name: 'FinalTestPage',
  data() {
    return {
      finalResult:{
        questions:[],
        questionsRight:[]
      },
      finalTestQuestion:[
        {
          type: 'radio',
          task: 'Выберите правильный предлог',
          question:'Look ____ this photograph',
          answers: [
            'to','at','on','of'
          ],
          answer: 2
        },
        {
          type: 'input',
          task:'Дополните предложение',
          question:'This is cool place, for',
          answer: 'picnic'
        },
        {
          type: 'inline-input',
          task:'Выберите Passive Voice или Active Voice и вставье в пропуск',
          questionStart:'I\'m not like other girls, i',
          questionContinue: ' different. (BUILD).',
          answer: 'built',
        },
        {
          type: 'radio',
          task: 'Выберите правильные предлоги',
          question:'She was looking kind of dumb with her finger and a thumb ____ a shape of an L ____ her forhead',
          answers: [
            'with / at', 'in / on', 'in / at', 'with / on'
          ],
          answer: 1
        },
        {
          type: 'radio',
          task: 'Выберите правильный предлог',
          question:'When i was a young boy, my father took me ____ the city to see a marching band.',
          answers: [
            'to','in','into','through'
          ],
          answer: 3
        },
        {
          type: 'inline-input',
          task:'Выберите Passive Voice или Active Voice и вставье в пропуск',
          questionStart:'My back ',
          questionContinue: ' because i am carrying this project on my own. (HURT)',
          answer: 'hurt',
        },
        {
          type: 'inline-input',
          task:'Выберите Passive Voice или Active Voice и вставье в пропуск',
          questionStart:'Somebody once ',
          questionContinue: ' me the world is going to roll me. (TELL)',
          answer: 'told',
        },
        {
          type: 'input',
          task:'Заполнить пропуск',
          question:'She is lovestruck, so every red flag',
          answer: 'ignored'
        },
        {
          type: 'input',
          task:'Заполнить пропуск',
          question:'There is no more place in that',
          answer: 'room'
        },
        {
          type: 'radio',
          task: 'Выберите правильный предлог',
          question:'Roadwork ____. Yeah, i sure hope it does.',
          answers: [
            'ahead','in front','before','beside'
          ],
          answer: 1
        },
        {
          type: 'radio',
          task: 'Выберите правильный предлог',
          question:'She ate a whole cheese pack __ lunch yesterday and called it girl dinner',
          answers: [
            'in','in front','on','for'
          ],
          answer: 2
        },

      ]
    }
  },
  methods:{
    checkAnswers(){
      if(this.finalResult.questions.length !== this.finalTestQuestion.length){
        alert('Проверьте заполненость ответов')
        return false
      }
      else {
        let result = 0
        for (let index in this.finalResult.questions) {
          if(this.finalResult.questions[index] === this.finalResult.questionsRight[index]) {
            result+=1
          }
        }
        alert(`${result}` + "/" + `${this.finalResult.questions.length}` + " ваш результат")
      }

    }
  },
  computed: {
    colorBtn(){
      return localStorage.getItem('color') ? localStorage.getItem('color') : 'primary'
    }
  }
})
</script>
<style>
li{
  margin-bottom: 20px;
}
</style>
