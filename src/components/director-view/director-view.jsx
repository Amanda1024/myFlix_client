import React from 'react';
import { Row, Container } from 'react-bootstrap';

import './director-view.scss'

export class DirectorView extends React.Component {
  
  render() {
    const { director, onBackClick, movies } = this.props;
    return (
      <Container>
        <Row>
         <h4>Director: {director.Name}</h4>
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
           <button className='button' variant='primary' onClick={() => {onBackClick(null);}}>Back to movie</button>
         </Row>
      </Container>
    );
  }
}



export default DirectorView;