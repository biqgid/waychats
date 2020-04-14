<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 sm3 offset-sm4>
                <v-card align-content-center max-width="500">
                    <v-card-title primary-title class="pb-0">
                        <div>
                            <h3 class="headline mb-0">Авторизация</h3>
                        </div>
                    </v-card-title>

                    <v-card-text class="headline py-0">

                        <v-layout v-if="authError">
                            <v-alert
                                :value="true"
                                class="error-register py-1 mt-3"
                                color="error"
                                icon="warning"
                                outline
                            >
                                {{authError}}
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
                                            :append-icon="show_pass ? 'visibility' : 'visibility_off'"
                                            v-model.trim="user.password"
                                            :counter="100"
                                            label="Пароль"
                                            :rules="passwordRules"
                                            :type="show_pass ? 'text' : 'password'"
                                            @click:append="show_pass = !show_pass"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn flat color="orange" @click="authenticate" :disabled="!valid">Войти</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {login} from '../../helpers/auth';

    export default {
        name: "Login",

        data(){
            return {
                valid: false,
                show_pass: false,

                user: {
                    phone: '',
                    password: ''
                },

                error: null,

                phoneRules: [
                    v => !!v || 'Телефон не может быть пустым',
                ],

                passwordRules: [
                    v => !!v || 'Пароль не может быть пустым',
                ],
            }
        },
        methods:{
            authenticate(){
                this.$store.dispatch('login');

                login(this.user)
                    .then(res => {
                        this.$store.commit("loginSuccess", res);
                        this.$router.push({path: '/'});
                    })
                    .catch(error => {
                        this.$store.commit("loginFailed", {error});
                    })
            }
        },
        computed:{
            authError(){
                return this.$store.getters.authError
            },
            registeredUser(){
                return this.$store.getters.registeredUser
            }
        }
    }
</script>

<style scoped>

</style>
