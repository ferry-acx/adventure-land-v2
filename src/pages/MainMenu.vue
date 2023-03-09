<template>
  <q-page padding class="page-container flex flex-center q-pa-xl">
    <div
      class="bg-white full-width q-pa-md rounded-borders shadow-14"
      style="min-height: 400px; max-width: 400px"
    >
      <div class="q-pa-lg">
        <q-img src="statics/images/monster-yes.png"></q-img>
      </div>
      <div class="rowjustify-center">
        <div class="col q-gutter-sm">
          <div class="row">
            <div class="col">
              <q-btn
                push
                color="primary"
                class="full-width"
                style="min-height: 50px"
                to="setup"
              >
                <q-icon left size="2em" name="settings" />
                <div>Setup</div>
              </q-btn>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-btn
                push
                color="secondary"
                class="full-width"
                style="min-height: 50px"
                to="game"
              >
                <q-icon left size="2em" name="sports_esports" />
                <div>Start</div>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'MainMenuPage'
}
</script>
<style lang="sass" scoped>
.page-container
  background: linear-gradient(180deg, #26a69a 35%, #fff 15%, #fff 50%);
</style>
