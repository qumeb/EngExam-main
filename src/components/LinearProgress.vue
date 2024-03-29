<template>
  <div class="bg-cyan-7 q-pa-lg rounded-borders">
    <p>{{title}} </p>

    <q-linear-progress
        :value="progress"
        color="white"
        rounded
        size="md"
        class="q-mt-md"
    />
    <div>
      {{progress}} / 10
    </div>
  </div>
</template>

<script>
export default {
  name: "LinearProgress",
  data(){
    return{
      progress:0.3,

    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    // progress: Number,
    // progressOf: Number,
  },
}
</script>

<style scoped>

</style>