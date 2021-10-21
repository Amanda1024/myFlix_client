import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';

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
    <Navbar collapseOnSelect variant='dark' fixed='top' expand='lg' className='navbar'>
     <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <h3 className='myflix'>myFlix</h3>
          </Nav>

           <NavLink as={Link} to={movies} className='nav-link'>
                Movies
            </NavLink>

            <NavLink as={Link} to={profile} className='nav-link'>
                Profile
            </NavLink>

            <NavLink  to={'/'} onClick={this.onLoggedOut} className='logout'>
                Log Out
            </NavLink>

         </Navbar.Collapse>
      </Container>
    </Navbar>
   );
  }
}

export default NavBar;


