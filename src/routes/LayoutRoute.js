import React from 'react';
import { Route} from 'react-router-dom';
import NavBar from '../components/NavBar';

const LayoutRoute = (props) => {
    return (

        <div>
            <NavBar/>
            <Route path={props.path} exact={props.exact} component={props.component}
            />      
        </div>
    )
}

export default LayoutRoute