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

  		{
  			title: 'myMobx',
  			url: '//github.com/reactjs/mobx',
  			author:'na',
  			num_comments: 10,
  			points: 15,
  			//Dont use index of item in array because it is not stable, always use self-defined object ID
  			objectID: 2,
  		},
  ];

  const user_list = [
      {
        name: '',
        dawg: '',
        email: '',
        phone: '',
        start: '',  //Start Location of Safe Walk
        end: '',    //End Location of Safe walk
        walk_date: '',
        walk_time: '',
      },
  ];


  class Developer {
  		constructor(firstname, lastname){
  			this.firstname = firstname;
  			this.lastname = lastname;
  		}
  		getName() {
  			return this.firstname + '' + this.lastname
  		}
  }

  const sam = new Developer('Sam', 'Chen');
  console.log(sam.getName);


const userService = {
	getUserName(user){
		return user.firstname + '' + user.lastname;
	},
};

const user = {
  firstname: 'Sam',
  lastname: 'Chen',
};

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Search extends Component {
  render() {
    const {value, onChange, children} = this.props;

    return (
        <form>
          {children} <input 
            type="text"
            value={value}
            onChange={onChange} />
        </form>
      );
  }
}

class Table extends Component {
  render() {
    const {list, pattern, onDismiss} = this.props;
      return (
        <div>
          {list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button onClick={() => onDismiss(item.objectID)}>
                  DisMiss
                </Button>
              </span>
            </div>
            )}
        </div>
      );
    }
}

class Button extends Component {
  render() {
    const {
      onClick,
      className,
      children,
    } = this.props;

    return (
        <button
          onClick={onClick}
          className={className}
          type="button" >
          {children}
        </button>
      );
  }
}


//Controlled & unControlled componenet
class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		list: list,
      searchTerm: '',
  	};
  }

  onDismiss = (id) => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    
    this.setState({ 
      list: updatedList 
    });
  }

  onSearchChange = this.onSearchChange.bind(this);

  onSearchChange(event){
    this.setState({
      searchTerm: event.target.value
    });
  }

  //JS callback function is required for event handlers,
  //The internal component state is the single source of truth for the input field
  render() {
    const {searchTerm, list} = this.state;
    return (
    	<div className = "MyApp">
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange} />

        <Table 
          list={list}
          pattern={searchTerm}  
          onDismiss={this.onDismiss} />
  	    	
    	</div>
    );
  }
}

export default App;
