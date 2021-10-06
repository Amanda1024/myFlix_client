import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';


import './registration-view.scss';


export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegistration(username);
    };

    return (
        <div class='registration'>
        <Form>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>        
        
            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>    
           
            <Form.Group controlId='formEmail'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='birthday'>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type='text' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
            </Form.Group>
            <button class='button' type='submit' onClick={handleSubmit}>Sign Up</button>
        </Form>
        </div>
    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};