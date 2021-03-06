import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Courses from './Courses';
import Schedule from './Schedule';
import TA from './TA';
import Syllabus from './Syllabus';
import Assignments from './Assignments'
import ToolBar from '../shared/ToolbarView';
import ViewDoc from '../framework/ViewDoc';

import { HashRouter, Route } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path='/' component={Login} />
                    <Route path="/SignUp" component={SignUp} />
                    <Route path="/ToolBar" component={ToolBar}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/Courses" component={Courses}/>
                    <Route path="/Schedule" component={Schedule}/>
                    <Route path="/TA" component={TA}/>
                    <Route path="/Syllabus" component={Syllabus}/>
                    <Route path="/Assignments" component={Assignments}/>
                    <Route path="/ViewDoc" component={ViewDoc}/>
                </div>
            </HashRouter>
        );
    }
}

export default App;