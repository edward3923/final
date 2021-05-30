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

    // establish a connection to firebase in memory
    let db = firebase.firestore()

    // perform a query against firestore for all posts, wait for it to return, store in memory
    let dealsQuery = await db.collection(`deals`).orderBy(`created`, `desc`).get()
  
    // retrieve the documents from the query
    let deals = dealsQuery.docs
console.log(deals)
// loop through the post documents
for (let dealsIndex=0; dealsIndex < deals.length; dealsIndex++) {
  // get the id from the document
  let dealId = deals[dealIndex].id

  // get the data from the document
  let dealData = deals[dealsIndex].data()

  // perform a query to get the number of likes for this post
  let likesQuery = await db.collection(`likes`).where(`postId`, `==`, dealId).get()

  // the number of likes is the number of documents returned
  let numberOfLikes = likesQuery.size

  let postObject = {
    userName: dealData.userName,
    imgSrc: dealData.imageUrl,
    description: dealData.description,
    cost: dealData.cost,
    numLikes: numberOfLikes,
    dateCreated: firebase.firestore.FieldValue.serverTimestamp()
  }

  // add the Object to the return value
  returnValue.push(postObject)
console.log(postObject)
}
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}