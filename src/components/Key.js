import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Key extends Component {
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
          delayHide="500"
        >
          <code style={{ cursor: 'pointer' }}>
            {this.props.value} <Glyphicon glyph="copy" />
          </code>
        </OverlayTrigger>
      </CopyToClipboard>
    );
  }
}

export default connect()(Key);
