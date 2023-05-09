# MovieTable App

This is a React web application that displays a table of movies with their details, allows adding new movies, viewing a movie's details, and deleting movies from the table. The data is fetched from an API endpoint and displayed using React-Table.

## Installation and Running

To install and run the app on your local machine, please follow the instructions below:

Markup: 1. Clone the repository using the following command:
   
   git clone https://github.com/<username>/movie-table-app.git
   
 Markup: 2. Navigate to the project directory and install the required dependencies:
    cd movie-table-app
     npm install
  
   Markup: 3. Start the development server:
      npm start

 Markup: 4. Open the app in your web browser by navigating to http://localhost:3000.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Usage
The app displays a table of movies with their details, such as title, duration, starring, and category. The table also provides two buttons, one for viewing a  movie's details and the other for deleting a movie from the table.
  
  ## Viewing a Movie's Details
To view a movie's details, click the "View" button next to the movie you want to see. A modal will appear showing the selected movie's details. The modal also includes an "Edit" button that allows you to edit the movie's details.
  
  ## Adding a New Movie
To add a new movie to the table, click the "Add Movie" button at the top of the page. A modal will appear containing a form where you can input the new movie's details, such as title, duration, starring, and category. Click the "Ok" button to submit the form and add the new movie to the table.
  
  ## Deleting a Movie
  To delete a movie from the table, click the "Delete" button next to the movie you want to delete. The movie will be removed from the table.
  
  ## Dependencies
  The app uses the following dependencies:
  - React
  - React-Table
  - Ant Design
  
  ## License
  This project is licensed under the MIT License. See the LICENSE file for details.
