import React from 'react';
import TextField from '@material-ui/core/TextField';
import SseMsg from "../../common/SseMsg";

export default class SseNotes extends React.Component {
    constructor() {
        super();
        SseMsg.register(this);
        this.state = {};

        this.state.notes = "";
    };

    componentDidMount() {
        this.onMsg("currentSample", (arg) => {
            this.currentSample = arg.data;
            this.setState({notes: this.currentSample.notes || ""});
        });
        this.retriggerMsg("currentSample");
    }

    componentWillUnmount(){
        SseMsg.unregister(this);
    }

    handleChange(event) {
        this.setState({notes: event.target.value});
    };

    handleSubmit() {
        this.currentSample.notes = this.state.notes;
        this.sendMsg("notesChanged");
    };

    render() {
        return (
            <div>
                <h1>Notes</h1>
                <form className="hflex flex-align-items-center vflex" noValidate autoComplete="off">
                    <div>
                        <TextField
                            multiline
                            rows="6"
                            value={this.state.notes}
                            variant="outlined"
                            onChange={this.handleChange.bind(this)} 
                        />
                    </div>
                </form>
                <button className="sse-button" onClick={this.handleSubmit.bind(this)}>Save Notes</button>
            </div>
        );
    }
}
