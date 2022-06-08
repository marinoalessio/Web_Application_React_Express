import './App.css';
import { Nav, Navbar, Container, Popover, Overlay, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Profile(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <div>
            {props.loggedIn ? <strong className="me-3 text-white">Hello, {props.user.name}</strong> : false}
            <Button onClick={handleClick} variant="none">

                <i className="bi bi-person-circle p-1 text-light m-0"></i>
            </Button>
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">
                        Personal Area
                    </Popover.Header>
                    <Popover.Body>
                        {props.loggedIn ?
                            <Button variant="none" onClick={() => { navigate('/logout') }}>Logout</Button> :
                            <Button variant="none" onClick={() => { navigate('/login') }}>Login</Button>}
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}

function NavBar(props) {
    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="primary" variant="dark" className="py-0">
                <Container>

                    <Navbar.Brand onClick={() => { navigate('/') }}>Piano di Studi</Navbar.Brand>
                    <Nav.Link className="end-50">
                        <Profile loggedIn={props.loggedIn} user={props.user} />
                    </Nav.Link>

                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;