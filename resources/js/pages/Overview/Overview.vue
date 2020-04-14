<template>
    <v-container fluid grid-list-md text-xs-center class="h-100 p-3">
        <v-layout row wrap class="h-100 m-0">
            <v-flex xs4>
                <voice-message></voice-message>
            </v-flex>
            <v-flex xs4>
                <record-audio></record-audio>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import VoiceMessage from '../../components/Messenger/V1/Message/Template/VoiceTemplate'
    import RecordAudio from '../../components/Record/Recorder'


    export default {
        name: 'Overview',

        components: {
            VoiceMessage,
            RecordAudio,
        }
    }
</script>

<style>
    #video {
        background-color: #000000;
    }
    #canvas {
        display: none;
    }
    li {
        display: inline;
        padding: 5px;
    }
</style>
