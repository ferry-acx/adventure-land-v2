import { make } from 'vuex-pathify';

const GAME_FILE = require('../constants/questions.json');
const GAME_CONTENT = JSON.parse(JSON.stringify(GAME_FILE));
const INITIAL_STAGE = 0;
const INITIAL_QUESTION = 0;
const state = {
    list: GAME_CONTENT,
    active: {
        stage: GAME_CONTENT[INITIAL_STAGE],
        question: GAME_CONTENT[INITIAL_STAGE].questions[INITIAL_QUESTION],
        progress: 0,
        singleAnswer: null,
        multiAnswers: []
    }
};

export default {
    namespaced: true,
    state,
    getters: make.getters(state),
    mutations: make.mutations(state),
    actions: {
        ...make.actions(state),
        resetGame({ commit, state }) {
            const NEW_COPY = JSON.parse(JSON.stringify(GAME_FILE));

            commit('SET_LIST', NEW_COPY);

            const newActive = {
                stage: state.list[INITIAL_STAGE],
                question: state.list[INITIAL_STAGE].questions[INITIAL_QUESTION]
            };

            commit('SET_ACTIVE', newActive);
        },
        nextQuestion({ commit, state, dispatch, rootState }) {
            try {
                console.log(state.active.question);
                let skip = 0;
                if (state.active.question && state.active.question.answer) {
                    let answer;
                    // if multi answer, just get the first skip
                    if (Array.isArray(state.active.question.answer)) {
                        answer = state.active.question.answer[0];
                        skip = answer.skip ? answer.skip : 0;
                    } else if (state.active.question.inputType) {
                        skip = state.active.question.skip ? state.active.question.skip : 0;
                    } else {
                        answer = state.active.question.answer;
                        skip = answer.skip ? answer.skip : 0;
                    }

                    console.log('skip:', skip);
                }
                const currentIndex = state.active.stage.questions.indexOf(state.active.question);
                const nextIndex = currentIndex + 1 + skip;
                if (nextIndex < state.active.stage.questions.length) {
                    let nextQuestion = state.active.stage.questions[nextIndex];
                    let text = nextQuestion.text;
                    if (text && text.includes('{name}')) {
                        const name = rootState.config.active.name ? rootState.config.active.name : '';
                        if (name && name.length > 0) {
                            text = text.replace('{name}', name);
                        }
                    }

                    nextQuestion.text = text;

                    const active = {
                        stage: state.active.stage,
                        question: nextQuestion,
                        progress: nextIndex / state.active.stage.questions.length,
                        singleAnswer: null,
                        multiAnswers: []
                    };

                    commit('SET_ACTIVE', active);
                } else {
                    dispatch('nextStage');
                }
            } catch (e) {
                console.error(e);
                dispatch('resetGame');
            }
        },
        nextStage({ commit, state, dispatch }) {
            try {
                const nextIndex = state.list.indexOf(state.active.stage) + 1;
                if (nextIndex < state.list.length) {
                    const active = {
                        stage: state.list[nextIndex],
                        question: state.list[nextIndex].questions[0],
                        progress: 0
                    };

                    commit('SET_ACTIVE', active);
                } else {
                    // dispatch('resetGame');
                    this.$router.push('/export');
                }
            } catch (e) {
                console.error(e);
                dispatch('resetGame');
            }
        },
        setAnswer({ commit, state, dispatch }, answer) {
            try {
                const active = state.active;
                active.question.answer = answer;
                commit('SET_ACTIVE', active);

                const payload = {
                    questionId: active.question.id,
                    question: active.question.text,
                    answer: answer
                };
                dispatch('answers/setCurrentQandA', payload, { root: true });
            } catch (e) {
                console.error(e);
            }
        },
        storeAnswer({ commit, dispatch, state }) {
            try {
                const { stage, question } = state.active;
                const stageIndex = state.list.indexOf(stage);
                const questionIndex = state.list[stageIndex].questions.indexOf(question);
                const newList = state.list;

                newList[stageIndex].questions[questionIndex] = question;

                commit('SET_LIST', newList);
                dispatch('answers/storeQandA', null, { root: true });
            } catch (e) {
                console.error(e);
            }
        }
    }
};
