// Goal: Kellogg deals - adding a deal API
//
// Business logic:
// system should pass in three variables: imageUrl, description, and cost

// Tasks:
// 
// 
let firebase = require(`./firebase`)

// /.netlify/functions/create_post?userName=Brian&imageUrl=https://images.unsplash.com/...
exports.handler = async function(event) {
  // get the two querystring parameters and store in memory
  let imageUrl = event.queryStringParameters.imageUrl
  let description = event.queryStringParameters.description
  let cost = event.queryStringParameters.cost
 
  // establish a connection to firebase in memory

let db = firebase.firestore()

  // create a new post

db.collection(`deals`).add({
  imageUrl: imageUrl,
  description: description,
  cost: cost
})

  return {
    statusCode: 200
  }
}