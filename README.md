# Final Project Template

### KIEI-451 Spring 2021

Live Internet URL:

#### Project Description:
- Kellogg Deals is a site where Kellogg students can come to see the deals that other fellow students submitted once they are logged in.
- Logged in users will have an option to add a deal of their own that they find on the internet so others in the community can benefit from the information as well.
- Deals can be "liked" if someone feels like it was a very good deal.
- You can search for a particular deal by looking up the Description or the Cost field, but the search term will need to be exact

#### Team Members:
- Weber Lu
- Edward Nagai
- Kevin Wilson

##### Requirements / Rubric:
- Frontend
    - [x] Web Design properly structured with valid HTML and styling applied using Tailwind CSS framework
    - [x] User Authentication is working properly
    - [x] Code makes 3 backend API requests using relevant DOM manipulation and event listeners in response to user input and data
        1. deals.js will read the data from the database
        2. add_deal.js will write a deal to the database
        3. add_like.js will write a unique like to the database

- Backend
    - [x] Firebase Cloud Firestore database has 2 collections: likes and deals
        - likes database includes a user uid as one of the fields, used to identify data that is specific to a particular user
    - [x] 3 API endpoints are built using Netlify Functions
        1. deals.js will read the data from the database
        2. add_deal.js will write a deal to the database
        3. add_like.js will write a unique like to the database

- Miscellaneous
    - [x] Deployed live and available publicly on the Internet using Netlify. Public URL listed above.