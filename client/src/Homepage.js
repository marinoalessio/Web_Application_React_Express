// import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import API from './API.js';


function Homepage(props) {
  return (
    <>
      <CourseList courses={props.courses} />
    </>

  );
}

function CourseList(props) {
  return (
    <>
      <Container fluid>
        <Row className="justify-content-md-center mt-4 mb-4">
          <Col sm="9">
            <h1>Courses List</h1>
            <ListGroup>
              <ListGroup.Item active>
                <Container>
                  <Row>
                    <Col sm="2">Code</Col>
                    <Col sm="3">Name</Col>
                    <Col sm="2">Credits</Col>
                    <Col sm="2">Attending</Col>
                    <Col sm="2">Max Students</Col>
                    <Col sm="1">
                    </Col>
                  </Row>
                </Container>
              </ListGroup.Item>
              {props.courses.map((c) => <CourseRow course={c} key={c.code} />)}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function CourseRow(props) {

  const [showDetails, setShowDetails] = useState(false);


  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <ListGroup.Item>
        <Container fluid>
          <Row>
            <Col sm="2">{props.course.code}</Col>
            <Col sm="3">{props.course.name}</Col>
            <Col sm="2">{props.course.credits}</Col>
            <Col sm="2">-</Col>
            <Col sm="2">{props.course.max_students}</Col>
            <Col sm="1">
              <Button onClick={handleClick} variant="none">
                {showDetails ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
              </Button>
            </Col>
          </Row>
          <Row>
            {showDetails ? <RowDetails code={props.course.code} /> : false}
          </Row>
        </Container>
      </ListGroup.Item>
    </>
  )
}

function RowDetails(props) {

  const [incompatibilities, setIncompatibilities] = useState({});
  const [propaedeutic, setPropaedeutic] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);

  const loadDetails = async () => {

    try {
      const incompatibilities = await API.getCourseIncompatibilities(props.code);
      setIncompatibilities(incompatibilities);
      const propaedeutic = await API.getCoursePropaedeutics(props.code);
      setPropaedeutic(propaedeutic);
      setInitialLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  if (initialLoading) loadDetails();

  return (
    <>
      {initialLoading ? <Spinner animation="border" /> :
        <Container fluid className="bg-light">
          <Row className="bg-info p-2 mt-2 rounded" >Incompatible Courses</Row>
          {!incompatibilities.length ? <p className="text-center m-3">No Incompatible Courses</p> :
            <ListGroup>
              {
                incompatibilities.map((c) =>
                  <ListGroup.Item key={c.code}>
                    <Container>
                      <Row>
                        <Col sm="2">{c.code}</Col>
                        <Col sm="4">{c.name}</Col>
                        <Col sm="2">Credits: {c.credits}</Col>
                      </Row>
                    </Container>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          }
          <Row className="bg-info p-2 mt-3 rounded">Preparatory Courses</Row>
          {
            propaedeutic.code == null ? <p className="text-center m-3">No Preparatory Courses</p> :
              <ListGroup>
                <ListGroup.Item key={propaedeutic.code}>
                  <Container>
                    <Row>
                      <Col sm="2">{propaedeutic.code}</Col>
                      <Col sm="4">{propaedeutic.name}</Col>
                      <Col sm="2">Credits: {propaedeutic.credits}</Col>
                    </Row>
                  </Container>
                </ListGroup.Item>
              </ListGroup>
          }
        </Container>
      }
    </>
  )
}

export default Homepage;