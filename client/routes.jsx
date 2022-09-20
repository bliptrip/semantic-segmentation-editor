import React from 'react';
import {Route, Router, Redirect} from 'react-router';
import {createBrowserHistory} from 'history';
import SseEditorApp from "../imports/editor/SseEditorApp";
import SseNavigatorApp from "../imports/navigator/SseNavigatorApp";
import SseAllAnnotated from "../imports/navigator/SseAllAnnotated";
import SseAllPredicted from "../imports/navigator/SseAllPredicted";
import SseAllTags from "../imports/navigator/SseAllTags";

const browserHistory = createBrowserHistory();
export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" render={()=>(<Redirect to="/browse/0/20/"/>)}/>
            <Route path="/edit/:path" component={SseEditorApp}/>
            <Route exact path="/edit/" render={()=>(<Redirect to="/browse/0/20/"/>)}/>
            <Route exact path="/edit" render={()=>(<Redirect to="/browse/0/20/"/>)}/>
            <Route path="/browse/:fromIndex/:pageLength/:path?" component={SseNavigatorApp}/>
            <Route path="/annotated" component={SseAllAnnotated}/>
            <Route path="/predicted" component={SseAllPredicted}/>
            <Route path="/tags/:tag" component={SseAllTags}/>
        </div>
    </Router>
);
