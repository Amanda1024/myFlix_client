import React from 'react';
import { Row, Container } from 'react-bootstrap';

import './genre-view.scss'

export class GenreView extends React.Component {
  
  render() {
    const { genre, onBackClick, movies } = this.props;
    return (
      <Container>
        <Row>
         <h4>Genre: {genre.Name}</h4>
         </Row>
         <Row>
         <p className='genre-description'>Description: {genre.Description}</p>
         </Row>
         <Row>
           <button className='button' variant='primary' onClick={() => {onBackClick(null);}}>Back to movie</button>
         </Row>
      </Container>
    );
  }
}



export default GenreView;

