import React from "react";
import './search-panel.css';

export default class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
        }
    }

    onSearchItem = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchItem(term)
    };

    render() {
        return (
            <input type='text'
                   className='form-control search-input'
                   onChange={this.onSearchItem}
                   placeholder='search'
                   value={this.state.term}
            />
        )
    }
}
