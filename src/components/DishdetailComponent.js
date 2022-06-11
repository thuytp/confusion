import React from "react";
import { Card, CardImg, CardText, CardTitle } from "reactstrap";
import dateFormat from "dateformat";

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
  const comments = dish.comments.map((content) => {
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
    </Card>
  );
}

function DishDetail(props) {
  if (props.dish) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments dish={props.dish} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
}

export default DishDetail;
