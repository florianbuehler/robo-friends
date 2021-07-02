import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import CardList from './components/CardList';
import Scroll from './components/Scroll'

// styles
import './App.css'
import 'tachyons';

export default function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await res.json()
      
      setRobots(users)
    }
    
    fetchData()
  }, [])
  
  const onSearchChange = event => {
    setSearchField(event.target.value);
  };

  const filteredRobots = robots.filter(robot =>
    robot.name.toLowerCase().includes(searchField.toLowerCase())
  );

  if (!robots.length) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}
