require('colors')
const Store = require('./index.js')
const REDUCERS = {
    SET_TRUE: (state, action, next) => {
        state.shouldBeTrue = true
        return state
    },
    SET_FALSE: (state, action, next) => {
        state.shouldBeFalse = false
        return state
    },
    NEXT: (state, action, next) => {
        setTimeout(() => {
            next([{
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                },
                {
                    type: 'INCREMENT'
                }
            ])
        }, 0)
        return state
    },
    INCREMENT: (state, action, next) => {
        state.number = state.number + 1
        return state
    }
}

const INITIAL_STATE = {
    shouldBeTrue: false,
    shouldBeFalse: true,
    number: 0
}

const OPTIONS = {
    enableLogging: true
}









const testStore = new Store(INITIAL_STATE, REDUCERS, OPTIONS)


var updateCount = 0,
    expectedUpdateCount = 4

testStore.subscribe((state) => {
    updateCount++
    if (updateCount === 4) {
        console.log()
        console.log('Test complete')
        console.log('--------------------------------')
        if (state.shouldBeTrue !== true) {
            throw new Error('state.shoudlBeTrue should be true but is false')
        } else {
            console.log('√'.green, 'state.shoudlBeTrue is', 'true'.green)
        }

        if (state.shouldBeFalse !== false) {
            throw new Error('state.shoudlBeFalse should be false but is true')
        } else {
            console.log('√'.green, 'state.shoudlBeFalse is', 'false'.green)
        }
        if (updateCount !== 4) {
            throw new Error(`The subscribed change handler was expected to fire 4 times but was updated ${updateCount}.`)
        } else {
            console.log('√'.green, 'Subscribed change handler was expected to be called', `${expectedUpdateCount}`.green, 'times', 'and was called', `${expectedUpdateCount}`.green, 'times')
        }

    }
})

testStore.dispatch({
    type: 'SET_TRUE'
})

testStore.dispatch({
    type: 'SET_FALSE'
})

testStore.dispatch({
    type: 'NEXT'
})