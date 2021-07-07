import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import SearchBox from './components/SearchBox';
import CardList from './components/CardList';
import Scroll from './components/Scroll';
import { setSearchField } from './actions';

// styles
import './App.css'
import 'tachyons';

const mapStateToProps = (state) => ({
  searchField: state.searchField
})

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (event) => dispatch(setSearchField(event.target.value))
})

const App = (props) => {
  const [robots, setRobots] = useState([]);
  const { searchField, onSearchChange } = props
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await res.json()
      
      setRobots(users)
    }
    
    fetchData()
  }, [])

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
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
