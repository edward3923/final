// Goal: Kellogg Deals - adding a like API
//
// Business logic:
// - System should pass in two variables: postId and userUid
// - Looks inside the database to see whether the postId and userUid pair exists
// - If entry doesn't exist, create an entry

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/add_like?dealId=${dealId}&userId=${user.uid}
exports.handler = async function(event) {

  // get the querystring parameters and store in memory
  let userId = event.queryStringParameters.userId
  let dealId = event.queryStringParameters.dealId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // query for an existing like, wait for it to return, store the query in memory
  let likesQuery = await db.collection(`likes`).where(`postId`, `==`, dealId).where(`userUid`, `==`, userId).get()


  // if there isn't already a like for the post/user combination, create one
  if (likesQuery.size == 0){
    db.collection(`likes`).add({
      postId: dealId,
      userUid: userId,
    })
  }

  return {
    statusCode: 200
  }
}