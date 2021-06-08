// Goal: Kellogg deals search results page
//
// Business logic:
// - Whenever a user searches for a term, it will look into the description and if a match is found, it will show it on this page
//
// Tasks:
// - Create Javascript code that will show the results of the search


firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        // Signed in
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
        // /.netlify/functions/search_results.html?searchTerm=...
        exports.handler = async function(event) {
            
        let searchTerm = event.queryStringParameters.searchTerm


        console.log(searchTerm)


        }

    } else {
        // user is not logged-in, so show login
        // Initializes FirebaseUI Auth
        let ui = new firebaseui.auth.AuthUI(firebase.auth())

        // FirebaseUI configuration
        let authUIConfig = {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: `index.html` // where to go after we're done signing up/in
    }

    // Starts FirebaseUI Auth
    ui.start(`.sign-in-or-sign-out`, authUIConfig)
  }
})