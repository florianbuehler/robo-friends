import React from 'react';
import Card from './Card';
import 'tachyons';

const CardList = ({ robots }) => {
  return (
    <ul className="list flex flex-wrap pa0 justify-center">
      {robots.map((robot) => (
        <li key={robot.id}>
          <Card id={robot.id} name={robot.name} email={robot.email} />
        </li>
      ))}
    </ul>
  );
};

export default CardList;
