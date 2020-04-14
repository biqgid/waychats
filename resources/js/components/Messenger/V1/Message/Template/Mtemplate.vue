<template>
    <li class="item-message ignore-elements" :class="{'my-message': data.selfMessage}">
        <div class="message-wrapper">
            <div class="header" :class="{'justify-content-end': data.selfMessage}">
                <div class="userInfo" v-if="!data.selfMessage">
                    <span class="user-image"><v-icon large>account_circle</v-icon></span>
                    <span class="user-name">{{ user_name }}</span>
                </div>
                <div class="messageSendDate ml-3">
                    {{ data.created_at }}
                </div>
            </div>
            <div class="content">
                <div class="message-text">
                    {{ data.content }}
                </div>
                <span class="toBookmarks">
                    <i class="fa fa-bookmark-o"></i>
                </span>
            </div>
            <div class="footer" v-if="!data.selfMessage">
                <div class="messages-views ml-2">
                    <v-icon size="11px" color="white">visibility</v-icon>-{{data.views}}
                </div>
                <div class="messages-bookmarks ml-2">
                    <v-icon size="11px" color="white">turned_in_not</v-icon>-{{data.bookmarks}}
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "Mtemplate",
        props: ['data'],

        computed: {

            user_name() {
                if (this.data.user) {
                    if (this.data.user.name)
                        return this.data.user.name
                    else
                        return this.data.user.phone
                }
            }

        }
    }
</script>

<style scoped>
    li {
        padding: 0 25px;
        margin: 10px 0 15px 0px;
        list-style-type: none;
        text-align: left;
    }
    .user-message {
        text-align: left;
    }
    .my-message {
        text-align: right;
    }
    li.my-message .content {
        background: rgb(1, 167, 177);
        color: white
    }
    .my-message > .message-wrapper > .content .message-text {
        text-align: left;
        color: #fff;
    }
    .my-message > .message-wrapper > .content .toBookmarks {
        color: #fff;
    }
    .message-wrapper {
        display: inline-block;
        min-width: 40%;
    }

    /* < header > */
    .message-wrapper > .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
    .message-wrapper > .header .userInfo {
        position: relative;
    }
    .message-wrapper > .header .user-image {
        display: inline-block;
        position: absolute;
        z-index: 1;
        left: -21px;
        top: -4px;
    }
    .message-wrapper > .header .user-name {
        display: inline-block;
        margin-left: 25px;
        color: white;
    }
    .message-wrapper > .header .user-image i {
        border: 0px solid white;
        border-radius: 50%;
        background: white;
        color: black;
    }
    .message-wrapper > .header .messageSendDate {
        color: #fff;
        font-size: 11px;
    }

    /* < content > */
    .message-wrapper > .content {
        background: white;
        border-radius: 3px;
        display: inline-block;
        padding-right: 30px;
        position: relative;
        width: 100%;
    }
    .message-wrapper > .content .message-text{
        color: #041720;
        padding: 5px 10px;
    }
    .message-wrapper > .content .message-text {
        color: #041720;
        padding: 5px 10px;
    }
    .message-wrapper > .content .toBookmarks {
        position: absolute;
        color: #0b3f56;
        font-size: 19px;
        right: 8px;
        top: 3px;
        cursor: pointer;
    }
    .message-wrapper > .content .toBookmarks:hover i {
        color: #ffc138;
    }

    /* < footer > */
    .message-wrapper > .footer {
        font-size: 10px;
        text-align: right;
        color: white;
    }
    .message-wrapper > .footer > div {
        display: inline-block;
    }
</style>
