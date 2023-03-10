<template>
    <q-page class="flex flex-center"> </q-page>
</template>

<script>
export default {
    name: 'PageIndex',
    created() {
        // route to game for now
        console.log('route to game for now...');
        this.$router.push('game');
    }
};
</script>
