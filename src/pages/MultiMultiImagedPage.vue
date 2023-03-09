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
          class="col-5 q-ma-sm"
          v-for="[index, choice] of current.question.choices.entries()"
          :key="index"
        >
          <div class="row justify-center full-height full-width text-center">
            <q-btn
              v-bind:class="[active.includes(index) ? activeClass : inactiveClass]"
              @click="answerClicked(index)"
            >
              <img :src="choice.image" style="height: 100px; width: 100px; object" />
              <span class="text-caption text-center">{{ choice.text }}</span>
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
  name: 'MultiMultiImagedPage',
  computed: {
    current: sync('game/active')
  },
  data () {
    return {
      active: [],
      activeClass: 'bg-secondary text-white',
      inactiveClass: 'bg-white text-secondary'
    }
  },
  methods: {
    ...call('game/*'),
    answerClicked (index) {
      if (this.active.includes(index)) {
        this.active = this.active.filter(value => index !== value)
      } else {
        this.active.push(index)
      }

      let answers = []
      for (const id of this.active) {
        answers.push({
          id,
          value: this.current.question.choices[id].text
        })
      }

      this.setAnswer(answers)
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
  overflow: hidden
</style>
