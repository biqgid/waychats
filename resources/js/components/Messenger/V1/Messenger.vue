<template>
    <v-card class="h-100" id="V1-Messenger">
        <v-card-title class="p-0">
            <v-toolbar color="white" dense height="40" class="px-0">
                <v-toolbar-title class="subheading">Чат</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon small @click="searchForm = true">
                    <v-icon size="22px">
                        search
                    </v-icon>
                </v-btn>
                <v-menu bottom left offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            icon
                            v-on="on"
                            small class="m-0"
                        >
                            <v-icon size="20">more_vert</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile @click="">
                            <v-list-tile-title>Новая группа</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile @click="">
                            <v-list-tile-title>Новая рассылка</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile @click="">
                            <v-list-tile-title>Избранные сообщения</v-list-tile-title>
                        </v-list-tile>

                        <v-list-tile @click="">
                            <v-list-tile-title>Настройки</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>

                <v-text-field
                    label="Solo"
                    placeholder="Поиск..."
                    class="v-one-messenger-search"
                    solo
                    prepend-inner-icon="keyboard_backspace"
                    clearable
                    @click:prepend-inner="searchForm = false"
                    v-if="searchForm"
                ></v-text-field>
            </v-toolbar>
        </v-card-title>

        <v-card-text class="p-0" id="V1-Messenger-Content">
            <div class="h-100">

                <!--<keep-alive>
                    <component
                        v-bind:is="currentTabComponent"
                        class="tab"
                    ></component>
                </keep-alive>-->

                <v-tabs
                    v-model="active"
                    color="#128d95"
                    dark
                    slider-color="#025674"
                    height="30px"
                    class="h-100"
                >


                    <v-tab-item>
                        <public-chats></public-chats>
                    </v-tab-item>

                    <v-tab-item>
                        <v-list two-line subheader>
                            <v-list-tile
                                v-for="item in items"
                                :key="item.title"
                                avatar
                                @click=""
                            >
                                <v-list-tile-avatar>
                                    <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-btn icon ripple>
                                        <v-icon color="grey lighten-1">info</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile
                                v-for="item in items2"
                                :key="item.title"
                                avatar
                                @click=""
                            >
                                <v-list-tile-avatar>
                                    <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-btn icon ripple>
                                        <v-icon color="grey lighten-1">info</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-tab-item>

                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>{{ text }}</v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>{{ text }}</v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-card-text>


    </v-card>
</template>

<script>

    import PublicChats from './Chats/PublicChats';
    import MessageForm from './Form/MessageForm';

    export default {
        name: "Messenger",

        data () {
            return {

                searchForm: false,

                active: null,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

                items: [
                    {icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014'},
                    {
                        icon: 'folder',
                        iconClass: 'grey lighten-1 white--text',
                        title: 'Recipes',
                        subtitle: 'Jan 17, 2014'
                    },
                    {icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014'}
                ],
                items2: [
                    {
                        icon: 'assignment',
                        iconClass: 'blue white--text',
                        title: 'Vacation itinerary',
                        subtitle: 'Jan 20, 2014'
                    },
                    {
                        icon: 'call_to_action',
                        iconClass: 'amber white--text',
                        title: 'Kitchen remodel',
                        subtitle: 'Jan 10, 2014'
                    }
                ]
            }
        },

        components: {
            PublicChats,
            MessageForm,
        },
    }
</script>

<style scoped>
    .v-tabs__container {
        justify-content: space-between;
    }
    .theme--dark.v-tabs__bar .v-tabs__div {
        color: #fff;
        text-transform: inherit;
    }
    .v-window {
        padding: 0 10px;
    }
    .footer-form {
        bottom: 0;
    }

    #V1-Messenger-Content {
        position: absolute;
        left: 0;
        right: 0;
        top: 40px;
        bottom: 70px;
    }

    .v-window {
        height: 100%;
    }

    .v-one-messenger-search {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
