<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer class="bg-white text-white">
            <q-toolbar class="row justify-center full-width text-center">
                <div class="col-12 q-ma-sm q-mb-lg q-px-sm">
                    <q-btn push class="full-width" color="secondary" size="lg" @click="gotoQuestions">
                        Next Question
                    </q-btn>
                </div>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
export default {
    name: 'BannerLayout',
    data() {
        return {};
    },
    methods: {
        gotoQuestions() {
            this.$router.push('/game');
        }
    }
};
</script>
<style lang="sass" scoped>
.game-header .game-footer
  min-height: 100px
</style>
