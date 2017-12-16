// https://egghead.io/lessons/javascript-substitute-state-using-functions-with-a-state-monad

const log = console.log

const { get } = require('crocks/State')
const prop = require('crocks/Maybe/prop')

const burgers = { burgers: 4 }
const tacos = { tacos: 10 }

const getBurgers = get().map(prop('burgers'))

log(getBurgers.runWith(tacos).fst())
