// Goal: Kellogg Deals API that looks for a particular string in the description and returns all the matched data we want in JSON format
//
// Business logic:
// - Database should probably have 2 tables - likes table and deals table
// - In the likes table, it should store the User UID and postId
// - In the deals table, it should store the dateCreated, userName, imgSrc, description, cost, and numLikes
//
// Tasks:
// - Write an API endpiont, using lambda function, that returns information on all the matched deals
// - Structure should look something like:
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