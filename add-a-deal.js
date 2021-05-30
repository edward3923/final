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

// handle the add deal button
submitButton.addEventListener(`click`, function(event) {
 event.preventDefault()
console.log(`submit clicked`)
  // redirect to the add-a-deal site
  document.location.href = `index.html`
  })

} else {
    // Signed out
    console.log('signed out')
}})