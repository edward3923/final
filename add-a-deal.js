// Goal: Kellogg Deals main page Javascript
//
// Business logic:
// - Create Javascript code that will show an empty add-a-deal.html page if logged out, and allow user to see data if logged in
// - While logged in, a user should see three fields he/she can fill out
// - After filling in the form, the user can click on the "Submit" button and will go back to the index.html page.
// - If there are any fields that are empty (invalid submission), it will be ignored and go back to the main screen

// standard event listener for Firebase auth
firebase.auth().onAuthStateChanged(async function(user) {
  // check to see if user is logged-in (i.e. user exists)
  if (user) {
    // Signed in
    console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
    <button class="text-pink-500 underline sign-out">Sign Out</button>
    `

    // get a reference to the sign out button
    let signOutButton = document.querySelector(`.sign-in-or-sign-out`)

    // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the home page
      document.location.href = `index.html`
    })

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

      // if the data isn't valid, return back to the main page without inserting the data
      if (imageUrl == `` || description == `` || cost == ``) {
        document.location.href = `index.html`
      }
      // if the data has been filled out, proceed with adding the data into the database
      else {
        // build the URL for our "add_deal" lambda function
        let url = `/.netlify/functions/add_deal?imageUrl=${imageUrl}&description=${description}&cost=${cost}&userName=${user.displayName}`

        // fetch the URL, wait for the response, store the response in memory
        let response = await fetch(url)

        // redirect to the main site
        document.location.href = `index.html`
      }
    })
  }
  else {
    // Signed out
    console.log('signed out')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})