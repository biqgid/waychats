<template>
    <li :class="{ 'text-left': !data.selfMessage, 'my-message text-right': data.selfMessage }">
        <div class="message-wrapper position-relative">
            <span class="arrow-left" v-if="!data.selfMessage"></span>
            <span class="arrow-right" v-else></span>
            <div class="content text-left">
                <div class="message-text">
                    {{ data.message }}
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "MessageComponent",
        props: ['data'],
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

    .arrow-left {
        display: inline-block;
        border: 5px solid white;
        position: absolute;
        top: 0;
        left: -7px;
        transform: rotate(180deg);
        border-top-color: transparent;
        border-left-color: white;
        border-bottom-color: white;
        border-right-color: transparent;
    }

    .arrow-right {
        display: inline-block;
        border: 5px solid #00a7b1;
        position: absolute;
        top: 0px;
        right: -7px;
        -webkit-transform: rotate(180deg);
        transform: rotate(90deg);
        border-top-color: transparent;
        border-left-color: #00a7b1;
        border-bottom-color: #00a7b1;
        border-right-color: transparent;
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
</style>
