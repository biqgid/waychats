<template>
    <v-card class="h-100" id="v-one-messenger">
        <header-component :index="index"></header-component>
        <content-component></content-component>
        <!--<footer-component></footer-component>-->
    </v-card>
</template>

<script>
    import HeaderComponent from './details/Header';
    import FooterComponent from './details/Footer';
    import ContentComponent from './details/Content';

    export default {
        name: "MessengerComponent",
        props: ['index'],

        components: {
            HeaderComponent,
            FooterComponent,
            ContentComponent,
        }
    }
</script>

<style scoped>

</style>
