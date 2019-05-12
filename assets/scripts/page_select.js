cc.Class({
    extends: cc.Component,

    properties: {
        store: {
            default: null,
            type: cc.Node,
        },
        buttonNext: {
            default: null,
            type: cc.Node
        },
        buttonRandom: {
            default: null,
            type: cc.Node
        },
        numberCurrent: {
            default: null,
            type: cc.Label
        },
        numberNext: {
            default: null,
            type: cc.Label
        }
    },

    disableButtons() {
        this.buttonNext.getComponent(cc.Button).interactable = false
        this.buttonRandom.getComponent(cc.Button).interactable = false
    },

    enableButtons() {
        this.buttonNext.getComponent(cc.Button).interactable = true
        this.buttonRandom.getComponent(cc.Button).interactable = true
    },

    clickNext () {
        this.disableButtons()
        this.store.getComponent('global_store').counterIncrement()
    },

    clickRandom () {
        this.disableButtons()
        this.store.getComponent('global_store').counterRandom()
    },

    animateNumber (newNumber) {
        this._animate = true
        this._timer = 0.0

        const animationTime = 0.5
        const actionNumberCurrent = cc.moveTo(animationTime, -cc.winSize.width, 0)
        const actionNumberNext = cc.moveTo(animationTime, 0, 0)

        this.numberNext.string = newNumber
        this.numberCurrent.node.runAction(actionNumberCurrent)
        this.numberNext.node.runAction(actionNumberNext)
    },

    setup () {
        this._animate = false
        this._timer = 0.0
        this.enableButtons()

        this.numberCurrent.node.x = 0
        this.numberNext.node.x = cc.winSize.width

        this.numberCurrent.string = this.store.getComponent('global_store').counter
    },

    checkTransition (page) {
        this.node.active = ( page == 'SELECTION' )
        if (this.node.active) { this.setup() }
    },


    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.store.on('pageTransition', this.checkTransition, this)
        this.store.on('numberChange', this.animateNumber, this)
    },

    // start () {},

    update (dt) {
        // return unless animating
        if ( !this._animate ) { return }

        // wait for two seconds
        if ( this._timer < 2.0 ) {
            this._timer += dt;
            return
        }

        this.store.getComponent('global_store').transitionComingUp()
    },
});
