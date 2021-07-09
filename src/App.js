import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import SearchBox from './components/SearchBox';
import CardList from './components/CardList';
import { requestRobots, setSearchField } from './actions';

// styles
import './App.css';
import 'tachyons';

const mapStateToProps = (state) => ({
  searchField: state.searchRobots.searchField,
  robots: state.requestRobots.robots,
  isPending: state.requestRobots.isPending,
  error: state.requestRobots.error
});

const mapDispatchToProps = (dispatch) => ({
  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots())
});

const App = (props) => {
  const { searchField, onSearchChange, robots, isPending, onRequestRobots } = props;

  useEffect(() => {
    onRequestRobots();
  }, []);

  const filteredRobots = robots.filter((robot) => robot.name.toLowerCase().includes(searchField.toLowerCase()));

  if (isPending) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
