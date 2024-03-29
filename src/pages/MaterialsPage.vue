<template>
  <q-page class="flex flex-center">
    <div class=" q-pb-xl full-width flex column justify-center">
      <div class="bg-primary q-mx-md q-pa-lg rounded-borders" >
        <p class="text-white">{{localization.materialsPage.title}}: </p>

        <q-linear-progress
            :value="progress"
            color="white"
            rounded
            size="md"
            class="q-mt-md"
        />
        <div class="text-white">
          {{progress*10}} / {{materials.length}}
        </div>
      </div>

      <div class="q-mt-md" >
        <q-scroll-area class="q-pa-md"  style="height: 400px;">
          <q-list separator>

          <q-item
              v-for="(material, index) in materials"
              :key="material.subject"
              @click="openDialog(index)"
              clickable
              v-ripple
              class="rounded-borders q-py-xs q-mb-md bg-white"
          >
            <q-item-section class="">
              <div class="row items-center">
                <div class="col-10">
                  <div class="q-mb-xs">
                    {{ localization.materialsPage.lesson.nameLesson }} №{{index+1}}
                  </div>
                  <div>
                    {{ localization.materialsPage.lesson.subject }}: {{ material.subject }}
                  </div>
                </div>

                <div class="col-2">
                  <div class="q-mb-xs">
                    {{ material.level }}
                  </div>
                  <div>
                    <q-icon :color="material.isFinished ? 'positive':'negative'" name="quiz" size="25px"/>
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        </q-scroll-area>
      </div>
    </div>

    <Teleport to="body">
      <q-dialog v-model="openDialogTest">
        <q-card class="q-pa-md">
          <q-card-section class="flex justify-between">
            <div class="text-h6">{{ localization.materialsPage.lesson.nameLesson }} №{{testIndex+1}}</div>
            <q-btn flat icon="close" color="primary" v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p>
              {{materials[testIndex].text}}
            </p>
          </q-card-section>

          <q-card-actions align="between">
            <q-btn flat icon="favorite_border" :color="materials[testIndex].isFavorite ? 'red':'primary'" @click="changeFavoriteMaterial(testIndex)" />
            <q-btn flat :label="localization.materialsPage.getToTestBtnText" @click="$router.push(`/testPage?materialNumber=${testIndex}`)"  color="primary"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </Teleport>


  </q-page>
</template>

