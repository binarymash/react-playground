import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/index';
import { connect } from 'react-redux';
import { ListGroupItem } from 'react-bootstrap';
import Switch from 'react-bootstrap-switch';
import '../components/react-bootstrap-switch.css';
import { Link } from 'react-router-dom';

class ToggleState extends Component {

  render() {
    return(
      <ListGroupItem>
        <Link to={`/projects/${this.props.projectId}/toggles/${this.props.toggle.key}`}>{this.props.toggle.name}</Link>
        <span className='pull-right'>  
          <Switch bsSize='mini' onColor='success' offColor='danger' animate={false} value={this.props.toggle.value} onChange={(el, state) => this.handleSwitch(el, state)}/>
        </span>
      </ListGroupItem>
    );
  }
  
  handleSwitch = (elem, state) => {
    this.props.setToggleValue(this.props.projectId, this.props.environmentKey, this.props.toggle.key, this.props.toggle.version, state);
  }  
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(ToggleState);
