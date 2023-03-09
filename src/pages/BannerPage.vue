<template>
  <q-page padding class="row full-width full-height items-center">
    <div class="col-12">
      <div class="row">
        <div class="col-12">
          <q-img :src="current.question.image" ratio="1" />
        </div>
      </div>
      <div class="row full-width">
        <div class="col-12 text-center text-h3">
          {{ current.question.text }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { sync } from 'vuex-pathify'

export default {
  name: 'BannerPage',
  computed: {
    current: sync('game/active')
  },
  data () {
    return {
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
