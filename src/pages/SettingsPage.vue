<template>
  <q-page class="flex column q-pt-xl q-px-xs">
    <p class="q-pl-md q-mb-xl"> {{localization.settingsPage.title}} </p>
    <div>
      <q-list>
        <q-item class="flex column justify-start">
          <div class="q-mb-lg">
            {{ localization.settingsPage.chooseColorText }}:
          </div>
          <div class="flex">
            <q-color
              v-model="hex"
              v-for="color in palette"
              :key="color"
              :palette="[color]"
              no-footer
              no-header
              no-header-tabs
              default-view="palette"
              class="q-ma-xs rounded-borders"
              :style="`background-color:${color}; min-width:50px; min-height:50px`"
              @click="changeColorTheme(color)"
            />
          </div>
        </q-item>

        <q-separator spaced/>

        <q-item class="flex column justify-start">
          <div class="q-mb-lg">
            {{ localization.settingsPage.chooseFontSize }}:
          </div>
          <div class="flex">
            <q-chip
              disable
              size="18px"
              v-for="(fontElem, index) in fontSizes"
              :key="fontElem.name"
              v-model="font"
              :selected="fontSizes[index].size === font"
              color="primary"
              text-color="white"
              @click="changeFontSize(fontElem.size)"
            >
              {{fontElem.name}}
            </q-chip>
          </div>
        </q-item>

        <q-separator class="q-my-md"/>

        <q-item class="flex column justify-start">
          <div class="q-mb-lg">
            {{ localization.settingsPage.chooseLanguage }}:
          </div>
          <div class="flex">
            <q-radio v-model="language" val="rus" label="Русский"/>
            <q-radio v-model="language" val="eng" label="English"/>
            <q-radio v-model="language" val="kz" label="Қазақ"/>
            <q-radio v-model="language" val="ch" label="中國人"/>
          </div>
        </q-item>

        <q-separator class="q-my-md"/>

        <q-item class="flex column justify-start">
          <div class="q-mb-lg">
            {{ localization.settingsPage.chooseTestBehavior}}: <q-toggle v-model="testBehavior"/>
          </div>
        </q-item>

      </q-list>
    </div>


  </q-page>
</template>

<script>
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
      chooseTestBehavior:'Нажимать на кнопку подтвердить чтобы перейти к следущему вопросу'
    }
  },
  eng:{
    nav: {
      materials: {
        text:'Materials',
        description:'Lessons to learn'
      },
      tests: {
        text: 'Test',
        description: 'Choose test'
      },
      favourite: {
        text: 'Favourite',
        description: 'Your saved tests or lessons Ваши сохраненные тесты или уроки',
      },
      settings: {
        text:'Settings',
        description:'Customize the font or color of the application'
      },
    },
    materialsPage: {
      title: 'Covered materials',
      lesson: {
        nameLesson:"Lesson's name",
        subject:'Subject',
      },
      getToTestBtnText:'Go to test'
    },
    testsPage: {
      title: 'Passed tests',
      toRandomTestBtnText: 'Go to random test',
      toFinalTestBtnText: 'Go to final test',
      test: {
        subject: 'Subject',
        testName:'Test name'
      }
    },
    testPage:{
      btnAnswerText:'Answer',
      questionText:'Question',
      questionFrom: 'of',
      result:{
        success:'Perfect! Your result',
        satisfactorily: 'Doubtful, but ok. Your result',
        disappointment: 'You can do better... Your result'
      },
      getToMainBtnText:'Go to main menu'
    },
    favouritesPage: {
      title:'Favorites',
      tabs: {
        lesson: 'Lessons',
      },
      textNoFavourites: "You haven't added any lessons to your favorites yet.\n" + "To do this, go to the lesson and click on "
    },
    settingsPage: {
      title: 'Settings',
      chooseColorText:'Main theme color',
      chooseFontSize:'Font size',
      chooseLanguage:'Language selection',
      chooseTestBehavior:'Выбери поведение теста (поменять текст)'

    }
  },
  ch:{
    nav: {
      materials: {
        text:'材料',
        description:'值得學習的教訓'
      },
      tests: {
          text: '測試',
        description: '選擇測試'
      },
      favourite: {
        text: '最喜歡的',
        description: '您已儲存的測驗或課程',
      },
      settings: {
        text:'設定',
        description:'自訂應用程式的字體或顏色'
      },
    },
    materialsPage: {
      title: '涵蓋材料',
      lesson: {
        nameLesson:'課程標題',
        subject:'主題',
      },
      getToTestBtnText:'去測試'
    },
    testsPage: {
      title: '測試通過',
      toRandomTestBtnText: '選擇隨機測試',
      test: {
        testName:'測試名稱',
        subject: '主題'
      }
    },
    testPage:{
      btnAnswerText:'回答',
      questionText:'問題',
      questionFrom: '從',
      result:{
        success:'完美的！你的結果',
        satisfactorily: '值得懷疑，但好吧。你的結果',
        disappointment: '你可以做得更好...你的結果'
      },
      getToMainBtnText:'前往主選單'
    },
    favouritesPage: {
      title:'收藏夾',
      tabs: {
        lesson: '教訓',
      },
      textNoFavourites: "您尚未將任何課程添加到您的收藏夾中\n" + "為此，請轉到課程並點擊"
    },
    settingsPage: {
      title: '設定',
      chooseColorText:'主題色',
      chooseFontSize:'字體大小',
      chooseLanguage:'語言選擇',
      chooseTestBehavior:'點擊確認按鈕進入下一個問題'
    }
  },

}
export default {
  name: "SettingsPage",
  data(){
    return{
      testBehavior: false,
      hex: '#FF00FF',
      font:'16px',
      palette: ['#009999', '#D9B801', '#E8045A', '#B2028A'],
      fontSizes: [
        {
          name:'xs',
          size: '12px'
        },
        {
          name:'md',
          size: '16px'
        },
        {
          name:'lg',
          size: '20px'
        },
        {
          name:'xl',
          size: '24px'
        },
      ],
      language:'rus',
      localization: localization.rus,
    }
  },
  methods: {
    changeColorTheme(color){
      document.documentElement.style.setProperty('--q-primary', color);
      localStorage.setItem("color", color);
    },
    changeFontSize(size){
      this.font = size
      document.body.style.setProperty('font-size', size);
      localStorage.setItem("font-size", size);
    },
  },
  watch:{
    language:{
      handler(val, newVal) {
        console.log('language changed')
        this.localization = localization[val]
        localStorage.setItem("language", val);
        localStorage.setItem("localization", JSON.stringify(localization[val]));
      },
    },
    testBehavior: {
      handler(val, newVal) {
        localStorage.setItem("testBehavior", val)
      }
    }
  },
  created() {
    if(localStorage.getItem("color")) {
      this.hex = localStorage.getItem("color")
      this.changeColorTheme(localStorage.getItem("color"))
    }
    if(localStorage.getItem("font-size")) {
      this.hex = localStorage.getItem("font-size")
      this.changeFontSize(localStorage.getItem("font-size"))
    }
    if(localStorage.getItem("localization")) {
      this.localization = JSON.parse(localStorage.getItem("localization"))
      this.language = localStorage.getItem("language")
    }
    if(localStorage.getItem("testBehavior")) {
      this.testBehavior = JSON.parse(localStorage.getItem("testBehavior"))
    }
  }
}
</script>
