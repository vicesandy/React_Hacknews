import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = '';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = '${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}';

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
      searchTerm: '',
      results: null,
      searchTerm: DEFAULT_QUERY,
  	};

  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
  this.onSearchSubmit = this.onSearchSubmit.bind(this);
  this.onDismiss = this.onDismiss.bind();
  }

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

  onSearchSubmit(){
  	const { searchTerm } = this.state;
  	this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event){
    this.setState({
      searchTerm: event.target.value
    });
  }

  componentDidMount(){
  	const {searchTerm} = this.state;
  	this.fetchSearchTopStories(searchTerm);
  }

  //JS callback function is required for event handlers,
  //The internal component state is the single source of truth for the input field
  render() {
    const { searchTerm, result } = this.state;
    if(!result) { return null; }

    return (
      	<div className = "page">
          <div className = "interactions">
            <Search 
              value={searchTerm}
              onChange={this.onSearchChange} 
              onSubmit={this.onSearchSubmit}>
             </Search> 

            <Table 
              list={result.hits}
              pattern={searchTerm}  
              onDismiss={this.onDismiss} />
      	    </div>
      	</div>
      );
  }
}

export default App;
