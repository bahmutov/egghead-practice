// https://egghead.io/lessons/javascript-combine-stateful-computations-using-a-state-monad

const log = console.log
const State = require('crocks/State')
const { get, modify } = State
const liftA2 = require('crocks/helpers/liftA2')

// word :: Number -> String -> String
const getWord = index => word => word.split(' ')[index] || ''

// nameify :: String -> String -> String
const nameify = first => last => `${last}, ${first}`

const getFirst = get(getWord(0))

const getLast = get(getWord(1))

// format :: State string
// const format = getFirst.chain(f => getLast.map(nameify(f)))

// ap :: State s (a -> b) ...
// const format = getFirst.map(nameify).ap(getLast)
const format = liftA2(nameify, getFirst, getLast)

log(format.evalWith('Rob Paul'))
