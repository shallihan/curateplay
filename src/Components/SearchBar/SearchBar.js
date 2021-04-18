import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm:''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.searchTerm);
    }

    handleTermChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    handleSearchByPressEnter (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.search();
        }
    }



    render() {
        return (
            <div className="SearchBar">
            <input onChange={this.handleTermChange} onKeyDown={this.handleSearchByPressEnter} placeholder="Enter A Song, Album, or Artist" />
            <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;