// Goal: Kellogg deals - adding a like API
//
// Business logic:
// system should pass in two variables: postId and userUid

// Tasks:
// Look inside the database to see whether the postId and userUid pair exists
// If doesn't exist, create the entry

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {

  // write the recipe and the implementation

  let userId = event.queryStringParameters.userId
  let dealId = event.queryStringParameters.dealId

 // console.log(userName)
  let db = firebase.firestore()

  let likesQuery = await db.collection(`likes`).where(`postId`, `==`, dealId).where(`userUid`, `==`, userId).get()

 // console.log(likesQuery)

  if (likesQuery.size == 0){
    db.collection(`likes`).add({
      postId: dealId,
      userUid: userId,
     // created: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return {
    statusCode: 200
  }
}