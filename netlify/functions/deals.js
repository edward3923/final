// Goal: Kellogg deals API
//
// Business logic:
//
//
// Tasks:
// Write an API endpiont, using lambda function, that returns information on all the available deals (see courses.js in hw7)
// 

let firebase = require('./firebase')

exports.handler = async function(event) {
  let returnValue = [] // sample only...
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}