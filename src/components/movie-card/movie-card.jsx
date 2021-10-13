import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div className='card'>
      <Card>
        <Card.Img variant='top' src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <button className='read-more'variant='link'>Read More</button>
          </Link>
        </Card.Body>
      </Card>
      </div>
    );
  }
}      


