import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { BsEyeFill } from 'react-icons/bs';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCopy } from 'react-icons/ai';
import { IconContext } from 'react-icons';

export class AccessStrategyX509Keys extends Component {
  render() {
    if (!this.props.available) {
      return (
        <Alert variant="secondary">
          To use this certificate you need to know the private key associated
          with it. This information is only available during certificate
          creation, and cannot be retrieved later.
        </Alert>
      );
    }

    // let iconStyle = {
    //   fontSize: '2.5em',
    //   paddingLeft: '8px',
    // };

    let accordianStyle = {
      paddingBottom: '14px',
    };

    // let tooltip = (
    //   <Tooltip id="copied-tooltip" className="in" placement="left">
    //     Copied to clipboard!
    //   </Tooltip>
    // );

    return (
      <div>
        <h3>Client Certificate Keys</h3>
        <p>
          This certificate has a private key and public key associated with it.
          These are needed when using the certificate.
        </p>
        <Alert variant="warning">
          Take a copy of these keys now and securely store them! You cannot
          access them again after you navigate away from this page.
        </Alert>
        <Accordion style={accordianStyle}>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="outline-secondary"
                eventKey="0"
              >
                Show/hide private key
              </Accordion.Toggle>
              <CopyToClipboard text={this.props.privateKey}>
                {/* <OverlayTrigger
                  rootClose={true}
                  trigger="click"
                  overlay={tooltip}
                  placement="left"> */}
                <span className="float-right" style={{ cursor: 'pointer' }}>
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <AiOutlineCopy />
                  </IconContext.Provider>
                </span>
                {/* </OverlayTrigger> */}
              </CopyToClipboard>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <pre>
                  <code>{this.props.privateKey}</code>
                </pre>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="outline-secondary"
                eventKey="0"
              >
                Show/hide public key
              </Accordion.Toggle>
              <CopyToClipboard text={this.props.publicKey}>
                {/* <OverlayTrigger
                  rootClose={true}
                  trigger="click"
                  overlay={tooltip}
                  placement="left"
                > */}
                <span className="float-right" style={{ cursor: 'pointer' }}>
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <AiOutlineCopy />
                  </IconContext.Provider>
                </span>
                {/* </OverlayTrigger> */}
              </CopyToClipboard>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <pre>
                  <code>{this.props.publicKey}</code>
                </pre>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default connect()(AccessStrategyX509Keys);