<script>
const materials =  [
    {
      "subject": "Пассивный залог",
      "level": "B1",
      "isFinished": false,
      "favourite": false,
      "text": "Пассивный залог (Passive Voice) – это грамматическая конструкция, которая показывает, что подлежащее (кто? что?) не совершает действие самостоятельно, а испытывает действие на себе, является объектом действия. Тот (то), над кем (чем) совершается действие, называется passive subject.",
      "tests": [
        {
          "isFinished": false,
          "nameOfTest": "Пассивный залог",
          "questions":[
            {
              question: "He was elected ___ President many years ago.",
              answers:  ['the','a','-'],
              correctAnswer: 1
            },
            {
              question: "She adores being ___.",
              answers:  ['looked','look at','looked at'],
              correctAnswer: 2
            },
            {
              question: "Nobody listens to me. Это то же самое, что и ...",
              answers:  ['I never listened to','I am never listened to','I am never listened'],
              correctAnswer: 3
            },
            {
              question: "I’m surprised she ___ the job.",
              answers:  ["wasn't offered","didn't get offered",'Оба варианты возможны'],
              correctAnswer: 2
            },

            {
              question: "Выберите продолжение для следующей реплики: My car is gone!",
              answers:  ["It had been stolen","It has been stolen",'It will be stolen'],
              correctAnswer: 1
            },

            {
              question: "He has always ___ as a sort of clown.",
              answers:  ["be seen","been seen",'was seen'],
              correctAnswer: 3
            },
            {
              question: "___ adverbs ___ between the verb and the object?",
              answers:  ["Can, put","Can be, put",'Can, be put'],
              correctAnswer: 2
            },


          ]
        }
      ]
    },
    {
      "subject": "Глаголы",
      "level": "B2",
      "isFinished": false,
      "favourite": false,
      "text": "Глагол (Verb) – это самостоятельная часть речи, которая выражает действие предмета или лица или их состояние. Глаголы отвечают на вопрос «что делать?», «что сделать?».\n" +
        "\n" +
        "Глаголы английского языка изменяются в зависимости от лица (I, You, He и др.), числа (единственное или множественное), времени в предложении. Глаголы имеют пассивный и активный залог, наклонение и четыре аспекта (неопределенный, длительный, совершенный и совершенно-длительный). Различают также переходные и непереходные глаголы.",
      "tests": [
        {
          "isFinished": false,
          "nameOfTest": "Выберите глагол",
          "questions":[
            {
              question: "He usually _______ breakfast at 7 am.",
              answers:  ['eat','eating','ate', 'eats'],
              correctAnswer: 1
            },
            {
              question: "They _______ a movie right now.",
              answers:  ['watch','watching','watched', 'watches'],
              correctAnswer: 2
            },
            {
              question: "We _______ to the beach last weekend.",
              answers:  ['go','going','went', 'goes'],
              correctAnswer: 3
            },
            {
              question: "She _______ TV when the power went out.",
              answers:  ['watch','watching','watched', 'was watching'],
              correctAnswer: 4
            },
            {
              question: "I _______ to Paris next month.",
              answers:  ['go','going','went', 'will go'],
              correctAnswer: 4
            },
            {
              question: "They _______ a party on Saturday evening.",
              answers:  ['plan','planning','planned', 'will be planning'],
              correctAnswer: 4
            },
            {
              question: "Choose the correct verb form in the present perfect tense:",
              correctAnswer: 4,
              answers:  ['read','reading','reads', 'has read']
            },
            {
              question: "They _______ dinner before the guests arrived.",
              answers:  ['eat','eating',' had eaten', 'ate'],
              correctAnswer: 3
            },
            {
              question: "By next year, I _______ the language.",
              answers:  ['learn','will learn',' learning', 'would learn'],
              correctAnswer: 2
            },
            {
              question: "We _______ for six hours.",
              answers:  ['study','studying','studied', 'have been studying'],
              correctAnswer: 4
            },
          ]
        }
      ]
    },
    {
    "subject": "Прилагательные",
    "level": "B2",
    "isFinished": false,
    "favourite": false,
    "text":" Прилагательное (Adjective) – это самостоятельная часть речи, которая указывает на признак лица, предмета или понятия и отвечает на вопрос «какой?». В английском языке они не имеют категории рода и числа, поэтому не меняют своей формы. Прилагательные чаще всего используются с существительными и в предложениях выступают определением или именной частью составного сказуемого.",
    "tests": [
      {
        "isFinished": false,
        "nameOfTest": "Выберите подходящее прилагательное:",
        "questions":[
          {
            question: "Their flat is … than ours",
            answers:  ['the larger','larger','more large', 'more larger'],
            correctAnswer: 1
          },
          {
            question: "You are … person that I know.",
            answers:  ['luckyer','lucky','the luckyest', 'the luckiest'],
            correctAnswer: 2
          },
          {
            question: "The situation is … than I thought",
            answers:  ['more bad','worse','badder', 'badass'],
            correctAnswer: 3
          },
          {
            question: "Today the weather is … than yesterday",
            answers:  ['much nicer','niceer','more nicer', 'nice'],
            correctAnswer: 4
          },
          {
            question: "This car is … of all.",
            answers:  ['a less expensive','an expensive','the least expensive', 'the little expensive'],
            correctAnswer: 4
          },
          {
            question: "The new teacher is … than the previous one..",
            answers:  ['a lot of good','many better','many good', 'a lot better'],
            correctAnswer: 4
          },
          {
            question: "This room is not so … as that one on the first floor.",
            correctAnswer: 4,
            answers:  ['comfortable','more comfortable','the most comfortable', 'the most comfortabler']
          },
          {
            question: "The more you learn … you become.",
            answers:  ['smarter','the smartest',' the smarter', 'smart'],
            correctAnswer: 3
          },
          {
            question: "We left … way possible",
            answers:  ['the quickest','a quick',' the quickiest', 'a quicker'],
            correctAnswer: 2
          },
          {
            question: "What sea is … The Black or the Red?",
            answers:  ['little saltier','less salty','less saltier', 'salty'],
            correctAnswer: 4
          },
        ]
      }
    ]
  },
    {
      "subject": "times",
      "level": "B1",
      "isFinished": false,
      "favourite": false,
      "text": "some random text maybe Lorem Ipulum",
      "tests": [
        {
          "nameOfTest": "times test",
          "questions": [
            {
              "questionText": "Не ЛУчший ЯП?",
              "answers":  ["Java","JavaScript","Huskell", "Python"],
              "correctAnswer": 3
            }
          ]
        }
      ]
    },
    {
      "subject": "verbs",
      "level": "C2",
      "isFinished": false,
      "favourite": false,
      "text": "some random text maybe Lorem Ipulum",
      "tests": [
        {
          "nameOfTest": "verbs test",
          "questions": [
            {
              "questionText": "Не ЛУчший ЯП?",
              "answers":  ["Java","JavaScript","Huskell", "Python"],
              "correctAnswer": 3
            }
          ]
        }
      ]
    },
    {
      "subject": "times",
      "level": "B2",
      "isFinished": false,
      "favourite": false,
      "text": "some random text maybe Lorem Ipulum",
      "tests": [
        {
          "nameOfTest": "grammar test",
          "questions": [
            {
              "questionText": "Не ЛУчший ЯП?",
              "answers":  ["Java","JavaScript","Huskell", "Python"],
              "correctAnswer": 3
            }
          ]
        }
      ]
    },
    {
      "subject": "grammar",
      "level": "A1",
      "isFinished": false,
      "favourite": false,
      "text": "some random text maybe Lorem Ipulum",
      "tests": [
        {
          "nameOfTest": "grammar test",
          "questions": [
            {
              "questionText": "Не ЛУчший ЯП?",
              "answers":  ["Java","JavaScript","Huskell", "Python"],
              "correctAnswer": 3
            }
          ]
        }
      ]
    },
    {
      "subject": "grammar",
      "level": "A1",
      "isFinished": false,
      "favourite": false,
      "text": "some random text maybe Lorem Ipulum",
      "tests": [
        {
          "nameOfTest": "grammar test",
          "questions": [
            {
              "questionText": "Не ЛУчший ЯП?",
              "answers":  ["Java","JavaScript","Huskell", "Python"],
              "correctAnswer": 3
            }
          ]
        }
      ]
    },
    {
      "subject": "grammar",
      "level": "A1",
      "isFinished": false,
      "favourite": false,
      "text": "some random text maybe Lorem Ipulum",
      "tests": [
        {
          "nameOfTest": "grammar test",
          "questions": [
            {
              "questionText": "Не ЛУчший ЯП?",
              "answers":  ["Java","JavaScript","Huskell", "Python"],
              "correctAnswer": 3
            }
          ]
        }
      ]
    },
    {
      "subject": "grammar",
      "level": "A1",
      "isFinished": false,
      "favourite": false,
      "text": "some random text maybe Lorem Ipulum",
      "tests": [
        {
          "nameOfTest": "grammar test",
          "questions": [
            {
              "questionText": "Не ЛУчший ЯП?",
              "answers":  ["Java","JavaScript","Huskell", "Python"],
              "correctAnswer": 3
            }
          ]
        }
      ]
    }
  ]

