<template>
    <v-layout row wrap class="mx-3 my-4">
        <v-flex xs12 sm12 md12 lg12 xl12 class="p-0">
            <v-autocomplete
                v-model="contact.contact_id"
                :items="items"
                :search-input.sync="search"
                :loading="isLoading"
                hide-details
                hide-no-data
                class="p-0 bg-white"
                placeholder="Введите номер телефона"
                item-text="phone"
                item-value="id"
                cache-items
            >
                <template v-slot:item="{ item }">
                    <span v-html="highlight(item.phone, search)"></span>
                </template>
            </v-autocomplete>

            <v-text-field
                v-model="contact.name"
                label="Имя"
            ></v-text-field>

            <v-text-field
                v-model="contact.surname"
                label="Фамилия"
            ></v-text-field>

            <v-btn
                color="success"
                @click="addContact"
            >
                Добавить
            </v-btn>

            <v-btn
                color="error"
                @click="section('chats')"
            >
                Отменить
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "AddContactComponent",
        data() {
            return {
                contact: {
                    name: null,
                    surname: null,
                    contact_id: null,
                },

                isLoading: false,
                items: [],
                search: null
            }
        },

        watch: {
            /**
             * get search data
             */
            search(val) {
                axios.post('api/contacts/search', {query: val}).then(res => {
                    this.items = res.data
                })
            },
        },

        methods: {

            addContact() {
                this.$store.dispatch('ADD_CONTACT', this.contact)
            },

            /**
             * Return dinamic component.
             */
            section(val) {
                this.$store.commit('SECTION', val)
            },

            /**
             * Wrap the given keyword matches.
             */
            highlight(text, keywords) {
                return text.replace(new RegExp(keywords, 'gi'), '<span class="highlighted">$&</span>');
            }
        },
    }
</script>

<style scoped>
</style>
