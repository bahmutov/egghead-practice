// lesson https://egghead.io/lessons/javascript-construct-a-stateful-monad
const log = console.log

const State = require('crocks/State')
const Pair = require('crocks/Pair')

// m :: State Number String

const updateValue = x => State(s => Pair(s + x, s))

const updateState = x => State(s => Pair(s, s + x))

// const m = State(state => Pair(state + 5, state + 10))
log(updateValue(10).runWith(45))
log(updateState(10).runWith(45))
