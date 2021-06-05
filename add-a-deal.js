// Goal: Kellogg deals main page Javascript
//
// Business logic:
//
//
// Tasks:
// - Create Javascript code that will show an empty add-a-deal.html page if logged out, and allow user to see data if logged in (week 8)
// - While logged in, a user should see several fields he/she can fill out
// - After filling in the form, the user can click on the "Submit" button and will go back to the index.html page.

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('on add deal page')

// get a reference to the submit button

let submitButton = document.querySelector(`#submitbutton`)

// handle the submit button
submitButton.addEventListener(`click`, async function(event) {
// event.preventDefault()
console.log(`submit clicked`)
  
  let imageUrlInput = document.querySelector(`#imageUrl`)
  let descriptionInput = document.querySelector(`#description`)
  let costInput = document.querySelector(`#cost`)

  // store the user-inputted image URL in memory
  let imageUrl = imageUrlInput.value
  let description = descriptionInput.value
  let cost = costInput.value
  // create the URL for our "create post" lambda function
  let url = `/.netlify/functions/add_deal?imageUrl=${imageUrl}&description=${description}&cost=${cost}`
  // let url = `/.netlify/functions/add_deal?imageUrl=${userName}`

   // fetch the URL, wait for the response, store the response in memory
   let response = await fetch(url)

   // redirect to the add-a-deal site
  document.location.href = `index.html`
  
  })

} else {
    // Signed out
    console.log('signed out')
}})