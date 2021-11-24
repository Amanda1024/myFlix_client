import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send request to server for authentication */
        axios.post('https://af-myflix-movie-app.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user exists')
        });
    };

    return (
        <div className='login'>
          <Row>
            <Col>

              <Container>
                <h3 class='login-title'>Login to your myFlix Account</h3>

                <Form>
                  <Form.Group controlId='formUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId='formPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
                  </Form.Group>

                  <Button id='button' type='submit' onClick={handleSubmit}>Submit</Button>
                </Form>
              </Container>

              <Container>
                <Row className='justify-content-center'>
                  <span class='bottom-link'>Don't have an account?
                    <Link to="/register">
                    <Button id='link' variant='link' className='sign-up-link btn-md' type='submit'>Sign Up</Button>
                  </Link></span>

               </Row>
              </Container>

            </Col>
          </Row>
        </div>
       
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired
  };