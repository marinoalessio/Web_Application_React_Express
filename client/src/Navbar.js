import './App.css';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function NavBar(props) {
    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="primary" variant="dark" className="py-0">
                <Container>

                    <Navbar.Brand onClick={() => { navigate('/') }}>Piano di Studi</Navbar.Brand>
                    <Nav.Link className="end-50">

                        <Nav >
                            {props.loggedIn ? <strong className="m-auto me-4 text-white">Hello, {props.user.name}</strong> : false}
                            <NavDropdown title={<i className="bi bi-person-circle p-1 text-light m-0"></i>} id="basic-nav-dropdown" className="me-5">
                                {props.loggedIn ? <>
                                <NavDropdown.Item onClick={() => { navigate('/create-study-plan') }}>
                                    Create Study Plan
                                </NavDropdown.Item>
                                <NavDropdown.Divider /></> : false }

                                {props.loggedIn ?
                                    <NavDropdown.Item onClick={() => { navigate('/logout') }}>Logout</NavDropdown.Item> :
                                    <NavDropdown.Item onClick={() => { navigate('/login') }}>Login</NavDropdown.Item>}

                            </NavDropdown>
                        </Nav>

                    </Nav.Link>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;