<template>
  <q-page padding class="row full-width full-height items-center justify-center">
    <div class="col-12">
      <div class="row q-ma-lg">
        <div class="col-12 text-center">
          <div class="text-grey-8 text-subtitle1">
              {{ current.question.text }}
          </div>
        </div>
      </div>
      <div class="row wrap q-ma-md justify-center items center">
        <div
          class="col-12 q-ma-sm"
          v-for="[index, choice] of current.question.choices.entries()"
          :key="index"
        >
          <div class="row justify-center full-height full-width text-center">
            <q-btn
              class="full-width"
              v-bind:class="[active === index ? activeClass : inactiveClass]"
              @click="answerClicked(index)"
            >
              <div class="text-body">{{ choice.text }}</div>
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
  name: 'MultiSingleTextPage',
  computed: {
    current: sync('game/*')
  },
  data () {
    return {
      active: 0,
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

.button-text
  position: absolute
  width: 100%
  bottom: 0
  height: 25%
  background: rgba(0, 0, 0, 0.3)
</style>
