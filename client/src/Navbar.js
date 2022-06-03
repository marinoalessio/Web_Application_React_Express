import './App.css';
import { Nav, Navbar, Container, Popover, Overlay, Button } from 'react-bootstrap';
import { useState } from 'react';


function Profile() {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <div>
            <Button onClick={handleClick} variant="none"><i className="bi bi-person-circle p-1 text-light m-0"></i></Button>
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">Effettua il login</Popover.Header>
                    <Popover.Body>
                        <strong>Login</strong>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}

function NavBar() {

    return (
        <>
            <Navbar bg="primary" variant="dark" className="py-0">
                <Container>
                    
                    <Navbar.Brand href="#home">Piano di Studi</Navbar.Brand>
                    <Nav.Link href="#home" className="end-50">
                        <Profile />
                    </Nav.Link>

                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;