<template>
    <q-page padding class="theme-banner banner-container row items-center">
        <div class="col-12">
            <div class="row items-center">
                <div class="col-12 justify-center text-center">
                    <q-img class="image" :src="current.question.image" />
                </div>
            </div>
            <div class="row q-ma-lg items-center">
                <div class="col-12 text-center">
                    <h5 class="text-center xs">{{ current.question.text }}</h5>
                    <h2 class="text-center gt-xs">{{ current.question.text }}</h2>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { sync } from 'vuex-pathify';

export default {
    name: 'BannerPage',
    computed: {
        current: sync('game/active')
    },
    data() {
        return {};
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

.banner-container {
    padding: 0px 30px 30px;

    h5 {
        // margin-top: 5px;
        font-size: 18px;
    }

    h2 {
        // margin-top: 5px;
        font-size: 32px;
    }

    .image {
        width: 75%;
    }
}

.body-text {
    font-size: 16px;
    font-weight: bold;
    position: relative;
}
</style>
