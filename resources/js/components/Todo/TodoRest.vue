<template>
    <v-container grid-list-md text-xs-center>
        <v-toolbar flat color="white">
            <v-toolbar-title>Мой список дел</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <v-btn slot="activator" color="primary" dark class="mb-2">Создать дело</v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="todo.title" label="Заголовок"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="todo.description" label="Описание"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Отменить</v-btn>
                        <v-btn color="blue darken-1" flat @click="create">Добавить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>

        <v-layout row wrap>
            <v-flex xs3 v-for="(item, key) in todoList" :key="key">
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{ item.title }}</h3>
                            <div>{{ item.description }}</div>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn flat color="orange" @click="update(key)">Редактировать</v-btn>
                        <v-btn flat color="orange" @click="destroy(key)">Удолить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

        <v-snackbar
            v-model="snackbar.show"
            :bottom="snackbar.y === 'bottom'"
            :left="snackbar.x === 'left'"
            :multi-line="snackbar.mode === 'multi-line'"
            :right="snackbar.x === 'right'"
            :timeout="snackbar.timeout"
            :top="snackbar.y === 'top'"
            :color="snackbar.color"
        >
            {{ snackbar.text }}
            <v-btn
                dark
                flat
                @click="snackbar.show = false"
            >
                Закрыть
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import Event from '../../app/Events/Event';

    export default {
        name: "TodoRest",

        data: () => ({
            dialog: false,

            todo: {
                id: null,
                title: '',
                description: '',
            },

            edit: false,

            snackbar: {
                show: false,
                y: 'bottom',
                x: 'right',
                mode: '',
                timeout: 4000,
                text: 'Дело успешно создано',
                color: 'success',
            }
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Создать' : 'Редоктировать'
            },

            todoList() {
                return this.$store.getters.TODOS;
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },



        mounted() {
            this.$store.dispatch('GET_TODO');

            Event.$on('todo-form-modal-close', (data) => {
                this.dialog = false;
                this.edit = false;
                this.snackbar.show = data;
            })
        },

        methods: {
            create() {
                if (this.edit) {
                    this.$store.dispatch('UPDATE_TODO', this.todo);
                } else {
                    this.$store.dispatch('SAVE_TODO', this.todo);
                }
            },

            update(id) {
                this.dialog = true;
                this.edit = true;
                this.todo.id = id;
            },

            destroy (id) {
                this.$store.dispatch('DELETE_TODO', id);
            },

            close () {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },
        },

    }
</script>

<style scoped>

</style>
