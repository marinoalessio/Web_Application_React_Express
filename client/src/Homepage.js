import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

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
        <Row className="justify-content-md-center mt-3">
          <Col sm="8">
            <h1>Course List</h1>
            <ListGroup>
              <ListGroup.Item active>
                <Container>
                  <Row>
                    <Col>Code</Col>
                    <Col sm="4">Name</Col>
                    <Col>Credits</Col>
                    <Col>Students</Col>
                    <Col>Propaedeutic</Col>
                    <Col>Incompatible</Col>
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
  return (
    <>
      <ListGroup.Item>
        <Container fluid>
          <Row>
            <Col>{props.course.code}</Col>
            <Col sm="4">{props.course.name}</Col>
            <Col>{props.course.credits}</Col>
            <Col>{props.course.max_students}</Col>
            <Col>{props.course.propaedeutic}</Col>
            <Col>-</Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </>
  )
}

export default Homepage;