<template>
    <q-page padding>
        <q-header class="bg-white text-white">
            <q-toolbar class="row justify-between items-center">
                <div class="col-2 q-my-md">
                    <q-btn dense round flat icon="home" size="lg" color="grey-8" to="/"></q-btn>
                </div>
            </q-toolbar>
        </q-header>

        <div class="setup-container row items-center">
            <div class="col-12 justify-center">
                <div class="setup-content">
                    <div class="row">
                        <div class="col-12">
                            <div class="setup-title-xs text-center xs">USER INFORMATION</div>
                            <div class="setup-title-gt-xs text-center gt-xs">USER INFORMATION</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 item-label">USER ID</div>
                    </div>
                    <div class="row full-width">
                        <div class="col-12">
                            <q-input
                                standout="bg-secondary text-white"
                                dense
                                type="number"
                                v-model="userId"
                                input-class="text-right"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="person" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 item-label">FULL NAME</div>
                    </div>
                    <div class="row full-width">
                        <div class="col-12">
                            <q-input
                                standout="bg-secondary text-white"
                                dense
                                type="text"
                                v-model="fullname"
                                input-class="text-right"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="person" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <q-footer class="bg-white text-white">
            <q-toolbar class="row justify-center full-width text-center">
                <div class="col-12 q-ma-sm q-mb-lg q-px-sm">
                    <q-btn
                        push
                        class="full-width"
                        color="secondary"
                        size="lg"
                        @click="saveConfig"
                    >Save</q-btn>
                </div>
            </q-toolbar>
        </q-footer>
    </q-page>
</template>

<script>
import { sync, call } from 'vuex-pathify';

export default {
    name: 'SetupPage',
    data() {
        return {
            userId: '',
            fullname: ''
        };
    },
    created() {},
    computed: {
        config: sync('config/active')
    },
    mounted() {
        this.userId = this.config.userId;
        this.fullname = this.config.fullname;
    },
    methods: {
        ...call('config/*'),
        saveConfig() {
            const active = {
                ...this.config,
                userId: this.userId,
                fullname: this.fullname
            };

            this.setActive(active);
            this.$router.push('/');
        }
    }
};
</script>
<style lang="scss" scoped>
.setup-container {
    .setup-content {
        padding: 0px 30px 30px;

        .setup-title-xs {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .setup-title-gt-xs {
            font-size: 38px;
            font-weight: bold;
            margin-bottom: 15px;
        }

        .item-label {
            color: grey;
            font-size: 14px;
            font-weight: bold;
            margin: 10px auto;
            padding-right: 10px;
            text-align: end;
        }
    }
}
</style>
