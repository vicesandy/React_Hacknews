import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = '${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}';

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

const Search = ({value, onChange, children}) => {
    //Do something

    return (
        <form>
          {children} <input 
            type="text"
            value={value}
            onChange={onChange} />
        </form>
      );

}

const largeColumn = {
  width: '70%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

class Table extends Component {
  render() {
    const {list, pattern, onDismiss} = this.props;
      return (
        <div className="table">
          {list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID} className="table-row">
              <span style={largeColumn}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={midColumn}>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span style={smallColumn}>
                <Button onClick={() => onDismiss(item.objectID)}
                        className="button-inline">
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
      className = '',
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
      result: null,
      searchTerm: DEFAULT_QUERY,
  	};
  }

  setSearchTopStories = this.setSearchTopStories.bind(this);
  fetchSearchTopStories = this.fetchSearchTopStories.bind(this);

  setSearchTopStories(result){
    this.setState({result});
  }

  fetchSearchTopStories(searchTerm){
    fetch('${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}')
    .then(response => response.json)
    .then(result => this.setSearchTopStories(result))
    .catch(e => e);
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
      	<div className = "page">
          <div className = "interactions">
            <Search 
              value={searchTerm}
              onChange={this.onSearchChange} />

            <Table 
              list={list}
              pattern={searchTerm}  
              onDismiss={this.onDismiss} />
      	    </div>
      	</div>
      );
  }
}

export default App;
