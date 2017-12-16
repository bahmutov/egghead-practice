// https://egghead.io/lessons/javascript-map-and-evaluate-state-with-a-stateful-monad
const log = console.log

const add = x => y => x + y
const pluralize = (singular, plural) => n =>
  (n === 1 ? `${n} ${singular}` : `${n} ${plural}`)

const { get } = require('crocks/State')
const Pair = require('crocks/Pair')
const compose = require('crocks/helpers/compose')

// state :: State Number
// const state = State(s => Pair(s + 10, s))

// getSTate : () -> State s
// const getState = () => State(s => Pair(s, s))

// map :: State s a ~> (a -> b) -> State s b

// log(state.runWith(23))
// log(getState().runWith(23))
const makeAwesome = pluralize('Awesome', 'Awesomes')

const flow = compose(makeAwesome, add(10))

log(get().map(flow).runWith(-9))
