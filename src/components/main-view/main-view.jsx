// Required to create a component, imports React into the file
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { NavBar } from '../navbar-view/navbar-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';



// Exposes the main view component, making it available for use elsewhere
class MainView extends React.Component {

  constructor() {
      super();
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null
      };
    } 

  componentDidMount(){
      let accessToken = localStorage.getItem('token');
      if (accessToken !==null) {
          this.setState({
              user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
          this.getUsers(accessToken);
      }
  } 

  getUsers(token) {
      axios.get('https://af-myflix-movie-app.herokuapp.com/users', {
          headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
          console.log('Success getting user');
          this.setState({
              users: response.data
      });
    //   this.props.setMovies(response.data)

    //   console.log(response)
      })
      .catch(function (error) {
          console.log(error);
      });
  }  

  getMovies(token) {
        axios.get('https://af-myflix-movie-app.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
           // Assign the result to the state
           this.setState({
               movies: response.data 
           }); 
        })
        .catch(function (error) {
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
          register: register,
      });
  }

  // When a user successfully logs in, this function updates the 'user' property in state to that specific user
  onLoggedIn(authData) {
      console.log(authData);
      this.setState({
          user: authData.user.Username
      });

      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
  }


render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <NavBar user={user} />

           <Row className='main-view justify-content-md-center'>

            <Route exact path='/' render={() => {
              if (!user) { 
                return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>);
              }
              if (movies.length === 0) return (<div className='main-view'>No movies found!</div>);
              return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return (<Col>
                <RegistrationView />
              </Col>)
          }} />

            <Route path='/profile' render={() => {
              if (!user) return <Col>
                <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()}/>
              </Col>
          }} />

            <Route path='/movies/:movieId' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
          }} />

            <Route path='/directors/:name' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className='main-view' />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
          }} />

            <Route path='/genres/:name' render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
          }} />

          <Route exact path='/users/:username' render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            if (movies.length === 0) return;
            return <ProfileView history={history} movies={movies} />
          }} />

        </Row>
      </Router>
    );
  }
};

export default MainView;
