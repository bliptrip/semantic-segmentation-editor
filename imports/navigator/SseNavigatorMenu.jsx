import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MuiMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Menu} from 'mdi-material-ui';

class SseNavigatorMenu extends React.Component {
    constructor(){
        super();
        this.labels = ["All images", "Xena Images to Annotate", "Bingbing Images to Annotate", "Annotated Images", "Predicted Images", "Unmatched", "Matched"];
    }
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        switch (event.target.textContent){
            case this.labels[0]: this.props.history.push("/"); break;
            case this.labels[1]: this.props.history.push("/tags/toannotate"); break;
            case this.labels[2]: this.props.history.push("/tags/bbtoannotate"); break;
            case this.labels[3]: this.props.history.push("/tags/annotate"); break;
            case this.labels[4]: this.props.history.push("/tags/predicted"); break;
            case this.labels[5]: this.props.history.push("/tags/unmatched"); break;
            case this.labels[6]: this.props.history.push("/tags/matched"); break;
        }
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <IconButton color="inherit" aria-label="Menu"
                            onClick={this.handleClick}>
                    <Menu />
                </IconButton>
                <MuiMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>{this.labels[0]}</MenuItem>
                    <MenuItem onClick={this.handleClose}>{this.labels[1]}</MenuItem>
                    <MenuItem onClick={this.handleClose}>{this.labels[2]}</MenuItem>
                    <MenuItem onClick={this.handleClose}>{this.labels[3]}</MenuItem>
                    <MenuItem onClick={this.handleClose}>{this.labels[4]}</MenuItem>
                    <MenuItem onClick={this.handleClose}>{this.labels[5]}</MenuItem>
                    <MenuItem onClick={this.handleClose}>{this.labels[6]}</MenuItem>
                </MuiMenu>
            </div>
        );
    }
}

export default SseNavigatorMenu;
