import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import AccessStrategyX509 from './AccessStrategyX509';
import Loading from './Loading';
import { BsPlus } from 'react-icons/bs';

export class AccessStrategies extends Component {
  handleAddClick = () => {
    this.props.dispatch({
      type: 'SHOW_MODAL',
      modalType: 'ADD_ACCESS_STRATEGY',
      modalProps: {
        projectId: this.props.projectId,
      },
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
            {this.props.strategies.map((strategy) => (
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
          Access <Badge variant="light">{length}</Badge>
        </h2>

        <div className="tableToolbar">
          <Button
            className="float-right"
            size="sm"
            variant="success"
            onClick={this.handleAddClick}
          >
            <BsPlus /> Add new X.509 certificate
          </Button>
        </div>
        {content}
      </section>
    );
  }
}

export default connect()(AccessStrategies);
