// https://egghead.io/lessons/javascript-substitute-state-using-functions-with-a-state-monad

const log = console.log

const { get } = require('crocks/State')
const prop = require('crocks/Maybe/prop')
const option = require('crocks/pointfree/option')
const compose = require('crocks/helpers/compose')

const burgers = { burgers: 4 }
const tacos = { tacos: 10 }

// const getBurgers = get().map(prop('burgers'))
// can also pass prop('burgers')
// directly into get() to avoid extra
// get().map(prop('burgers'))

const defaultProp = (key, def) => compose(option(def), prop(key))

const getBurgers = get(defaultProp('burgers', 0))

// evalWith :: State is same as
// runWith().fst()
log(getBurgers.evalWith(burgers))
log(getBurgers.runWith(burgers).fst())
// Just 4
// Just 4
// or with .map(option(0))
// 4
// 4

log(getBurgers.evalWith(tacos))
log(getBurgers.runWith(tacos).fst())
// Nothing
// Nothing
// or with .map(option(0))
// 0
// 0
