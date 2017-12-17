// https://egghead.io/lessons/javascript-combine-stateful-computations-using-a-state-monad

const log = console.log
const State = require('crocks/State')
const { get, modify } = State
const Pair = require('crocks/Pair')
const Unit = require('crocks/Unit')
const constant = require('crocks/combinators/constant')
const composeK = require('crocks/helpers/composeK')

const mapProps = require('crocks/helpers/mapProps')
const add = x => y => x + y
const mul = x => y => x * y

// const compute = n => State.of(n).chain(x => get(add(x)))

// addState :: Number -> State Number
const addState = n => get(add(n))

const multiplyState = n => get(mul(n))

const incState = n => modify(add(1)).map(constant(n))

const addAndInc = composeK(multiplyState, incState, addState)

// .chain(addState) computes the result from state
// .chain(incState) changes the state inside
// function compute (n) {
//   return addAndInc(n).chain(multiplyState)
// }

log(addAndInc(10).runWith(2))
