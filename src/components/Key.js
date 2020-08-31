import React, { Component } from 'react';
import { connect } from 'react-redux';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCopy } from 'react-icons/ai';
import { IconContext } from 'react-icons';

export class Key extends Component {
  render() {
    if (!this.props.value) {
      return null;
    }

    // let tooltip = (
    //   <Tooltip id="copied-tooltip" className="in" placement="right">
    //     Copied to clipboard!
    //   </Tooltip>
    // );

    return (
      <CopyToClipboard
        text={this.props.value}
        onCopy={() => console.info('copied!')}
      >
        {/* <OverlayTrigger
          rootClose={true}
          trigger="click"
          overlay={tooltip}
          placement="right"
        > */}
        <span style={{ cursor: 'pointer' }}>
          <code className="key">{this.props.value}</code>
          <IconContext.Provider
            value={{ style: { paddingLeft: '10px' }, size: '1.5em' }}
          >
            <AiOutlineCopy />
          </IconContext.Provider>
        </span>
        {/* </OverlayTrigger> */}
      </CopyToClipboard>
    );
  }
}

export default connect()(Key);
