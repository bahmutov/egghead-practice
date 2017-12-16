// https://egghead.io/lessons/javascript-modify-the-state-of-a-state-monad

const log = console.log
const State = require('crocks/State')
const { modify } = State
const Pair = require('crocks/Pair')
const Unit = require('crocks/Unit')

const mapProps = require('crocks/helpers/mapProps')

const add = x => y => x + y
const state = {
  bubbles: 42
}

// modifyState :: (s -> s) -> State s ()
// const modifyState = fn => State(s => Pair(Unit(), fn(s)))

// blowBubble :: () -> State Object ()
// const blowBubble = () => modifyState(mapProps({ bubbles: add(1) }))
const blowBubble = () => modify(mapProps({ bubbles: add(1) }))

log(blowBubble().execWith(state))
// { bubbles: 43 }

const blowBubbles = n => modify(mapProps({ bubbles: add(n) }))

log(blowBubbles(10).execWith(state))
// { bubbles: 52 }
