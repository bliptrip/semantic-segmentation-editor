import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

class SseNavigatorSearch extends React.Component {
    constructor() {
        super();
    }

    state = {
        tag: null,
    };

    handleClick = event => {
        this.props.history.push("/tags/"+this.state.tag);
    }

    handleKey = event => {
        if ( event.key == 'Enter' ) {
            this.handleClick();
        }
    }

    handleChange = event => {
        this.setState({tag: event.target.value});
    }

    render() {
        return (
        <div>
            <IconButton onClick={this.handleClick} color="inherit" aria-label="Search">
                <SearchIcon />
            </IconButton>
            <Input
                placeholder="Tag Search"
                inputProps={{ 'aria-label': 'Search' }}
                onChange={this.handleChange}
                onKeyPress={this.handleKey}
            />
        </div>
        );
    }
}

export default SseNavigatorSearch;
