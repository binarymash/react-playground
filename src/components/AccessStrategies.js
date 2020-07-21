import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Glyphicon, Table } from 'react-bootstrap';
import AccessStrategyX509 from './AccessStrategyX509';
import Loading from './Loading';

export class AccessStrategies extends Component {
  handleAddClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'ADD_ACCESS_STRATEGY',
      modalProps: {
        projectId: this.props.projectId
      }
    });
  };

  render() {
    let content = null;
    let length = 0;

    if (this.props.isLoading) {
      content = <Loading />;
    } else if (this.props.strategies) {
      content = (
        <Table striped bordered hover>
          <tbody>
            {this.props.strategies.map(strategy => (
              <AccessStrategyX509 key={strategy.id} strategy={strategy} />
            ))}
          </tbody>
        </Table>
      );
      length = this.props.strategies.length;
    }

    return (
      <section>
        <h2>
          Access <Badge>{length}</Badge>
        </h2>

        <div className="tableToolbar">
          <Button
            className="pull-right"
            bsSize="small"
            bsStyle="success"
            onClick={this.handleAddClick}
          >
            <Glyphicon glyph="plus" /> Add new access
          </Button>
        </div>
        {content}
      </section>
    );
  }
}

export default connect()(AccessStrategies);
