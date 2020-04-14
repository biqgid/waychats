<template>
    <v-footer class="px-5" color="#041821" dark height="40">
        <template v-for="(item, index) in userComponents">
            <v-btn flat class="m-0 h-100" v-if="!item.is_visible" @click="openComponent(index, true)">
                <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
        </template>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
        computed: {
            userComponents() {
                if (this.$store.getters.GET_USER_STRUCTURE)
                    return this.$store.getters.GET_USER_STRUCTURE;
                else
                    return this.$store.getters.GET_DEFUALT_STRUCTURE;
            }
        },

        methods: {
            openComponent(index, value) {
                let options = {
                    index: index,
                    value: value,
                };
                this.$store.commit('TOGGLE_VISIBLE', options)
            }
        }
    }
</script>

<style scoped>

</style>
