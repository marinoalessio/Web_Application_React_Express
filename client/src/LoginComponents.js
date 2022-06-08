import { Form, Button, Alert, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import './App.css';

function LoginForm(props) {
    const [username, setUsername] = useState('test@polito.it');
    const [password, setPassword] = useState('password');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        const credentials = { username, password };

        // SOME VALIDATION, ADD MORE!!!
        let valid = true;
        if (username === '' || password === '')
            valid = false;

        if (valid) {
            props.login(credentials);
        }
        else {
            // show a better error message...
            setErrorMessage('Error(s) in the form, please fix it.')
        }
    };

    return (
        <Container fluid className="login-page bg-dark">
            <Row className="justify-content-center p-3">
                <Col sm="4" className="text-white mt-5">
                    <h2>Welcome</h2>
                    <p>Il sito web che ti cambierà la vita!!!!!</p>
                </Col>
                <Col sm="4" className="bg-white p-3 mt-5 rounded">
                    
                    <Form>

                        {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="user"><i className="bi bi-person"></i></InputGroup.Text>
                            <FormControl
                                placeholder="email"
                                aria-label="email"
                                onChange={ev => setUsername(ev.target.value)}
                                value={username}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="password"><i className="bi bi-lock"></i></InputGroup.Text>
                            <FormControl
                                placeholder="password"
                                aria-label="password"
                                onChange={ev => setPassword(ev.target.value)}
                                value={password}
                                type="password"
                            />
                        </InputGroup>
                        <Button className="float-end" onClick={handleSubmit}>Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

function LogoutButton(props) {
    return (
        <Col>
            <span>User: {props.user?.name}</span>{' '}<Button variant="outline-primary" onClick={props.logout}>Logout</Button>
        </Col>
    )
}

export { LoginForm, LogoutButton };