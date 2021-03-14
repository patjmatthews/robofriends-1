import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

function App() {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: [],
  //     searchfield: ''
  //   }
  // }

  const [robots, setRobots] = useState([]) // robots is now the state while setRobots is the function that changes the state
  const [searchfield, setSearchfield] = useState('')

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response=> response.json())
  //     .then(users => {this.setState({ robots: users})});
  // }

  useEffect(() => { // instead of lifestyle hooks
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { setRobots(users) });
  },[]) // inside the brackets use a state if that state is changing. In this case, don't use robots as the robots state changes within the function and that would cause an infinite loop

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })
  return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
}

export default App;