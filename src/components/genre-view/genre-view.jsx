import React from 'react';
import { Button, Row, Container } from 'react-bootstrap';

import './genre-view.scss'

export class GenreView extends React.Component {
  
  render() {
    const { genre, onBackClick, movies } = this.props;
    return (
      <Container>
        <Row>
         <h3>Genre: {genre.Name}</h3>
         </Row>
         <Row>
         <p className='genre-description'>Description: {genre.Description}</p>
         </Row>
         <Row>
           <Button className='button' variant='primary' onClick={() => {onBackClick(null);}}>Back to movie</Button>
         </Row>
      </Container>
    );
  }
}



export default GenreView;

