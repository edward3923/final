// Goal: Kellogg Deals API that returns all the data we want in JSON format
//
// Business logic:
// - Database has 2 tables - likes table and deals table
// - In the likes table, it stores the User UID and postId
// - In the deals table, it stores the dateCreated, userName, imageUrl, description, and cost
// - This API endpoint will return information on all the available deals
// - Structure will look like:
// Deals[
//   {
//     dealId
//     userName
//     imageUrl
//     description
//     cost
//     numLikes
//     dateCreated
//   }
// ]

// allows us to use firebase
let firebase = require('./firebase')

// /.netlify/functions/deals
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all deals, wait for it to return, store in memory
  let dealsQuery = await db.collection(`deals`).get()

  // retrieve the documents from the query
  let deals = dealsQuery.docs

// loop through the deals documents
for (let dealsIndex=0; dealsIndex < deals.length; dealsIndex++) {
  // get the id from the document
  let dealId = deals[dealsIndex].id

  // get the data from the document
  let dealData = deals[dealsIndex].data()

  // perform a query to get the number of likes for this post
  let likesQuery = await db.collection(`likes`).where(`postId`, `==`, dealId).get()

  // the number of likes is the number of documents returned
  let numberOfLikes = likesQuery.size

  let postObject = {
    id: dealId,
    userName: dealData.userName,
    imgSrc: dealData.imageUrl,
    description: dealData.description,
    cost: dealData.cost,
    numLikes: numberOfLikes,
    dateCreated: dealData.dateCreated
  }

  // add the Object to the return value
  returnValue.push(postObject)
}

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}