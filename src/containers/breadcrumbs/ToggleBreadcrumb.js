import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getToggleName} from '../../store/Project';

class ToggleBreadcrumb extends Component {
    render(){
        return(
            <span>{this.props.name}</span>
        );
    };
}

// find the user in the store with the `id` from the route
const mapStateToProps = (state, props) => ({
  name: getToggleName(state, props.match.params.id, props.match.params.toggleKey),
});
 
export default connect(mapStateToProps)(ToggleBreadcrumb);