// Required to create a component, imports React into the file
import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './main-view.scss';



// Exposes the main view component, making it available for use elsewhere
export class MainView extends React.Component {

  constructor() {
      super();
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null
      };
    } 

  componentDidMount(){
      axios.get('https://af-myflix-movie-app.herokuapp.com/movies')
      .then(response => {
          this.setState({
              movies: response.data
          });
      })
      .catch(error => {
          console.log(error);
      });
  } 

  // When a movie is clicked, this function updates the state of the 'selectedMovie' property to that movie
  setSelectedMovie(movie) {
      this.setState({
          selectedMovie: movie
      });
  }

  // Allows registered profile to be created
  onRegistration(register) {
      this.setState({
          register,
      });
  }

  // When a user successfully logs in, this function updates the 'user' property in state to that specific user
  onLoggedIn(user) {
      this.setState({
          user,
      });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    // If user doesn't exist, they're prompted to register. If user does exist, they're asked to login
    if (!register)
    return (
        <RegistrationView onRegistration={(register) => this.onRegistration(register)} />
    );

    // Once user is logged in, they are shown their login view
    if (!user)
    return (
        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
    );
  
    if (movies.length === 0) return <div className='main-view' />;
  
    return (
    
      <Container>
      <div className='main-view'>
        {selectedMovie
          ?(
          <Row className='justify-content-md-center'>
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => 
                { this.setSelectedMovie(newSelectedMovie);}}/>
              </Col>  
          </Row>
          )
          : (
          <Row className='justify-content-md-center'>
            {movies.map(movie => ( 
               <Col md ={3}>
                 <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
               </Col>
            ))}
          </Row>
         )
        }
      </div>
      </Container>

    );
  }
}

export default MainView;
