<template>
    <q-page padding class="page-container flex flex-center q-pa-xl">
        <div class="title-container text-center">Amazing Land of Adventures</div>
        <div class="menu-container bg-white full-width q-pa-md shadow-14">
            <div class="q-pa-lg">
                <q-img src="statics/images/mascot/mother-cheer.png"></q-img>
            </div>
            <div class="row justify-center">
                <div class="col q-gutter-sm">
                    <div class="row">
                        <div class="col">
                            <q-btn push color="primary" class="full-width" style="min-height: 50px" to="setup">
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
                                @click="disableStart ? notifyConfig() : startGame()"
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
import { sync, call } from 'vuex-pathify';

export default {
    name: 'MainMenuPage',
    computed: {
        config: sync('config/active'),
        disableStart() {
            return !(this.config.userId && this.config.fullname);
        }
    },
    methods: {
        setConfigActive: call('config/setActive'),
        notifyConfig() {
            this.$q.notify({
                type: 'negative',
                message: 'Fill-up config to start the game!',
                timeout: 2000
            });
        },
        startGame() {
            const active = {
                ...this.config,
                gender: '',
                name: ''
            };
            this.setConfigActive(active);
            this.$router.push('game');
        }
    }
};
</script>
<style lang="scss" scoped>
.page-container {
    background: linear-gradient(180deg, #26a69a 35%, #fff 15%, #fff 50%);

    .title-container {
        // position: absolute;
        // z-index: 999;
        // top: 75px;
        color: #fff;
        font-size: 20px;
    }

    .menu-container {
        min-height: 400px;
        max-width: 400px;
        border-radius: 15px;
    }
}
</style>
