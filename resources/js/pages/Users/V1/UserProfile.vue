<template>
    <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12 lg4 md4 sm12>
                <v-card>
                    <template v-if="readyToUpload">
                        <v-img
                            :src="formData.uploadFileData"
                            height="300px"
                            class="img-fluid" alt="Адаптивные изображения"
                        >
                            <v-layout
                                column
                                fill-height
                            >
                                <v-card-title>
                                    <v-btn dark icon>
                                        <v-icon>chevron_left</v-icon>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn dark icon class="mr-3">
                                        <v-icon>edit</v-icon>
                                    </v-btn>

                                    <v-btn dark icon>
                                        <v-icon>more_vert</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-spacer></v-spacer>

                                <v-card-title class="white--text pl-5 pt-5">
                                    <div class="display-1 pl-5 pt-5">{{ user.user_key }}</div>
                                </v-card-title>
                            </v-layout>
                        </v-img >
                    </template>
                    <template v-else>
                        <v-img
                            height="300px"
                            class="img-fluid" alt="Адаптивные изображения"
                        >
                            <v-layout
                                column
                                fill-height
                            >
                                <v-card-title>
                                    <v-btn dark icon>
                                        <v-icon>chevron_left</v-icon>
                                    </v-btn>

                                    <v-spacer></v-spacer>

                                    <v-btn dark icon class="mr-3">
                                        <v-icon>edit</v-icon>
                                    </v-btn>

                                    <v-btn dark icon>
                                        <v-icon>more_vert</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-spacer></v-spacer>

                                <v-card-title class="white--text pl-5 pt-5">
                                    <div class="display-1 pl-5 pt-5">{{ user.user_key }}</div>
                                </v-card-title>
                            </v-layout>
                        </v-img>
                    </template>
                    <v-list two-line>
                        <v-list-tile @click="">
                            <v-list-tile-action>
                                <v-icon color="indigo">phone</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ user.phone }}</v-list-tile-title>
                                <v-list-tile-sub-title>Номер телефона</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider inset></v-divider>
                        <v-list-tile @click="">
                            <v-list-tile-action>
                                <v-icon color="indigo">mail</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ user.email }}</v-list-tile-title>
                                <v-list-tile-sub-title>Email Адрес</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-action></v-list-tile-action>
                            <v-list-tile-content>
                                <upload-btn
                                    :fileChangedCallback="fileChanged"
                                    loading
                                    title="Добавить фото"
                                    color="blue-grey"
                                    class="white--text p-0"
                                >
                                    <template slot="icon">
                                        <v-icon right dark>cloud_upload</v-icon>
                                    </template>
                                </upload-btn>
                            </v-list-tile-content>
                        </v-list-tile>
                        <!--<v-list-tile v-if="readyToUpload">
                            <v-list-tile-action></v-list-tile-action>
                            <v-list-tile-content>
                                <img :src="formData.uploadFileData" class="preview-image" width="130px" />
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider inset></v-divider>-->
                    </v-list>
                </v-card>
            </v-flex>
            <v-flex xs12 lg4 md4 sm12>
                <v-card>
                    <v-toolbar color="teal" dark>
                        <v-toolbar-side-icon></v-toolbar-side-icon>

                        <v-toolbar-title class="text-xs-center">New Chat</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-list subheader>
                        <v-subheader>Recent chat</v-subheader>
                        <v-list-tile
                            v-for="item in items"
                            :key="item.title"
                            avatar
                            @click=""
                        >
                            <v-list-tile-avatar>
                                <img :src="item.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list subheader>
                        <v-subheader>Previous chats</v-subheader>

                        <v-list-tile
                            v-for="item in items2"
                            :key="item.title"
                            avatar
                            @click=""
                        >
                            <v-list-tile-avatar>
                                <img :src="item.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import UploadButton from 'vuetify-upload-button';
    import Avatar from 'vue-avatar'

    export default {
        name: "UserProfile",

        components: {
            'upload-btn': UploadButton,
            Avatar,
        },

        data () {
            return {
                formData: {
                    displayFileName: null,
                    uploadFileData: null,
                    file: null
                },
                items: [
                    { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
                    { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
                    { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
                    { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
                ],
                items2: [
                    { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
                ]
            }
        },

        computed: {
            user(){
                return this.$store.getters.currentUser
            },

            readyToUpload() {
                return (
                    this.formData.displayFileName && this.formData.uploadFileData
                );
            }
        },


        methods: {
            fileChanged (file) {
                this.formData.file = file;
                this.formData.displayFileName = file.name + " (" + this.calcSize(file.size) + "Kb)";

                let reader = new FileReader();
                    reader.onload = e => {
                        this.formData.uploadFileData = e.target.result;
                        this.user.avatar = e.target.result;
                    };
                reader.readAsDataURL(file);
            },

            calcSize(size) {
                return Math.round(size / 1024);
            },
        },
    }
</script>

<style scoped>
    .v-image {
        background: rgb(134, 142, 150);
    }
</style>
