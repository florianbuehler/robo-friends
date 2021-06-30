import React from 'react';
import { robots as defaultRobots } from './robots';
import SearchBox from './components/SearchBox';
import CardList from './components/CardList';

// styles
import './App.css'
import 'tachyons';

export default function App() {
  const [robots, setRobots] = React.useState(defaultRobots);
  const [searchField, setSearchField] = React.useState('');

  const onSearchChange = event => {
    setSearchField(event.target.value);
  };

  const filteredRobots = robots.filter(robot =>
    robot.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <CardList robots={filteredRobots} />
    </div>
  );
}
