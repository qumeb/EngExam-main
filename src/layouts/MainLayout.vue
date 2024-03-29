<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          EngExam
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

<!--    <q-drawer-->
<!--      v-model="leftDrawerOpen"-->
<!--      show-if-above-->
<!--      bordered-->
<!--    >-->
<!--      <q-list>-->
<!--        <q-item-label-->
<!--          header-->
<!--        >-->
<!--          Меню-->
<!--        </q-item-label>-->

<!--        <EssentialLink-->
<!--          v-for="link in essentialLinks"-->
<!--          :key="link.title"-->
<!--          v-bind="link"-->
<!--        />-->
<!--      </q-list>-->
<!--    </q-drawer>-->

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>


  </q-layout>
  <div class="full-width flex justify-around q-py-lg fixed-bottom bg-white" style="border-radius:20px 20px 0 0">
    <q-btn flat rounded v-for="link in essentialLinks" :key="link.name"  @click="$router.push(link.link)">
      <q-icon :color="link.link === $route.path ? 'primary' : '' " :name="link.icon" size="35px"/>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
export default defineComponent({
  name: 'MainLayout',
  components: {
    // EssentialLink
  },
  data() {
    return {
      hex:'',
      font:'',
      localization: null,
      essentialLinks : [
        {
          title: 'Материалы',
          caption: 'Выбрать уроки',
          icon: 'book',
          link: '/'
        },
        {
          title: 'Тесты',
          caption: 'Выбрать тест',
          icon: 'description',
          link: '/tests'
        },
        {
          title: 'Любимое',
          caption: 'Ваши сохраненные тесты или уроки',
          icon: 'favorite_border',
          link: '/favourites'
        },
        {
          title: 'Настройки',
          caption: 'Настройте шрифт или цвет приложения',
          icon: 'settings',
          link: '/settings'
        },

      ]
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

      this.essentialLinks[0].title = this.localization.nav.materials.text
      this.essentialLinks[0].caption = this.localization.nav.materials.description

      this.essentialLinks[1].title = this.localization.nav.tests.text
      this.essentialLinks[1].caption = this.localization.nav.tests.description

      this.essentialLinks[2].title = this.localization.nav.favourite.text
      this.essentialLinks[2].caption = this.localization.nav.favourite.description

      this.essentialLinks[3].title = this.localization.nav.settings.text
      this.essentialLinks[3].caption = this.localization.nav.settings.description
    }



  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
