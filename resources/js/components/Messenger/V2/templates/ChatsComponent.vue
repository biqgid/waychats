<template>
    <v-card-text id="V1-Messenger-Content">
        <v-list tag="ul" two-line subheader color="none">

            <template v-for="(item, index) in chats">
                <v-list-tile
                    :key="item.id"
                    avatar
                    @click="section('private-chat', item)"
                >
                    <v-list-tile-avatar>
                        <avatar :src="item.user.avatar" :username="item.user.email" :size="30" style="font-size: 18px;"></avatar>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ user_name(item.user) }}</v-list-tile-title>
                        <!--<v-list-tile-sub-title>{{ room.user_two.name }}</v-list-tile-sub-title>-->
                    </v-list-tile-content>

                    <v-list-tile-action>

                    </v-list-tile-action>
                </v-list-tile>
                <v-divider class="m-0"></v-divider>
            </template>
        </v-list>

        <!--<v-list tag="ul" two-line subheader color="none">


                <v-list-tile
                    v-else
                    :key="index"
                    avatar
                    @click="section('private-chat', item)"
                >
                    <v-list-tile-avatar>
                        <avatar :src="item.user.avatar" :username="item.user.email" :size="30" style="font-size: 18px;"></avatar>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ user_name(item.user) }}</v-list-tile-title>
                       &lt;!&ndash; <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>&ndash;&gt;
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>-->
    </v-card-text>
</template>

<script>
    import Event from '../../../../app/Events/Event';
    import Avatar from 'vue-avatar';

    export default {
        name: "ChatsComponent",
        data () {
            return {

            }
        },
        mounted() {
            Event.$emit('hide-form-message', false);
            this.$store.commit('TOGGLE_CHAT_HEADER', true);
            this.$store.dispatch('GET_CHATS');
        },
        components: {
            Avatar,
        },
        computed: {
            chats() {
                return this.$store.getters.CHATS
            },
        },
        methods: {
            section(val, room) {
                this.$store.commit('SECTION', val);
                this.$store.commit('SET_ROOM', room);
                this.$store.commit('SET_PRIVATE_USER', room.user);
            },


            user_name(user) {
                if (user) {
                    if (user.name)
                        return user.name
                    else
                        return user.phone
                }
            }
        },
    }
</script>

<style scoped>
    #V1-Messenger-Content {
        position: absolute;
        left: 0;
        right: 0;
        top: 70px;
        bottom: 0px;
        padding: 0px 0 !important;
        background: white;
    }

    .v-list {
        height: 100%;
        margin: 0;
        overflow: auto;
    }

    .v-list::-webkit-scrollbar{
        width:6px;
    }

    .v-list::-webkit-scrollbar-thumb{
        border-width: 1px 1px 1px 2px;
        border-color: #777;
        background-color: #c6c6c6;
        border-radius: 10px;
    }

    .v-list::-webkit-scrollbar-track{
        border-width:0;
    }

</style>
