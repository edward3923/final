// Goal: Kellogg Deals API that returns all the data we want in JSON format
//
// Business logic:
// - Database should probably have 2 tables - likes table and deals table
// - In the likes table, it should store the User UID and postId
// - In the deals table, it should store the dateCreated, userName, imgSrc, description, cost, and numLikes
//
// Tasks:
// - Write an API endpiont, using lambda function, that returns information on all the available deals (see courses.js in hw7)
// - I think the structure should look something like:
// Deals [
//   {
//     userName
//     imgSrc
//     description
//     cost
//     numLikes
//     dateCreated
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