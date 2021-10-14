import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './navbar-view.scss';

export class NavBar extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    render() {
        const { user } = this.props;
        const movies = `/`;
        const profile = `/users/${user}`;

        if (!user) return null;

        return (
            <Navbar collapseOnSelect fixes='top' expand='lg' variant='light' className='navbar'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <h3 className='myflix'>myFlix</h3>
                    <Nav.Link as={Link} to={movies} className='link-text'>
                        Movies
                    </Nav.Link>
                    <Nav.Link as={Link} to={profile} className='link-text'>
                        Profile
                    </Nav.Link>
                    <Nav.Link to={'/'} onClick={this.onLoggedOut} className='logout'>
                        Log Out
                    </Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        )
    }



}
