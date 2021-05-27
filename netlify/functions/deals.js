// Goal: Kellogg deals API
//
// Business logic:
// - Database should probably have 2 tables - users table and deals table
// - In the users table, it should store the Identifier, the User UID, the name of the user (if possible)
// - In the deals table, it should store the ID of the submitter, imgSrc, description, cost, and numLikes
//
// Tasks:
// - Write an API endpiont, using lambda function, that returns information on all the available deals (see courses.js in hw7)
// - I think the structure should look something like:
// Deals [
//   {
//     userName
//     deal {
//       imgSrc
//       description
//       cost
//       numLikes
//     }
//   }
// ]

let firebase = require('./firebase')

exports.handler = async function(event) {
  let returnValue = [] // sample only...
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}