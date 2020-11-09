import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const List = ({ movies }) => (
  <div>
    <ListGroup>
      {movies.map((item) => (
        <ListGroupItem key={item.id}>
          <img
            src={item.thumbnail}
            style={{ width: 50, height: 50 }}
            alt="pic"
          />{" "}
          <div>
            {" "}
            {item.name} {item.genre} {item.language} -> {item.rating}
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default List;
