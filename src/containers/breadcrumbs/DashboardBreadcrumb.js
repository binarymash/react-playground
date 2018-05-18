import React, {Component} from 'react';
import { connect } from 'react-redux';

class DashboardBreadcrumb extends Component {
 
    render(){
        return(
            <span>Dashboard</span>
        );
    };

}
 
export default connect()(DashboardBreadcrumb);