const crypto = require('crypto')

export function getRandomNumber() {
  return Math.floor(Math.random() * 10000 + 1)
}

export function getRandomString() {
  return crypto.randomBytes(20).toString('hex')
}
