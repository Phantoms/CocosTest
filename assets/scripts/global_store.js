cc.Class({
    extends: cc.Component,

    properties: {
        counter: 1,
        page: 'SELECTION',
    },

    getCurrentVideo () {
        // for multiples of both 3 and 5 play Video3
        if(this.counter % 3 == 0 && this.counter % 5 == 0) {
            return 'big-buck-03.mp4'
        }

        // for multiples of 3 play Video1
        if(this.counter % 3 == 0) {
            return 'big-buck-01.mp4'
        }

        // for multiples of 5 play Video2
        if(this.counter % 5 == 0) {
            return 'big-buck-02.mp4'
        }

        // for all other numbers play Video4.
        return 'big-buck-04.mp4'
    },

    counterRandom () {
        // Numbers from 1 to 30 should appear twice as often as numbers from 31 to 40.
        // Numbers from 31 to 40 should appear twice as often as numbers from 41 to 50.
        const choiceRanges = {
            'A': [1, 30],
            'B': [31, 40],
            'C': [41, 50],
        }

        // 👌
        const choiceGroups = [
            'A', 'A', 'A', 'A',
            'B', 'B',
            'C'
        ]

        // randomly sample from choice groups
        const choiceGroup = choiceGroups[Math.floor(Math.random() * choiceGroups.length)]
        const choiceRange = choiceRanges[choiceGroup]
        const [min, max] = choiceRange

        const v = Math.floor(Math.random() * (max - min + 1)) + min;

        this.counter = v
        this.node.emit('numberChange', this.counter)
    },

    counterIncrement () {
        this.counter += 1;
        this.node.emit('numberChange', this.counter)
    },

    transitionSelection () {
        this.page = 'SELECTION'
        this.node.emit('pageTransition', this.page)
    },

    transitionComingUp () {
        this.page = 'COMING_UP'
        this.node.emit('pageTransition', this.page)
    },

    transitionVideo () {
        this.page = 'VIDEO'
        this.node.emit('pageTransition', this.page)
    },


    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    start () {
        this.node.emit('pageTransition', this.page)
    },

    // update (dt) {},
});
