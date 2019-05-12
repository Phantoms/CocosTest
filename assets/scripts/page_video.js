cc.Class({
    extends: cc.Component,

    properties: {
        store: {
            default: null,
            type: cc.Node,
        },
        videoPlayer: {
            default: null,
            type: cc.VideoPlayer
        },
        buttonSkipBack: {
            default: null,
            type: cc.Node
        },
        buttonReplay: {
            default: null,
            type: cc.Node
        },
    },

    clickToggleMute() {
        this.videoPlayer.mute = !this.videoPlayer.mute
    },

    // should not be coupled like this
    clickSkipBack() {
        if( this.videoPlayer.currentTime < this.videoPlayer.getDuration() ) {
            this.videoPlayer.currentTime = this.videoPlayer.getDuration()
        } else {
            this.videoPlayer.stop()
            this.videoPlayer.remoteURL = ''
            this.store.getComponent('global_store').transitionSelection()
        }
    },

    clickReplay() {
        this.setButtonLabelSkip()
        this.videoPlayer.currentTime = 0
        this.videoPlayer.play()
    },

    videoCallBack(sender, event) {
        switch (event) {
            case cc.VideoPlayer.EventType.COMPLETED:
                this.setButtonLabelBack()
                break
            case cc.VideoPlayer.EventType.READY_TO_PLAY:
                this.videoPlayer.play()
                break
        }
    },

    setButtonLabelSkip() {
        cc.find('Background/Label', this.buttonSkipBack)
          .getComponent(cc.Label).string = 'Skip'
    },

    setButtonLabelBack() {
        cc.find('Background/Label', this.buttonSkipBack)
          .getComponent(cc.Label).string = 'Back'
    },

    setup() {
        const videoFileName = this.store.getComponent('global_store').getCurrentVideo()
        const videoFilePath = `https://rdstage01.akamaized.net/Techinc/Assessment/${videoFileName}`

        this.videoPlayer.remoteURL = ''
        this.videoPlayer.remoteURL = videoFilePath

        this.setButtonLabelSkip()
    },

    checkTransition (page) {
        this.node.active = ( page == 'VIDEO' )
        if (this.node.active) { this.setup() }
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.store.on('pageTransition', this.checkTransition, this)
    },

    // start () {},

    // update (dt) {},
});
