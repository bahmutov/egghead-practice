// https://egghead.io/lessons/javascript-refactor-stateful-code-to-use-a-state-monad

const log = console.log

const assign = require('crocks/helpers/assign')
const compose = require('crocks/helpers/compose')
const curry = require('crocks/helpers/curry')
const liftA2 = require('crocks/helpers/liftA2')
const prop = require('crocks/Maybe/prop')
const option = require('crocks/pointfree/option')

const propOr = (key, def) => compose(option(def), prop(key))

const State = require('crocks/State')
const { get, modify } = State

// :: String -> User -> User
// const updateFirstName = curry(firstName =>
//   compose(buildFullName, assign({ firstName }))
// )

// :: () -> State User String
const getFirstName = () => get(propOr('firstName', ''))

const getLastName = () => get(propOr('lastName', ''))

// :: String -> State User ()
const updateFirstName = firstName =>
  modify(assign({ firstName })).chain(buildFullName)
const updateLastName = lastName =>
  modify(assign({ lastName })).chain(buildFullName)

// :: String -> User -> User
// const updateFullName = curry(fullName => assign({ fullName }))

// :: String -> State User ()
const updateFullName = fullName => modify(assign({ fullName }))

const joinWords = a => b => `${a} ${b}`

// :: User -> User
// function buildFullName (user) {
//   const { firstName, lastName } = user
//   const fullName = joinWords(firstName, lastName)
//   return updateFullName(fullName, user)
// }

// :: () => State User ()
const buildFullName = () =>
  liftA2(joinWords, getFirstName(), getLastName()).chain(updateFullName)

const user = {
  firstName: 'Bobby',
  lastName: 'Pickles',
  fullName: 'Bobby Pickles'
}

// log(updateFirstName('Jimmy', user))

log(updateFirstName('Jimmy').execWith(user))

// Hmm, how to combine update first name
// with update last name?
// like this
log(updateFirstName('Jimmy').chain(_ => updateLastName('Smith')).execWith(user))
