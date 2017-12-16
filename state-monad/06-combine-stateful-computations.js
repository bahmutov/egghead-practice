// https://egghead.io/lessons/javascript-combine-stateful-computations-using-a-state-monad

const log = console.log
const State = require('crocks/State')
const { get, modify } = State
const Pair = require('crocks/Pair')
const Unit = require('crocks/Unit')
const constant = require('crocks/combinators/constant')

const mapProps = require('crocks/helpers/mapProps')
const add = x => y => x + y

// const compute = n => State.of(n).chain(x => get(add(x)))

// addState :: Number -> State Number
const addState = n => get(add(n))

const incState = n => modify(add(1)).map(constant(n))

// .chain(addState) computes the result from state
// .chain(incState) changes the state inside
const compute = n => State.of(n).chain(addState).chain(incState)

log(compute(10).runWith(5))
// Pair(15, 6)
// 15 - resultant
// 6 - state
