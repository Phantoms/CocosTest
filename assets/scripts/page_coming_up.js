cc.Class({
    extends: cc.Component,

    properties: {
        store: {
            default: null,
            type: cc.Node,
        },
        numberCurrent: {
            default: null,
            type: cc.Label
        },
        videoPlayer: {
            default: null,
            type: cc.VideoPlayer
        },
        videoTitle: {
            default: null,
            type: cc.Label
        }
    },

    setup () {
        this._timer = 0.0

        const number = this.store.getComponent('global_store').counter
        const videoFileName = this.store.getComponent('global_store').getCurrentVideo()
        const videoFilePath = `https://rdstage01.akamaized.net/Techinc/Assessment/${videoFileName}`

        this.numberCurrent.string = `Number: ${number}`
        this.videoTitle.string = videoFileName

        // setting the URL will trigger the loading process
        // we dont want to show the video at this point, so disable it
        this.videoPlayer.enabled = false
        this.videoPlayer.remoteURL = ''
        this.videoPlayer.remoteURL = videoFilePath
    },

    checkTransition (page) {
        this.node.active = ( page == 'COMING_UP' )
        if (this.node.active) { this.setup() }
    },

    videoCallBack(sender, event) {
        this._video_state = event
    },


    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.store.on('pageTransition', this.checkTransition, this)
    },

    // start () {},

    update (dt) {
        // wait for two seconds
        if (this._timer < 2.0) {
            this._timer += dt
            return
        }

        // wait until our video is ready to play, then transition
        if (this._video_state == cc.VideoPlayer.EventType.READY_TO_PLAY) {
            this.store.getComponent('global_store').transitionVideo()
        }
    },
});
