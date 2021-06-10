// Goal: Kellogg Deals - adding a deal API
//
// Business logic:
// - System should pass in four variables: imageUrl, description, cost, and user name
// - Will create a database entry with respective fields filled out


let firebase = require(`./firebase`)

// /.netlify/functions/add_deal?imageUrl=${imageUrl}&description=${description}&cost=${cost}&userName=${user.displayName}
exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let imageUrl = event.queryStringParameters.imageUrl
  let description = event.queryStringParameters.description
  let cost = event.queryStringParameters.cost
  let userName = event.queryStringParameters.userName
 
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new post
  await db.collection(`deals`).add({
    imageUrl: imageUrl,
    description: description,
    cost: cost,
    userName: userName,
    dateCreated: new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString()
  })

  return {
    statusCode: 200
  }
}