<template>
    <q-page class="theme-multi-single-imaged multi-single-imaged-container row items-center">
        <div class="col-12 justify-center">
            <div class="row q-mb-xl">
                <div class="col-12 text-center">
                    <div class="text-h6">{{ current.question.text }}</div>
                </div>
            </div>
            <div class="choice-row row wrap q-ma-md items-center justify-center">
                <div
                    class="col-5 choice-container"
                    v-for="[index, choice] of current.question.choices.entries()"
                    :key="index"
                >
                    <div class="row justify-center full-height full-width text-center">
                        <q-btn
                            v-bind:class="[current.singleAnswer === index ? 'active-choice' : 'inactive-choice']"
                            @click="answerClicked(index)"
                        >
                            <div class="row">
                                <div class="col">
                                    <div class="row">
                                        <img :src="choice.image" class="image" />
                                    </div>
                                    <div class="row choice-label">
                                        <div class="col text-center">
                                            <span class="text-caption text-center">{{ choice.text }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    name: 'MultiSingleImagedPage',
    computed: {
        current: sync('game/active')
    },
    data() {
        return {};
    },
    methods: {
        ...call('game/*'),
        answerClicked(index) {
            const currentActive = {
                ...this.current,
                singleAnswer: index
            };

            this.setActive(currentActive);

            const answer = {
                id: index,
                value: this.current.question.choices[index].text,
                skip: this.current.question.choices[index].skip
            };

            this.setAnswer(answer);
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

.multi-single-imaged-container {
    padding: 30px 30px;

    h5 {
        font-size: 16px;
    }

    h2 {
        font-size: 24px;
    }

    .choice-container {
        margin: 10px auto;

        .choice-label {
            min-height: 40px;
            margin: 5px 0px;
            align-items: center;

            .text-caption {
                font-size: 0.8em;
            }
        }

        .image {
            max-width: 100px;
            max-height: 100px;
        }
    }
}
</style>
