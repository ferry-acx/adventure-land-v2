<template>
    <q-page padding class="theme-one-input one-input-container row items-center">
        <div class="col-12 justify-center">
            <h5 class="text-center xs">{{ current.question.text }}</h5>
            <h2 class="text-center gt-xs">{{ current.question.text }}</h2>
            <div class="row wrap q-ma-md items-center">
                <div class="col-12 text-center justify-center">
                    <q-input
                        standout
                        rounded
                        :type="current.question.inputType"
                        v-model="current.singleAnswer"
                        @input="inputChanged"
                        input-class="text-right"
                        class="input-field q-pa-sm"
                    >
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                </div>
            </div>
            <div class="row wrap q-ma-md items-center full-width">
                <div class="col-12 justify-center text-center">
                    <q-img class="image" :src="current.question.image" />
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { sync, call } from 'vuex-pathify';

export default {
    name: 'OneInputPage',
    computed: {
        current: sync('game/active')
    },
    data() {
        return {};
    },
    methods: {
        ...call('game/*'),
        inputChanged() {
            const answer = {
                value: this.current.singleAnswer
            };

            this.setAnswer(answer);
        }
    }
};
</script>
<style lang="scss">
@import '../css/themes/primary.scss';
@import '../css/themes/family-town.scss';
@import '../css/themes/school-point.scss';
@import '../css/themes/internet-village.scss';
@import '../css/themes/sad-zone.scss';
@import '../css/themes/dream-district.scss';

.one-input-container {
    padding: 30px 30px;

    h5 {
        margin-top: 5px;
        font-size: 16px;
    }

    h2 {
        margin-top: 5px;
        font-size: 24px;
    }

    .image {
        max-width: 62%;
        margin: 20px;
    }
}

.body-text {
    font-size: 16px;
    font-weight: bold;
    position: relative;
}
</style>
