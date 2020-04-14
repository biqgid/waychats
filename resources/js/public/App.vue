<template>
    <!-- MainApp -->
    <v-app id="application">
        <!-- Header -->
        <w-aside></w-aside>
        <!-- Header -->

        <!-- Toolbar -->
        <w-header></w-header>
        <!-- Toolbar -->

        <!-- Content -->
        <v-content>
            <router-view></router-view>
            <!--<v-speed-dial
                v-model="fab"
                :top="top"
                :bottom="bottom"
                :right="right"
                :left="left"
                :direction="direction"
                :open-on-hover="hover"
                :transition="transition"
            >
                <template v-slot:activator>
                    <v-btn
                        v-model="fab"
                        color="blue darken-2"
                        dark
                        fab
                    >
                        <v-icon>account_circle</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                </template>
                <v-btn
                    fab
                    dark
                    small
                    color="green"
                >
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn
                    fab
                    dark
                    small
                    color="indigo"
                >
                    <v-icon>add</v-icon>
                </v-btn>
                <v-btn
                    fab
                    dark
                    small
                    color="red"
                >
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-speed-dial>-->
        </v-content>
        <!-- Content -->

        <!-- Footer -->
        <w-footer></w-footer>
        <!-- Footer -->
    </v-app>
    <!-- MainApp -->
</template>

<script>
    import Header from '../details/Header';
    import Aside from '../details/Aside';
    import Footer from '../details/Footer';

    import Event from '../app/Events/Event';

    export default {
        name: 'App',
        components: {
            'w-header': Header,
            'w-aside': Aside,
            'w-footer': Footer,
        },
        beforeCreate() {
            this.$store.dispatch('GET_STRUCTURE');
        },
    }
</script>

<style>
    a, button:focus {
        outline: none;
        border: none;
    }

    a:hover {
        text-decoration: none;
    }

    .p-relative {
        position: relative;
    }

    /*#application .v-speed-dial {
        position: absolute;
    }

    #application .v-btn--floating {
        position: relative;
    }*/
</style>
