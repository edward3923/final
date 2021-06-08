// Goal: Kellogg deals main page Javascript
//
// Business logic:
//
//
// Tasks:
// - Create Javascript code that will show an empty index.html page if logged out, and allow user to see data if logged in (week 8)
    // [x] allow user to sign in and out
// - [x] While logged in, a user should see a "Add a Deal" button that will lead to a the site add-a-deal.html       
// - Will retrieve JSON data from deals.js and will display on the website

firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

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

  // get a reference to the add deal button
  let addDealButton = document.querySelector(`.add-deal-button`)

  // handle the add deal button
  addDealButton.addEventListener(`click`, async function(event) {
    event.preventDefault()
    // redirect to the add-a-deal site
    document.location.href = `add-a-deal.html`
    // Build the URL for our posts API
  })

  let url = `/.netlify/functions/deals`

  // Fetch the url, wait for a response, store the response in memory
  let response = await fetch(url)

  // Ask for the json-formatted data from the response, wait for the data, store it in memory
  let json = await response.json()

  let dealsDiv = document.querySelector(`.deals`)

  // Loop through the JSON data, for each Object representing a post:
  for (let i=0; i < json.length; i++) {
    // Store each object ("post") in memory
    let deal = json[i]

    // Store the post's ID in memory
    let imageLink = deal.imgSrc
    let description = deal.description
    let cost = deal.cost
    dealsDiv.insertAdjacentHTML(`beforeend`, `
    <table class="table-fixed border-2 border-transparent w-full" >
         <tr>
          <td rowspan ="2" class="w-50 p-4" align="center" valign="center"><img src="${imageLink}" class="w-36 h-36"></td>
          <td class="w-1/2" align="left" valign="center"> <span class= "font-bold" >Description: </span> ${description}</td> 
          </tr>
          <tr column span = "2">
          <td class="w-1/2" align="left" valign="center"> <span class= "font-bold" >Cost: </span>${cost}</td>  
          <td> <button id="like-button"><img src="Like Button.png" class= "w-20"> </button></td>
          </tr>
    </table>
    
    `)
  }

  // get a reference to the search button
  let searchButton = document.querySelector(`.searchbutton`)

  // handle the search button
  searchButton.addEventListener(`click`, async function(event) {
    event.preventDefault()

    console.log(`inside the search button code`)

    let searchTermInput = document.querySelector(`#searchbar`)
  
    let searchTerm = searchTermInput.value

    console.log(`search term value is ${searchTerm}`)
    dealsDiv.innerHTML = ""
    dealsDiv.insertAdjacentHTML(`beforeend`, `
    <table class="table-fixed border-2 border-transparent w-full" >
         <tr>
          <td rowspan ="2" class="w-50 p-4" align="center" valign="center"><img src="https://images.unsplash.com/photo-1620165364791-53757809b0e8?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" class="w-36 h-36"></td>
          <td class="w-1/2" align="left" valign="center"> <span class= "font-bold" >Description: </span> Description of item</td> 
          </tr>
          <tr column span = "2">
          <td class="w-1/2" align="left" valign="center"> <span class= "font-bold" >Cost: </span>10.99</td>  
          <td> <button id="like-button"><img src="Like Button.png" class= "w-20"> </button></td>
          </tr>
    </table>
    
    `)
  })




  } else {
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
