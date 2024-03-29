<template>
    <div class="q-mt-xl q-px-md" style="min-height: 700px">
      <h6 class="q-my-none q-mb-md">{{localization.favouritesPage.title}}</h6>
        <q-tabs
            v-model="tab"
            dense
            align="left"
            class="bg-primary text-white shadow-2"
            style="max-width: fit-content; border-radius: 25px 25px 0 0"
            :breakpoint="0"
        >
<!--          <q-tab class="q-px-xl q-px-md q-py-sm" name="tests">Тесты</q-tab>-->
          <q-tab class="q-px-xl q-px-md q-py-sm" name="materials">{{ localization.favouritesPage.tabs.lesson }}</q-tab>
        </q-tabs>

        <q-tab-panels  swipeable v-model="tab" animated>

<!--          <q-tab-panel class="q-pa-none" name="tests">-->
<!--            <q-scroll-area style="height: 600px;">-->
<!--              <q-list separator>-->
<!--                <q-item-->
<!--                  v-for="(test) in tests"-->
<!--                  :key="test.subject"-->
<!--                  clickable-->
<!--                  v-ripple-->
<!--                  class="rounded-borders q-py-xs q-mb-md bg-white"-->
<!--                  @click="$router.push('/')"-->
<!--                >-->
<!--                  <q-item-section>-->
<!--                    <div class="row items-center">-->
<!--                      <div class="col-10">-->
<!--                        <div class="q-mb-xs">-->
<!--                          Название: {{ test.nameOfTest.length > 19 ? test.nameOfTest.slice(0,19) + '...' : test.nameOfTest  }}-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          Тема: {{ test.subjectOfTest }}-->
<!--                        </div>-->
<!--                      </div>-->

<!--                      <div class="col-2">-->
<!--                        <div class="q-mb-xs">-->
<!--                          {{ test.level }}-->
<!--                        </div>-->
<!--                        <div>-->
<!--                          <q-icon :color="test.isFinished ? 'positive':'negative'" name="quiz" size="25px"/>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </q-item-section>-->
<!--                </q-item>-->
<!--              </q-list>-->
<!--            </q-scroll-area>-->
<!--          </q-tab-panel>-->

          <q-tab-panel class="q-pa-none" name="materials">
            <q-scroll-area class="q-pa-md"  style="height: 600px;">
              <q-list v-if="favoriteMaterials.length > 0" separator>

                <q-item
                  v-for="(material, index) in favoriteMaterials"
                  :key="material.subject"
                  clickable
                  v-ripple
                  class="q-py-xs q-mb-md bg-white"
                >
                  <q-item-section class="">
                    <div class="row items-center">

                      <div class="col-7">
                        <div class="q-mb-xs">
                          {{ localization.materialsPage.lesson.nameLesson }} №{{index+1}}
                        </div>
                        <div>
                          {{ localization.materialsPage.lesson.subject }}: {{ material.subject }}
                        </div>
                      </div>

                      <div class="col-5">
                        <q-btn icon-right="favorite_border" label="Удалить" flat color="pink" @click="deleteFromFavorites(material.subject, index)" />
                      </div>

                    </div>
                  </q-item-section>
                </q-item>

                <q-separator/>

              </q-list>
              <p v-if="favoriteMaterials.length === 0 ">
                {{ localization.favouritesPage.textNoFavourites}}<q-icon name="favorite_border" color="pink" size="25px"/>
              </p>
            </q-scroll-area>
          </q-tab-panel>

        </q-tab-panels>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FavouritesPage',
  data(){
    return{
      tab: 'materials',
      materials:null,
      favoriteMaterials:[],
      tests:[],
      localization: null,


    }
  },
  methods:{
    deleteFromFavorites(subject, index){
      for (let material of this.materials) {
        if(material.subject === subject){
          material.isFavorite = false
        }
      }
      this.favoriteMaterials.splice(index,1)

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

    for (let index of this.materials) {
      console.log(index.tests, 'test')
      const test = {
        'nameOfTest': index.tests[0].nameOfTest,
        'isFinished': index.tests[0].isFinished,
        'subjectOfTest': index.subject,
        'level': index.level
      }
      if(index.tests[0].isFinished) {
        this.progress+=1
      }
      this.progress = (this.progress / 10).toFixed(1)
      this.tests.push(test)
    }

    for( let index of this.materials) {
      if(index.isFavorite){
        this.favoriteMaterials.push(index)
      }
    }
    this.localization = JSON.parse(localStorage.getItem("localization"))
  }
})
</script>
