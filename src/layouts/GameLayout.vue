<template>
    <q-layout view="hHh lpR fFf" no-scroll :class="getTheme()">
        <q-header class="theme-header">
            <q-toolbar class="home-container row justify-between items-center">
                <div class="col-2 q-my-md">
                    <q-btn dense round flat icon="home" size="lg" class="home-icon" @click="goHome"></q-btn>
                </div>
                <div class="progress-container col-8 q-my-md">
                    <q-linear-progress
                        ref="linearProgress"
                        stripe
                        rounded
                        class="progress-bar q-ma-none"
                        size="15px"
                        :value="game.progress"
                    ></q-linear-progress>
                    <q-img
                        :src="progressIconSrc"
                        ref="progressIcon"
                        name="mood"
                        style="width: 50px;"
                        v-bind:style="iconClassObject"
                    />
                </div>
                <div class="sound-container col-2 q-ma-md" @click="playAudio()">
                    <q-btn flat round>
                        <q-icon name="volume_up" class="sound-icon" size="md"></q-icon>
                    </q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <transition name="slide-fade">
                <banner-page v-if="game.question.template === 'banner'" />
                <instructions-page v-if="game.question.template === 'instructions'" />
                <two-choices-page v-if="game.question.template === 'two-choices'" />
                <one-input-page v-if="game.question.template === 'one-input'" />
                <multi-single-imaged-page v-if="game.question.template === 'multi-single-imaged'" />
                <multi-single-text-page v-if="game.question.template === 'multi-single-text'" />
                <multi-multi-imaged-page v-if="game.question.template === 'multi-multi-imaged'" />
                <multi-multi-text-page v-if="game.question.template === 'multi-multi-text'" />
            </transition>
        </q-page-container>

        <q-footer class="theme-footer">
            <q-toolbar class="row justify-center full-width text-center">
                <div class="col-12 q-ma-sm q-mb-lg q-px-sm">
                    <q-btn
                        v-if="disabledNext"
                        push
                        class="full-width"
                        color="grey"
                        size="lg"
                        @click="submit"
                        :disable="disabledNext"
                        >{{ buttonLabel }}</q-btn
                    >
                    <q-btn v-else push class="next-button full-width" size="lg" @click="submit">
                        {{ buttonLabel }}
                    </q-btn>
                </div>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
import { sync, call } from 'vuex-pathify';

import BannerPage from '../pages/BannerPage';
import InstructionsPage from '../pages/InstructionsPage';
import TwoChoicesPage from '../pages/TwoChoicesPage';
import OneInputPage from '../pages/OneInputPage';
import MultiSingleImagedPage from '../pages/MultiSingleImagedPage';
import MultiSingleTextPage from '../pages/MultiSingleTextPage';
import MultiMultiImagedPage from '../pages/MultiMultiImagedPage';
import MultiMultiTextPage from '../pages/MultiMultiTextPage';

