myFlix App

This repository represents the client side of the myFlix app, and pairs with the movie_api repository which holds the API.

Views:

Registration View
- Allows prospective users to create a user account.

Login View
- Allows users to log in with a username and password.

Profile view
- Allows users to update their info.
- Allows users to delete their account.
- Displays user's favorite movies, and the ability to remove movies from list.

Main view
- Displays (React Bootstrap) Cards of all movies in the database, showing their poster image, title, and description. 
- Includes a button on each card that the user can click to get more details about a single movie.
- Navigation at the top of the screen allows the user to access their Profile, the list of movies, or to Log Out.

Movie View
- Displays the movie poster, diretor, genre, rating, and description of a single selected movie.
- Includes button that allows a uder to add the movie to their list of favorites.
- Includes a button that allows the user to go back to the list of all movies in the database.

Genre View
- Provides extended description for selected Genre.

Director view
- Displays director bio, birth, death.

Tech used:

- MongoDB
- Express
- React
- Node
