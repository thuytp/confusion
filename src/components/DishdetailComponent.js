import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Row,
  Col,
} from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleForm() {
    this.setState({ isFormOpen: !this.state.isFormOpen });
  }

  handleSubmit(event) {
    this.toggleForm();
    event.preventDefault();
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleForm}>
          <span className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm}>
          <ModalHeader>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={10}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    classname="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={2}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    classname="form-control"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Col>
                  <Control.textarea
                    model=".textarea"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  ></Control.textarea>
                </Col>
              </Row>
              <Button type="submit" value="submit" className="bg-primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({ dish }) {
  return (
    <Card className="h-100">
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardTitle>{dish.name}</CardTitle>
      <CardText>{dish.description}</CardText>
    </Card>
  );
}

function RenderComments({ dish }) {
  const comments = dish.map((content) => {
    const date = new Date(content.date);
    return (
      <div key={content.id} className="pt-3">
        <div>{content.comment}</div>
        <div>
          --{content.author}, {dateFormat(date, "mmm dS, yyyy")}
        </div>
      </div>
    );
  });
  return (
    <Card className="h-100 border-0">
      <h4>Comments</h4>
      <CardText>{comments}</CardText>
      <CommentForm />
    </Card>
  );
}

function DishDetail(props) {
  if (props.dish) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments dish={props.comments} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
}

export default DishDetail;
