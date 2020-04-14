export default class Recorder {

    constructor(video, audio) {
        this.constraints = {
            video: video,
            audio: audio,
        }
    }

    start() {

    }

    end() {

    }

    static hasGetUserMedia() {
        return !!(navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia);
    }

    videoCall(video) {
        if (Recorder.hasGetUserMedia) {
            navigator.mediaDevices.getUserMedia(this.constraints).
            then((stream) => {
                video.srcObject = stream
            });
        }else{
            console.log('error')
        }
    }
}
