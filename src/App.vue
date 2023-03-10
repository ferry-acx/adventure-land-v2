<template>
    <div id="q-app" class="orientation-portrait">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
};
</script>
<style lang="scss">
@import './css/fonts.scss';
* {
    font-family: 'Short Stack', Helvetica, Arial, sans-serif;
}
</style>
