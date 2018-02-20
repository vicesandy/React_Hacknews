import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const DEFAULT_QUERY = '';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_HPP = '100';
const PARAM_HPP = 'hitsPerPage=';

const Loading = () =>
	<div>loading ...</div>


/* 
const Search = ({value, onChange, onSubmit, children}) => 
        <form onSubmit={onSubmit}>
          <input 
            type="text"
            value={value}
            onChange={onChange} />

           <button type="submit">
           	{children}
           </button>
        </form>
*/


class Search extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		if(this.input){
			this.input.focus();
		}
	}

	render() {
		const {
			value,
			onChange,
			onSubmit,
			children
		} = this.props;
	
	return (
		<form onSubmit={onSubmit}>
			<input 
				type="text"
				value={value}
				onChange={onChange}
				ref={(node) => { this.input = node; }}
			/>

			<button type="submit">
				{children}
			</button>
		</form>
		);
	}
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


const Table = ({list, onDismiss}) =>
        <div className="table">
          {list.map(item =>
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
  _isMounted = false;

  constructor(props){
  	super(props);
  	this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
  	};

  this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
  this.onSearchSubmit = this.onSearchSubmit.bind(this);
  this.onDismiss = this.onDismiss.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
  	return !this.state.results[searchTerm];
  }

  setSearchTopStories(result){
  	const { hits, page } = result;
  	const { searchKey, results } = this.state;

  	const oldHits = results && results[searchKey]
  		? results[searchKey].hits
  		: [];
  	const updatedHits = [
  		...oldHits,
  		...hits
  	];
    this.setState({
    	results: {
    		...results,
    		[searchKey]: {hits: updatedHits, page}
    	},
    	isLoading: false
    });
  }

  fetchSearchTopStories(searchTerm, page=0) {
  	this.setState({ isLoading: true });

  	axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
  		.then(result => this._isMounted && this.setSearchTopStories(result.data))
  		.catch(error => this._isMounted && this.setState({ error }));
  }

  onDismiss(id) {
  	const { searchKey, results } = this.state;
  	const { hits, page } = results[searchKey];

  	const isNotId = item => item.objectID !== id;
  	const updatedHits = hits.filter(isNotId);
  	this.setState({
  		results: {
  		...results,
  		[searchKey]: { hits:updatedHits, page }
  		}
  	});
  }

  onSearchSubmit(event){
  	const { searchTerm } = this.state;
  	this.setState({ searchKey: searchTerm });
  	if(this.fetchSearchTopStories(searchTerm)) {
  		this.fetchSearchTopStories(searchTerm);
  	}
  	event.preventDefault();
  }

  onSearchChange(event){
    this.setState({
      searchTerm: event.target.value
    });
  }

  componentDidMount(){
  	this._isMounted = true;
  	const { searchTerm } = this.state;
  	this.setState({ searchKey: searchTerm });
  	this.fetchSearchTopStories(searchTerm);
  }

  componenetWillUnmount(){
  	this._isMounted = false;
  }

  //JS callback function is required for event handlers,
  //The internal component state is the single source of truth for the input field
  render() {
    const {
    	searchTerm,
    	results,
    	searchKey,
    	error,
    	isLoading
    } = this.state;

    const page = (
    	results &&
    	results[searchKey] &&
    	results[searchKey].page
    	) || 0;

    const list = (
    	results &&
    	results[searchKey] &&
    	results[searchKey].hits
    	) || [];

    if(error) {
    	return <p>Error</p>
    }

    return (
      	<div className = "page">
          <div className = "interactions">
            <Search 
              value={searchTerm}
              onChange={this.onSearchChange} 
              onSubmit={this.onSearchSubmit}>
              Search
             </Search>  
	             <Table 
	              list={list}
	              onDismiss={this.onDismiss} />
      	   

      	     <div className="interactions">
      	     { isLoading 
      	       ? <Loading />
      	       : <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
      	     		More
      	     	</Button>
      	     }	
      	     </div>
      	   </div>
      	</div>
      );
  }
}

export default App;
