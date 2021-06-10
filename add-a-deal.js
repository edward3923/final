// Goal: Kellogg Deals main page Javascript
//
// Business logic:
// - Create Javascript code that will show an empty add-a-deal.html page if logged out, and allow user to see data if logged in
// - While logged in, a user should see three fields he/she can fill out
// - After filling in the form, the user can click on the "Submit" button and will go back to the index.html page.
//

// standard event listener for Firebase auth
firebase.auth().onAuthStateChanged(async function(user) {
  // check to see if user is logged-in (i.e. user exists)
  if (user) {
    // Signed in

    // get a reference to the submit button
    let submitButton = document.querySelector(`#submitbutton`)

    // handle the submit button
    submitButton.addEventListener(`click`, async function(event) {

      // ignore the default behavior
      event.preventDefault()
      
      // get the reference to the inputs
      let imageUrlInput = document.querySelector(`#imageUrl`)
      let descriptionInput = document.querySelector(`#description`)
      let costInput = document.querySelector(`#cost`)

      // store the user-inputted values into memory
      let imageUrl = imageUrlInput.value
      let description = descriptionInput.value
      let cost = costInput.value

      // build the URL for our "add_deal" lambda function
      let url = `/.netlify/functions/add_deal?imageUrl=${imageUrl}&description=${description}&cost=${cost}&userName=${user.displayName}`

      // fetch the URL, wait for the response, store the response in memory
      let response = await fetch(url)

      // redirect to the main site
      document.location.href = `index.html`
      
    })
  }
  else {
    // Signed out
    console.log('signed out')
  }
})