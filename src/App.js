import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

  const list = [
  		{
  			title: 'myReact',
  			url: '//facebook.github.io/react/',
  			author: 'J.Chen',
  			num_comments: 3,
  			points: 4,
  			objectID: 0,
  		},

  		{
  			title: 'myRedux',
  			url: '//github.com/reactjs/redux',
  			author: 'D Abramov, A Clark',
  			num_comments: 2,
  			points: 5,
  			objectID: 1,
  		},
  ];

class App extends Component {
  render() {
    return (
    	<div className = "MyApp">
    	{list.map(function(item){
    		return (
    			<div>
    			<span>
    				<a href={item.url}>{item.title}</a>
    			</span>
    			<span>{item.points}</span>
    			<span>{item.num_comments}</span>
    			<span>{item.author}</span>
    			</div>

    			);
    	})}


    	</div>
    );
  }
}

export default App;
