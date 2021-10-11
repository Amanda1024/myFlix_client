import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './movie-view.scss';


export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }
  
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
  
  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
  
    axios.post(`https://af-myflix-movie-app.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`Added to your Favorites`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    render() {
        const { movie, onBackClick  } = this.props;

        return (
          <div className='info'>
            <div className='movie-view'>
              <div className='movie-poster'>
                <img src={movie.ImagePath} />
              </div>
              <div className='movie-title'>
                <span className='label'>Title: </span>
                <span className='value'>{movie.Title}</span>
              </div>
              <div className='movie-genre'>
                  <span className='label'>Genre: </span>
                  <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}
                  </Link>
              </div>
              <div className='movie-rating'>
                  <span className='label'>Rating: </span>
                  <span className='value'>{movie.Rating}</span>
              </div>
              <div className='movie-director'>
                  <span className='label'>Director: </span>
                  <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}
                  </Link>
              </div>
              <div className='movie-description'>
                <span className='label'>Description: </span>
                <span className='value'>{movie.Description}</span>
              </div>
              <div>
              <button className='fav-button' value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
              Add to Favorites
              </button>
              <button className='back-button' onClick={() => { onBackClick(null); }}>Back</button>
              </div>
            </div> 
            </div>
        );
    }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Rating: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,}),
    Director: PropTypes.shape({
      Name: PropTypes.string
    })
  })
};

