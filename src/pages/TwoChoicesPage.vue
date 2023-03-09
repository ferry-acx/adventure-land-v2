<template>
  <q-page padding class="row fit items-center">
    <div class = "col-12">
      <div class = "row">
        <div class="col-12 text-center">
          <div class="text-grey-8 text-h6">
              {{ current.question.text }}
          </div>
        </div>
      </div>
      <div class="row wrap q-ma-md justify-center items center">
        <div
          class="col-5 q-ma-sm"
          v-for="[index, choice] of current.question.choices.entries()"
          :key="index"
        >
          <div class="row justify-center full-height full-width text-center">
            <q-btn
              v-bind:class="[active === index ? activeClass : inactiveClass]"
              @click="answerClicked(index)"
            >
              <img :src="choice.image" style="height: 100px; width: 100px; object" />
              <span class="text-subtitle1 text-center">{{ choice.text }}</span>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { sync, call } from 'vuex-pathify'

export default {
  name: 'TwoChoicesPage',
  computed: {
    current: sync('game/active')
  },
  data () {
    return {
      active: null,
      activeClass: 'bg-secondary text-white',
      inactiveClass: 'bg-white text-secondary'
    }
  },
  methods: {
    ...call('game/*'),
    answerClicked (index) {
      this.active = index

      const answer = {
        id: index,
        value: this.current.question.choices[index].text
      }

      this.setAnswer(answer)
    }
  }
}
</script>
<style lang="sass" scoped>
.body-text
  font-size: 16px
  font-weight: bold
  position: relative
</style>
