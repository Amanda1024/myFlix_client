import React from 'react';
import { Button, Row, Container } from 'react-bootstrap';

import './director-view.scss'

export class DirectorView extends React.Component {
  
  render() {
    const { director, onBackClick, movies } = this.props;
    return (
      <Container>
        <Row>
         <h3>Director: {director.Name}</h3>
         </Row>
         <Row>
         <p className='director-bio'>Bio: {director.Bio}</p>
         </Row>
         <Row>
         <p className='director-birth'>Birth: {director.Birth}</p>
         </Row>
         <Row>
         <p className='director-death'>Death: {director.Death}</p>
         </Row>
         <Row>
           <Button className='button' variant='primary' onClick={() => {onBackClick(null);}}>Back to movie</Button>
         </Row>
      </Container>
    );
  }
}



export default DirectorView;