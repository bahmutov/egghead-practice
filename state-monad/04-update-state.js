// https://egghead.io/lessons/javascript-update-the-state-of-a-state-monad

const log = console.log
const State = require('crocks/State')
const { put } = State
const Pair = require('crocks/Pair')
const Unit = require('crocks/Unit')

const putState = state => State(() => Pair(Unit(), state))

// reset :: () -> State String ()
const reset = () => putState('updated state')

// exalWith returns Unit()
log(putState('Grand Foo').evalWith('here'))

// execWith returns state "Gran Foo"
log(putState('Grand Foo').execWith('here'))

log(reset().execWith('initial state'))
// updated state

log(put('Grand Foo').execWith('initial state'))
// Grand Foo
