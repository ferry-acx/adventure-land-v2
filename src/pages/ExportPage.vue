<template>
    <q-page padding class="flex flex-center">
        <q-header class="bg-white text-white">
            <q-toolbar class="row justify-between items-center">
                <div class="col-2 q-my-md">
                    <q-btn dense round flat icon="home" size="lg" color="grey-8" to="/"></q-btn>
                </div>
            </q-toolbar>
        </q-header>
        <div class="row text-center items-center">
            <div class="col-12">
                <div class="row">
                    <div class="col">
                        <q-btn flat color="secondary" v-on:click="saveData">
                            <q-icon size="xl" name="save_alt" />
                        </q-btn>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span class="text-secondary text-subtitle2">Save Data</span>
                    </div>
                </div>
            </div>
        </div>
        <q-dialog v-model="alert">
            <q-card style="min-width: 250px">
                <q-card-section>
                    <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section class="q-pt-none">{{ alertMessage }}</q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-inner-loading :showing="visible">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
    </q-page>
</template>

<script>
import { sync, call } from 'vuex-pathify';

// FilesystemDirectory
import { Plugins, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;

import moment from 'moment';

export default {
    name: 'ExportPage',
    data() {
        return {
            alert: false,
            alertMessage: '',
            visible: false
        };
    },
    computed: {
        config: sync('config/active'),
        answersList: sync('answers/list')
    },
    methods: {
        resetGame: call('game/resetGame'),
        resetConfig: call('config/resetConfig'),
        resetAnswerList: call('answers/resetAnswerList'),
        goHome() {
            this.resetGame();
            this.resetConfig();
            this.resetAnswerList();
            this.$router.push('/');
        },
        async initDirectories() {
            const statRet = await this.stat();
            if (!statRet) {
                const mkdirRet = await this.mkdir();
                return mkdirRet;
            }
            return statRet;
        },
        async createTemp() {
            try {
                const result = await Filesystem.writeFile({
                    path: `file:///storage/emulated/0/Download/ada.txt`,
                    data: 'Amazing Land of Adventures records located in: "Downloads/ada/"',
                    encoding: FilesystemEncoding.UTF8
                });
                console.log('createTemp:', result);

                const delResult = await Filesystem.deleteFile({
                    path: `file:///storage/emulated/0/Download/ada.txt`
                });

                console.log('delResult:', delResult);

                return true;
            } catch (e) {
                return false;
            }
        },
        async stat() {
            try {
                let ret = await Filesystem.stat({
                    path: 'file:///storage/emulated/0/Download/ada/'
                });
                console.log('stat:', ret);
                return true;
            } catch (e) {
                console.error('Unable to stat file', e);
                return false;
            }
        },
        async mkdir() {
            try {
                let ret = await Filesystem.mkdir({
                    path: 'file:///storage/emulated/0/Download/ada',
                    recursive: false // like mkdir -p
                });
                console.log('mkdir:', ret);
                return true;
            } catch (e) {
                console.error('Unable to make directory', e);
                return false;
            }
        },
        async saveData() {
            this.showLoading();
            try {
                await this.createTemp();
                const initRet = await this.initDirectories();

                if (initRet) {
                    const data = {
                        id: this.config.userId,
                        name: this.config.fullname,
                        dateGenerated: moment().format('L'),
                        qanda: this.answersList
                    };

                    const nospecial = this.config.fullname.replace(/[^a-zA-Z ]/g, '');
                    const name = nospecial.split(' ').join('_');
                    const filename = `${this.config.userId}_${name}.json`;
                    const result = await Filesystem.writeFile({
                        path: `file:///storage/emulated/0/Download/ada/${filename}`,
                        data: JSON.stringify(data),
                        encoding: FilesystemEncoding.UTF8
                    });
                    console.log('Wrote file', result);

                    this.$q.notify({
                        type: 'positive',
                        message: 'Successfully saved data!',
                        timeout: 2000
                    });
                } else {
                    throw new Error('Initializing directories failed.');
                }
            } catch (e) {
                console.error('Unable to write file', e);
                this.$q.notify({
                    type: 'negative',
                    message: 'Failed to save data.',
                    timeout: 2000
                });
            }

            await this.hideLoading();
        },
        showLoading() {
            this.visible = true;
        },
        hideLoading() {
            setTimeout(() => {
                this.visible = false;
            }, 1000);
        }
    }
};
</script>
