<template>
    <app-template v-if="typeof data.content === 'object'" :data="data"></app-template>
    <m-template v-else :data="data"></m-template>
</template>

<script>

    import MTemplate from './Template/Mtemplate';
    import AppTemplate from './Template/AppTemplate';

    export default {
        name: "Message",
        props: ['data'],

        data() {
            return {
                messageComponent: 'm-component',
                advertComponent: 'app-component',
            }
        },

        components: {
            MTemplate,
            AppTemplate,
        }
    }
</script>

<style scoped>

</style>