const localization = {
  rus:{
    nav: {
      materials: {
        text:'Материалы',
        description:'Уроки для изучения'
      },
      tests: {
        text: 'Тесты',
        description: 'Выбрать тест'
      },
      favourite: {
        text: 'Любимое',
        description: 'Ваши сохраненные тесты или уроки',
      },
      settings: {
        text:'Настройки',
        description:'Настройте шрифт или цвет приложения'
      },
    },
    materialsPage: {
      title: 'Пройденные материалы',
      lesson: {
        nameLesson:'Название урока',
        subject:'Тема',
      },
      getToTestBtnText:'Перейти к тесту'
    },
    testsPage: {
      title: 'Пройденные тесты',
      toRandomTestBtnText: 'Выбрать случайные тест',
      toFinalTestBtnText: 'Перейти к итоговому тесту',
      test: {
        testName:'Название теста',
        subject: 'Тема'
      }
    },
    testPage:{
      btnAnswerText:'Ответить',
      questionText:'Вопрос',
      questionFrom: 'из',
      result:{
        success:'Превосходно! Ваш результат',
        satisfactorily: 'Сомнительно, но окей. Ваш результат',
        disappointment: 'Вы можете лучше... Ваш результат'
      },
      getToMainBtnText:'Перейти к главному меню'
    },
    favouritesPage: {
      title:'Избранное',
      tabs: {
        lesson: 'Уроки',
      },
      textNoFavourites: "Вы еще не добавили ни одного урока в избранное.\n" + "Чтобы сделать это перейдите в урок и нажмите на "
    },
    settingsPage: {
      title: 'Настройки',
      chooseColorText:'Цвет главной темы',
      chooseFontSize:'Размер шрифта',
      chooseLanguage:'Выбор языка',
    }
  }
}
import { defineComponent } from 'vue'
import {Notify} from 'quasar'
import { PushNotifications } from '@capacitor/push-notifications';
export default defineComponent({
  name: 'IndexPage',
  components: {},
  data(){
    return {
       progress: 0,
       openDialogTest: false,
       materials: null,
       initMaterials: materials,
       testIndex: 0,
       localization: localization.rus
    }
  },
  methods: {
    pushNotifications() {
      Notify.create({
        message: 'Урок добавлен в избранное!',
        color: 'pink',
        icon:'favorite_border',
        position:'top'
      })
      // Проверка поддержки браузером уведомлений
      // if (!("Notification" in window)) {
      //   alert("This browser does not support desktop notification");
      // }
      //
      // // Проверка разрешения на отправку уведомлений
      // else if (Notification.permission === "granted") {
      //   // Если разрешено, то создаём уведомление
      //   let notification = new Notification("Урок добавлен в избранное!");
      // }
      //
      // // В противном случае, запрашиваем разрешение
      // else if (Notification.permission !== "denied") {
      //   Notification.requestPermission(function (permission) {
      //     // Если пользователь разрешил, то создаём уведомление
      //     if (permission === "granted") {
      //       let notification = new Notification("Урок добавлен в избранное!");
      //     }
      //   });
      // }

      // В конечном счёте, если пользователь отказался от получения
      // уведомлений, то стоит уважать его выбор и не беспокоить его
      // по этому поводу.
    },
    changeFavoriteMaterial(n){
      this.materials[n].isFavorite = !this.materials[n].isFavorite
      this.pushNotifications()
    },
    openDialog(n){
      this.openDialogTest = true
      this.testIndex = n
    },
    // проблема: на телефоне не передается файл api
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

    }
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
  created() {
    this.getMaterials()

    if(localStorage.getItem("localization")) {
      this.localization = JSON.parse(localStorage.getItem("localization"))
    }
    else {
      localStorage.setItem("localization", JSON.stringify(localization['rus']));
    }
  }
})
</script>

<style>


</style>
