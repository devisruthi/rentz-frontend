import React from 'react';
import { Route} from 'react-router-dom';
import NavBar from '../components/NavBar';
import CollapseNavBar from '../components/CollapseNavBar';

const LayoutRoute = (props) => {
    return (

        <div>
            <CollapseNavBar/>
            <Route path={props.path} exact={props.exact} component={props.component}
            />      
        </div>
    )
}

export default LayoutRoute