import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
  	var helloworld = "First React App";
  	var secondVariable = "the 2nd variable";
  	let thirdVariable = "The thirrd variable";
  	const nonmutatedVariable = "Does not change";



  	thirdVariable = "Just got changed";

    return (
    	<div className = "MyApp">
    		<h2>{helloworld}</h2>
    		<h1>{secondVariable}</h1>
    		<h4>{thirdVariable}</h4>
    		<h1>{nonmutatedVariable}</h1>

    	</div>
    );
  }
}

export default App;
