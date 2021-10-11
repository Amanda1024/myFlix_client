import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';


import './registration-view.scss';


export function RegistrationView(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [nameError, setNameError] = useState({});
    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [birthdayError, setBirthdayError] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://af-myflix-movie-app.herokuapp.com/users', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
    })
    .then(response => {
    const data = response.data;
       console.log(data);
       window.open('/', '_self'); 
    })
    .catch(e => {
       console.log('error registering the user')
    });
  }; 


const formValidation = () => {
    let nameError = {};
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let birthdayError = {};
    let isValid = true;

    if (name === '') {
      nameError.nameEmpty = 'Please enter your Name.';
      isValid = false;
    }
    if (username.trim().length < 4) {
      usernameError.usernameShort = 'Please use at least 4 characters.';
      isValid = false;
    }
    if (password.trim().length < 5) {
      passwordError.passwordMissing = 'Please use at least 5 characters.';
      isValid = false;
    }
    if (!(email && email.includes('.') && email.includes('@'))) {
      emailError.emailNotEmail = 'Invalid Email address.';
      isValid = false;
    }
    if (birthday === '') {
      birthdayError.birthdayEmpty = 'Please enter your birthday.';
      isValid = false;
    }
    setNameError(nameError);
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    setBirthdayError(birthdayError);
    return isValid;
  };

    return (
        <Form className='register justify-content-md-center'>
            <Row>
            <Form.Group controlId='formName'>
                <Form.Label>Name:</Form.Label>
                <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    {Object.keys(nameError).map((key) => {
                    return (
                    <div key={key}>
                      {nameError[key]}
                    </div>
                );
                })}
            </Form.Group>
            </Row> 

            <Row>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                    {Object.keys(usernameError).map((key) => {
                    return (
                    <div key={key}>
                      {usernameError[key]}
                    </div>
                );
                })}
            </Form.Group>  
            </Row>
        
            <Row>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {Object.keys(passwordError).map((key) => {
                    return (
                    <div key={key}>
                      {passwordError[key]}
                    </div>
                );
                })}
            </Form.Group>
            </Row>    
           
            <Row>
            <Form.Group controlId='formEmail'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {Object.keys(emailError).map((key) => {
                    return (
                    <div key={key}>
                      {emailError[key]}
                    </div>
                );
                })}
            </Form.Group>
            </Row>

            <Form.Group controlId='birthday'>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type='text' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    {Object.keys(birthdayError).map((key) => {
                    return (
                    <div key={key}>
                      {birthdayError[key]}
                    </div>
                );
                })}
            </Form.Group>

              <span>
              <Button type='submit' onClick={handleSubmit}>Sign Up</Button>
                {' '}
              <Link to='/'>
              <Button variant='secondary' type='button'>Back</Button>
              </Link>
              </span> 

        </Form>
      );
    }
 



RegistrationView.propTypes = {
    register: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired
    }),
  };



