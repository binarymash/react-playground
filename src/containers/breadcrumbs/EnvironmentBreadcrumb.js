import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getEnvironmentName} from '../../store/Project';

class EnvironmentBreadcrumb extends Component {
    render(){
        return(
            <span>{this.props.name}</span>
        );
    };
}

// find the user in the store with the `id` from the route
const mapStateToProps = (state, props) => ({
  name: getEnvironmentName(state, props.match.params.id, props.match.params.environmentKey),
});
 
export default connect(mapStateToProps)(EnvironmentBreadcrumb);