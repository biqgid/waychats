<template>
    <template>
        <v-tab ripple next-icon>
            <span class="mr-1">Все сообщения</span>
            <!--<v-badge color="cyan" left class="ml-4">
                <template slot="badge">
                    <span>6</span>
                </template>
            </v-badge>-->
        </v-tab>

        <v-tab ripple>
            <span class="mr-1">Чаты</span>
            <!--<v-badge color="cyan" left class="ml-4">
                <template slot="badge">
                    <span>6</span>
                </template>
            </v-badge>-->
        </v-tab>

        <v-tab ripple>
            <span class="mr-1">Машины</span>
            <v-badge color="cyan" left class="ml-4">
                <template slot="badge">
                    <span>6</span>
                </template>
            </v-badge>
        </v-tab>

        <v-tab ripple>
            <span class="mr-1">Грузы</span>
            <!--<v-badge color="cyan" left class="ml-4">
                <template slot="badge">
                    <span>6</span>
                </template>
            </v-badge>-->
        </v-tab>
    </template>
</template>

<script>
    export default {
        name: "SectionsComponent"
    }
</script>

<style scoped>

</style>
