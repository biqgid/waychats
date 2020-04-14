<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 sm3 offset-sm4>
                <v-card align-content-center max-width="500">
                    <v-card-title primary-title class="pb-0">
                        <div>
                            <h3 class="headline mb-0">Регистрация</h3>
                        </div>
                    </v-card-title>

                    <v-card-text class="headline py-0">

                        <v-layout v-if="regError">
                            <v-alert
                                :value="true"
                                class="error-register py-1 mt-3"
                                color="error"
                                icon="warning"
                                outline
                            >
                                {{regError}}
                            </v-alert>
                        </v-layout>

                        <v-form v-model="valid">
                            <v-container>
                                <v-layout>
                                    <v-flex
                                        xs12
                                        md12
                                    >
                                        <v-text-field
                                            v-model.number.trim="user.phone"
                                            :counter="24"
                                            :rules="phoneRules"
                                            label="Телефон"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex
                                        xs12
                                        md12
                                    >
                                        <v-text-field
                                            v-model.trim="user.email"
                                            :counter="100"
                                            :rules="emailRules"
                                            label="Email"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout>
                                    <v-flex
                                        xs12
                                        md12
                                    >
                                        <v-text-field
                                            :append-icon="show_confirm_pass ? 'visibility' : 'visibility_off'"
                                            v-model.trim="user.password"
                                            :counter="100"
                                            label="Пароль"
                                            :rules="passwordRules"
                                            :type="show_confirm_pass ? 'text' : 'password'"
                                            @click:append="show_confirm_pass = !show_confirm_pass"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout>
                                    <v-flex
                                        xs12
                                        md12
                                    >
                                        <v-text-field
                                            :append-icon="show_pass ? 'visibility' : 'visibility_off'"
                                            v-model.trim="user.password_confirmation"
                                            :counter="100"
                                            :rules="confirmPasswordRules"
                                            :error-messages='confirmPasswordCheck()'
                                            :type="show_pass ? 'text' : 'password'"
                                            @click:append="show_pass = !show_pass"
                                            label="Введите пароль еще раз"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn flat color="orange">Отмена</v-btn>
                        <v-btn flat color="orange" @click="register" :disabled="!valid">Регистрация</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {registerUser} from '../../helpers/auth';

    export default {
        name: "Register",
        data: () => ({
            valid: false,
            show_pass: false,
            show_confirm_pass: false,
            user: {
                email: '',
                phone: null,
                password: null,
                password_confirmation: null,
            },

            emailRules: [
                v => !!v || 'E-mail не может быть пустым',
                v => /.+@.+/.test(v) || 'E-mail не валидный'
            ],

            phoneRules: [
                v => !!v || 'Телефон не может быть пустым',
            ],

            passwordRules: [
                v => !!v || 'Пароль не может быть пустым',
            ],

            confirmPasswordRules: [
                v => !!v || 'Пожалуйста введите пароль еще раз',
            ],

            error: null,
        }),

        methods: {
            register(){
                registerUser(this.user)
                    .then(res => {
                        console.log(res.errors);
                        this.$store.commit("registerSuccess", res);
                        this.$router.push({path: '/login'});
                    })
                    .catch(errors => {
                        this.$store.commit("registerFailed", {errors});
                    })
            },

            confirmPasswordCheck () {
                if (this.user.password_confirmation)
                    return (this.user.password === this.user.password_confirmation) ? '' : 'Пароли не совпадают'
            }
        },

        computed:{
            regError(){
                let response = [];
                let data = this.$store.getters.regError;

                if (data) {
                    for (let key in data.errors) {
                        response.push(data.errors[key])
                    }
                }

                return response.join(', ');
            }
        }
    }
</script>

<style scoped>
    .error-register > div {
        line-height: 20px;
    }
</style>
