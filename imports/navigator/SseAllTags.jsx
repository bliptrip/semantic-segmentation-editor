import React from 'react';

import {darkBaseTheme, MuiThemeProvider} from '@material-ui/core/styles';

import SseNavigatorToolbar from "./SseNavigatorToolbar";

import {CardText, CardTitle} from '@material-ui/core';

import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import MapSet from "../common/MapSet";
import SseImageThumbnail from "./SseImageThumbnail";
import SseTheme from "../common/SseTheme";
import SseGlobals from "../common/SseGlobals";

class SseAllTags extends React.Component {
    constructor() {
        super();
        this.increment = 30;
        this.state = {max: this.increment, selection: {}, tag: '', nextPage: true};

    }

    serverCall(props) {
        const params = props.match.params;
        this.setState({tag: params.tag});
    }

    componentWillReceiveProps(props) {
        this.serverCall(props);
    }

    componentDidMount() {
        this.serverCall(this.props);
    }

    render() {
        let count = 0;
        return (<MuiThemeProvider theme={new SseTheme().theme}>
                <div className="w100">
                    <SseNavigatorToolbar history={this.props.history}/>
                    <div>
                        {Array.from(this.props.grouped.getMap()).map((folder) => {
                            var filtered_images = Array.from(folder[1]).filter(image => image.tags.includes(this.state.tag));
                            return (filtered_images.length > 0 && count < this.state.max ) ? (
                                <div key={folder[0]}>
                                    <div>{folder[0]}</div>
                                    <div className="hflex wrap w100 h100">
                                        {Array.from(folder[1]).filter(image => image.tags.includes(this.state.tag))
                                            .map(image =>
                                                    (
                                                        <div
                                                            onDoubleClick={() => {
                                                                this.props.history.push("/edit" + image.url)
                                                            }} key={SseGlobals.getFileUrl(image.url)}>
                                                            <SseImageThumbnail image={image} annotated={true}/>
                                                        </div>
                                                    )
                                                )
                                        }
                                    </div>
                                </div>) : null
                        })}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe("sse-labeled-images");
    const all = SseSamples.find({file: {"$exists": true}}).fetch();
    const grouped = new MapSet();
    all.forEach(im =>{grouped.map(im.folder, im)});
    const imagesCount = all.length;
    return {grouped,imagesCount};
})(SseAllTags);
