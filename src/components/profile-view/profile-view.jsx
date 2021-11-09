import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Row, Col, CardDeck, Form, Container } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: null,
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  // get user method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://af-myflix-movie-app.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  removeFavoriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');


    axios
      .delete(`https://af-myflix-movie-app.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie was removed from favorites');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
    // .then(() => window.location.reload());
  }

  handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://af-myflix-movie-app.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Name: newName ? newName : this.state.Name,
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          Name: response.data.Name,
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setName(input) {
    this.Name = input;
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://af-myflix-movie-app.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

return (
  <Container>
    <div>
    <Card className='profile-card'>
    <Col>
      <Card.Body>
        <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.Name, this.Username, this.Password, this.Email, this.Birthday)}>
        <p className='update'>Update Profile</p>
          <Form.Group controlId='formName'>
            <Form.Label className='form-label'>Name</Form.Label>
            <Form.Control type='text' placeholder='Change Name' onChange={(e) => this.setName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicUsername'>
            <Form.Label className='form-label'>Username</Form.Label>
            <Form.Control type='text' placeholder='Change Username' onChange={(e) => this.setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label className='form-label'>Password</Form.Label>
            <Form.Control type='password' placeholder='Change Password' onChange={(e) => this.setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label className='form-label'>Email</Form.Label>
            <Form.Control type='email' placeholder='Change Email' onChange={(e) => this.setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicBirthday'>
            <Form.Label className='form-label'>Birthday</Form.Label>
            <Form.Control type='date' placeholder='Change Birthday' onChange={(e) => this.setBirthday(e.target.value)} />
          </Form.Group>

          <button className='button' type='submit'>
            Update
          </button>

          <button className='delete-button' onClick={(e) => this.handleDeleteUser(e)}>
            Delete Account
          </button>
        </Form>
      </Card.Body>
      </Col>
    </Card>
    </div>
    <div>
    <Card.Body>
      <p>Your Favorite Movies</p>
        {FavoriteMovies.length === 0 && <div className='text-center'>Empty</div>}
        <div className='favorite-movies'>
        <CardDeck className='movie-card-deck'>
          {FavoriteMovies.length > 0 &&
          movies.map((movie) => {
            if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
            return (
                    <Card className='favorites-item card-content'  key={movie._id}>
                      <Card.Img className='movieCard' variant='top' src={movie.ImagePath} />
                        <Card.Body>
                          <Card.Title className='movie-card-title'>{movie.Title}</Card.Title>
                          <button className='button' value={movie._id} onClick={(e) => this.removeFavoriteMovie(e, movie)}>
                           Remove
                          </button>
                        </Card.Body>
                    </Card>
                );
              }
            })}
            </CardDeck>
        </div>
      </Card.Body>
      </div>
  </Container>
);
}
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};

