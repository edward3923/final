// Goal: Kellogg deals main page Javascript
//
// Business logic:
// - Will show an empty index.html page if logged out, and allow user to see data if logged in
// - While logged in, a user should see a "Add a Deal" button that will lead to a the site add-a-deal.html
// - Will retrieve JSON data from deals.js and will display on the website
//

// standard event listener for Firebase auth
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

    // get a reference to the add deal button
    let addDealButton = document.querySelector(`.add-deal-button`)

    // handle the add deal button
    addDealButton.addEventListener(`click`, async function(event) {
      event.preventDefault()
      // redirect to the add-a-deal site
      document.location.href = `add-a-deal.html`
    })

    // Build the URL for our deals API
    let url = `/.netlify/functions/deals`

    // Fetch the url, wait for a response, store the response in memory
    let response = await fetch(url)

    // Ask for the json-formatted data from the response, wait for the data, store it in memory
    let json = await response.json()

    // Grab a reference to the element with class name "deals" in memory
    let dealsDiv = document.querySelector(`.deals`)

    // Loop through the JSON data, for each Object representing a deal:
    for (let i=0; i < json.length; i++) {
      // Store each object ("deal") in memory
      let deal = json[i]

      // Store the deal's data in memory
      let imageLink = deal.imgSrc
      let description = deal.description
      let cost = deal.cost
      let numLikes = deal.numLikes
      let dealId = deal.id
      let dealCreated = deal.dateCreated
      let userName = deal.userName

      // Insert HTML code using the "deals" data
      dealsDiv.insertAdjacentHTML(`beforeend`, `
      <table class="table-fixed m-4 w-3/4" >
          <tr>
            <td rowspan ="3" class="p-4" align="center" valign="center"><img src="${imageLink}" class="w-36 h-36"></td>
            <td class="w-1/2" align="left" valign="center"> <span class= "font-bold" >Description: </span> ${description}</td>
            <td class="w-1/4 pr-16" align="left" valign="center"> <span class= "font-bold" >Submitted on: </span> ${dealCreated}</td>
          </tr>
          <tr>
            <td align="left" valign="center"> <span class= "font-bold" >Cost: </span>${cost}</td> 
          </tr>
          <tr column span = "2">
            <td class="w-1/2" align="left" valign="center"> <span class= "font-bold" >Submitted by: </span> ${userName}</td>
            <td class="w-1/2"> <button id="like-button-${dealId}"><img src="Like Button.png" class= "w-20"> </button> ${numLikes} </td>
          </tr>
          <hr size="8" width="90%" color="black">
      </table>
      `)

      // Handle the like functionality here
      // get a reference to the like button
      let likeButton = document.querySelector(`#like-button-${dealId}`)

      // event listener for the like button
      likeButton.addEventListener(`click`, async function(event) {
        // ignore the default behavior
        event.preventDefault()

        // Build the URL for our likes API
        let url = `/.netlify/functions/add_like?dealId=${dealId}&userId=${user.uid}`
        
        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)

        // refresh the page
        location.reload()
      })
    }

    // Search button code from here
    // get a reference to the search button
    let searchButton = document.querySelector(`.searchbutton`)

    // handle the search button
    searchButton.addEventListener(`click`, async function(event) {
      // ignore the default behavior
      event.preventDefault()

      // get a reference to the searchbar input
      let searchTermInput = document.querySelector(`#searchbar`)
    
      // get the value of the searchbar input
      let searchTerm = searchTermInput.value

      // clear the current results
      dealsDiv.innerHTML = ""

      // go through all the deals and show only the matches
      for (let i=0; i < json.length; i++) {
        // Store each object ("deal") in memory
        let deal = json[i]
    
        // Store the deal's data in memory
        let imageLink = deal.imgSrc
        let description = deal.description
        let cost = deal.cost
        let numLikes = deal.numLikes
        let dealId = deal.id
        let dealCreated = deal.dateCreated
        let userName = deal.userName

        // if there is a match, display it to the user
        if (searchTerm == description || searchTerm == cost) {
          dealsDiv.insertAdjacentHTML(`beforeend`, `
          <table class="table-fixed m-4 w-3/4" >
            <tr>
              <td rowspan ="3" class="p-4" align="center" valign="center"><img src="${imageLink}" class="w-36 h-36"></td>
              <td class="w-1/2" align="left" valign="center"> <span class= "font-bold" >Description: </span> ${description}</td>
              <td class="w-1/4 pr-16" align="left" valign="center"> <span class= "font-bold" >Submitted on: </span> ${dealCreated}</td>
            </tr>
            <tr>
              <td align="left" valign="center"> <span class= "font-bold" >Cost: </span>${cost}</td> 
            </tr>
            <tr column span = "2">
              <td class="w-1/2" align="left" valign="center"> <span class= "font-bold" >Submitted by: </span> ${userName}</td>
              <td class="w-1/2"> <button id="like-button-${dealId}"><img src="Like Button.png" class= "w-20"> </button> ${numLikes} </td>
            </tr>
            <hr size="8" width="90%" color="black">
          </table>
          
          `)

          // Handle the like functionality here
          // get a reference to the like button
          let likeButton2 = document.querySelector(`#like-button-${dealId}`)

          console.log(likeButton2)

          // event listener for the like button
          likeButton2.addEventListener(`click`, async function(event) {
            // ignore the default behavior
            event.preventDefault()

            // Build the URL for our likes API
            let url = `/.netlify/functions/add_like?dealId=${dealId}&userId=${user.uid}`
            
            // Fetch the url, wait for a response, store the response in memory
            let response = await fetch(url)

            // refresh the page
            location.reload()
          })
        }
      }
    })
  }
  
  else {
    // Signed out

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
