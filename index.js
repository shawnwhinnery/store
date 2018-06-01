const _ = require('lodash')

class Store {

    constructor(initialState, reducers, options) {
        this.state = _.clone(initialState)
        this.reducers = reducers
        this.subscribers = new Set([])
        this.dispatch = (action, silent) => {

            if (Array.isArray(action)) {
                action.forEach((action) => {
                    this.dispatch(action, true)
                })
                this.subscribers.forEach(fn => fn(this.state))
            }

            var reducer = _.get(this.reducers, action.type)

            if (typeof reducer === 'function') {
                this.state = reducer(this.getState(), action, this.dispatch)
                if (!silent) this.subscribers.forEach(fn => fn(this.state))
            }

        }
    }



    getState() {
        return _.clone(this.state)
    }

    subscribe(fn) {
        if (!this.subscribers.has(fn))
            this.subscribers.add(fn)
    }

    unsubscribe(fn) {
        this.subscribers.remove(fn)
    }

}

module.exports = Store