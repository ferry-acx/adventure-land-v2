<template>
    <q-page padding class="theme-multi-multi-imaged row full-width items-center justify-center fixed">
        <div class="col-12">
            <div class="row q-mb-xl">
                <div class="col-12 text-center">
                    <div class="text-grey-8 text-h6">{{ current.question.text }}</div>
                </div>
            </div>
            <div class="row wrap q-ma-md justify-center items center">
                <div class="col-5 q-ma-sm" v-for="[index, choice] of current.question.choices.entries()" :key="index">
                    <div class="row justify-center full-height full-width text-center">
                        <q-btn
                            class="full-width"
                            v-bind:class="[current.multiAnswers.includes(index) ? 'active-choice' : 'inactive-choice']"
                            @click="answerClicked(index)"
                        >
                            <template>
                                <div class="row full-width">
                                    <div class="col">
                                        <div class="row justify-center">
                                            <div class="col-12">
                                                <img :src="choice.image" style="height: 100px; width: 100px;" />
                                            </div>
                                        </div>
                                        <div class="row full-width">
                                            <div class="col-12">
                                                <span class="text-caption text-center">{{ choice.text }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { sync, call } from 'vuex-pathify';

export default {
    name: 'MultiMultiImagedPage',
    computed: {
        current: sync('game/active')
    },
    data() {
        return {
            // active: [],
            activeClass: 'bg-secondary text-white',
            inactiveClass: 'bg-white text-secondary'
        };
    },
    methods: {
        ...call('game/*'),
        answerClicked(index) {
            let multiAnswers = this.current.multiAnswers;
            if (multiAnswers.includes(index)) {
                multiAnswers = multiAnswers.filter(value => index !== value);
            } else {
                multiAnswers.push(index);
            }

            const currentActive = {
                ...this.current,
                multiAnswers: multiAnswers
            };

            this.setActive(currentActive);

            let answers = [];
            for (const id of this.current.multiAnswers) {
                answers.push({
                    id,
                    value: this.current.question.choices[id].text,
                    skip: this.current.question.choices[id].skip
                });
            }

            this.setAnswer(answers);
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
</style>
