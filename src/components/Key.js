import React, { Component } from 'react';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BsClipboard } from 'react-icons/bs';

export class Key extends Component {
  render() {
    if (!this.props.value) {
      return null;
    }

    let tooltip = (
      <Tooltip id="copied-tooltip" className="in" placement="right">
        Copied to clipboard!
      </Tooltip>
    );

    return (
      <CopyToClipboard text={this.props.value}>
        <OverlayTrigger
          rootClose={true}
          trigger="click"
          overlay={tooltip}
          placement="right"
        >
          <code style={{ cursor: 'pointer' }}>
            {this.props.value} <BsClipboard />
          </code>
        </OverlayTrigger>
      </CopyToClipboard>
    );
  }
}

export default connect()(Key);
