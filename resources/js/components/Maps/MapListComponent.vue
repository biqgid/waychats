<template>
    <ul class="pt-0 px-2">
        <map-list-item v-for="(value, index) in items"
                       :key="index"
                       :data="value"></map-list-item>
    </ul>
</template>

<script>
    import MapListItem from './MapListItem';

    export default {
        name: "MapList",
        props: ['items'],
        components: {MapListItem},
    }
</script>

<style scoped>

</style>
