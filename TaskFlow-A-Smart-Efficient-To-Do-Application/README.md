
Here's your text with corrected grammar while keeping the format unchanged:

----------

## How to use run the file

**Step 1**

-   Download the git file in the local storage.
-   Open the "**backend**" folder in the CMD and run `npm install`.  
    It will install all the dependencies for the backend.
-   Now open the "**frontend**" folder in the CMD and run `npm install`.  
    It will install all the dependencies for the frontend.

**Step 2**

-   Create a MongoDB account.
-   Create a cluster and get the link to your account.
    -   Steps are defined here: [Set up your MongoDB](https://www.mongodb.com/docs/drivers/node/v4.1/quick-start/).
-   Replace "Your MongoDB URL" inside the `userModel.js` file with the URL you got from MongoDB.
    -   The file is located in `frontend -> models -> userModel.js`.

**Step 3**

-   Open the "**backend**" folder in the CMD and run `node index.js`.
-   Open the "**frontend**" folder in CMD and run `npm run dev`.
-   Go to the URL `http://localhost:5173/`.

----------

By doing the above steps, a database named **TODO-React** will be created automatically, and a table named **user** will be created.

----------

## Additional Things

-   Inside `backend -> middleware`, the `userMiddleware.js` file is created, where you can add more conditions for user login and signup.
-   Inside `frontend -> components -> connection`, the `model.jsx` file is created, where you can add more conditions for all the front-end user inputs.

All the API logic is separated from the user input validation logic.