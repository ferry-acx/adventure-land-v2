<template>
    <q-page
        padding
        class="theme-multi-single-text multi-single-text-container row full-width full-height items-center justify-center"
    >
        <div class="col-12">
            <div class="row q-mb-xl">
                <div class="col-12 text-center">
                    <div class="text-h6">{{ current.question.text }}</div>
                </div>
            </div>
            <div class="row wrap q-ma-md justify-center items center">
                <div class="col-12 q-ma-sm" v-for="[index, choice] of current.question.choices.entries()" :key="index">
                    <div class="row justify-center full-height full-width text-center">
                        <q-btn
                            class="full-width"
                            v-bind:class="[current.singleAnswer === index ? 'active-choice' : 'inactive-choice']"
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
import { sync, call } from 'vuex-pathify';

export default {
    name: 'MultiSingleTextPage',
    computed: {
        current: sync('game/active')
    },
    data() {
        return {
            activeClass: 'bg-secondary text-white',
            inactiveClass: 'bg-white text-secondary'
        };
    },
    methods: {
        ...call('game/*'),
        answerClicked(index) {
            console.log(this.current);
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

.multi-single-text-container {
    padding: 30px 30px;
}
</style>
