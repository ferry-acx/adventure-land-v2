<template>
    <q-page class="theme-instruction instructions-container row items-center">
        <div class="col-12 justify-center">
            <h5 class="text-center xs">{{ current.question.text }}</h5>
            <h2 class="text-center gt-xs">{{ current.question.text }}</h2>
            <div class="row justify-center">
                <q-img class="image" :src="current.question.image" />
            </div>
        </div>
    </q-page>
</template>

<script>
import { sync } from 'vuex-pathify';

export default {
    name: 'InstructionsPage',
    computed: {
        current: sync('game/active')
    },
    created() {}
};
</script>
<style lang="scss" scoped>
@import '../css/themes/primary.scss';
@import '../css/themes/family-town.scss';
@import '../css/themes/school-point.scss';
@import '../css/themes/internet-village.scss';
@import '../css/themes/sad-zone.scss';
@import '../css/themes/dream-district.scss';

.instructions-container {
    padding: 0px 30px 30px;

    h5 {
        margin-top: 10px;
        font-size: 16px;
    }

    h2 {
        font-size: 24px;
    }

    .image {
        max-width: 55%;
        margin: 20px;
    }
}
</style>
