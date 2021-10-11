import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, Col, Figure, Row, Button } from 'react-router-dom';

import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList }) {
    return (
      <Card>
        <Card.Body>
        <Row>
          <Col xs={12}>
           <h4>Favorite Movies</h4>
           </Col>
         </Row>  
         <Row>
        {favoriteMovieList.map(({ ImageUrl, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className='fav-movie'>
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={ImageUrl} alt={Title}/>
                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>
                  <Button variant='secondary' onClick={() => removeFav(_id)}>Remove</Button>
              </Col>
            )
        })
    }
    </Row>
    </Card.Body>
    </Card>
    )
}

export default FavoriteMovies