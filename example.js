// constructor
var Store = require('./index.js')

// data
var state = {
    name: 'John Doe',
    age: 20
}

// controllers
var reducers = {
    SET_NAME: (state, action, next) => {
        state.name = action.name
        return state
    },
    SET_AGE: (state, action, next) => {
        state.age = action.age
        return state
    }
}

// Create an instance
var TestStore = new Store(state, reducers)

// subscribe
TestStore.subscribe( state => console.log(state) )

// dispatch events
TestStore.dispatch({
    type: 'SET_NAME',
    name: 'Mike Roch'
})

TestStore.dispatch({
    type: 'SET_AGE',
    age: 200
})