export default {
    name: 'GameLayout',
    components: {
        BannerPage,
        InstructionsPage,
        TwoChoicesPage,
        OneInputPage,
        MultiSingleImagedPage,
        MultiSingleTextPage,
        MultiMultiImagedPage,
        MultiMultiTextPage
    },
    data() {
        return {
            audio: null,
            top: 0,
            progressEl: null,
            progressIconEl: null,
            imgSrc: null
        };
    },
    computed: {
        game: sync('game/active'),
        config: sync('config/active'),
        disabledNext() {
            if ((this.game.question.choices || this.game.question.inputType) && !this.game.question.answer) {
                return true;
            } else {
                return false;
            }
        },
        buttonLabel() {
            const nonQuestions = ['instructions', 'banner'];
            if (nonQuestions.includes(this.game.question.template)) {
                return 'Continue';
            }
            return 'Next Question';
        },
        progressIconPosition() {
            if (this.progressEl && this.progressIconEl) {
                const iconWidth = this.progressIconEl.clientWidth ? this.progressIconEl.clientWidth : 0;
                const clientWidth = this.progressEl.clientWidth ? this.progressEl.clientWidth : 0;
                const progress = this.game.progress ? this.game.progress : 0;
                const position = clientWidth * progress - iconWidth / 2;
                return `${position}px`;
            } else {
                if (this.progressIconEl) {
                    const iconWidth = (this.progressIconEl.clientWidth / 2) * -1;
                    return `${iconWidth}px`;
                }
            }
            return '0px';
        },
        iconClassObject() {
            if (this.progressEl && this.progressIconEl) {
                // const progress = this.game.progress ? this.game.progress : 0
                const progress = this.game.progress ? this.game.progress : 0;
                const left =
                    this.progressEl.offsetLeft -
                    this.progressIconEl.clientWidth / 2 +
                    this.progressEl.clientWidth * progress;

                const classObject = {
                    position: 'absolute',
                    display: 'inline-block',
                    top: `${this.top}px`,
                    left: `${left}px`
                };
                return classObject;
            }
            return {};
        },
        progressIconSrc() {
            if (this.config.gender === 'Boy') {
                return 'statics/images/running-boy.png';
            } else if (this.config.gender === 'Girl') {
                return 'statics/images/running-girl.png';
            } else if (this.config.gender === 'Gay') {
                return 'statics/images/lgbt.png';
            } else if (this.config.gender === 'Lesbian') {
                return 'statics/images/lgbt.png';
            } else {
                return '';
            }
        }
    },
    mounted() {
        this.progressEl = this.$refs.linearProgress.$el;
        this.progressIconEl = this.$refs.progressIcon.$el;
        this.top = this.progressEl.offsetTop;

        this.resetGame();
        this.playAudio();
    },
    beforeDestroy() {
        if (this.audio) {
            this.audio.pause();
        }
    },
    methods: {
        ...call('game/*'),
        ...call('config/*'),
        resetAnswerList: call('answers/resetAnswerList'),
        getTheme() {
            if (this.game.stage.theme === 'theme-family-town') {
                return 'theme-family-town';
            } else if (this.game.stage.theme === 'theme-school-point') {
                return 'theme-school-point';
            } else if (this.game.stage.theme === 'theme-internet-village') {
                return 'theme-internet-village';
            } else if (this.game.stage.theme === 'theme-sad-zone') {
                return 'theme-sad-zone';
            } else if (this.game.stage.theme === 'theme-dream-district') {
                return 'theme-dream-district';
            } else {
                return 'theme-primary';
            }
        },
        goHome() {
            this.resetGame();
            this.resetConfig();
            this.resetAnswerList();
            this.$router.push('/');
        },
        submit() {
            if (this.audio) {
                this.audio.pause();
                this.audio = null;
            }
            this.storeAnswer();
            this.checkConfig();
            this.nextQuestion();
            this.playAudio();
        },
        checkConfig() {
            if (this.game.question.config) {
                const key = this.game.question.config;
                const value = this.game.question.answer.value;
                const newConfig = { ...this.config };
                newConfig[key] = value;
                this.setConfigActive(newConfig);
            }
        },
        playAudio() {
            if (this.game.question.audio) {
                if (this.audio) this.audio.pause();
                const playlist = this.game.question.audio;
                let i = 0;

                this.audio = new Audio();

                this.audio.addEventListener('ended', () => {
                    i = ++i < playlist.length ? i : -1;
                    if (i >= 0) {
                        this.audio.src = playlist[i];
                        this.audio.play();
                    }
                });

                this.audio.loop = false;
                this.audio.src = playlist[i];
                this.audio.play();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import '../css/themes/primary.scss';
@import '../css/themes/family-town.scss';
@import '../css/themes/school-point.scss';
@import '../css/themes/internet-village.scss';
@import '../css/themes/sad-zone.scss';
@import '../css/themes/dream-district.scss';

.slide-fade-enter-active {
    transition: all 0.5s;
}

.slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
}
</style>
