/**
 * @Author: harsha
 * @Date:   2019-06-12T14:44:10+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-14T02:04:33+05:30
 */

import React, { Fragment, Component } from "react";
import { Table, Input, Form, Tag } from "antd";
import {
  Divider,
  Segment,
  Header,
  Image,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  fetchShipmentData,
  updateShipmentName
} from "../../actions/fetchShipmentActions";
import { columns, ItemView } from "../../utilities/utilities";
import SearchViewComponent from "../SearchViewComponent/SearchViewComponent";

const ContextView = React.createContext();

const RowView = ({ form, index, ...props }) => (
  <ContextView.Provider value={form}>
    <tr {...props} />
  </ContextView.Provider>
);

const EditableFormRow = Form.create()(RowView);

class CellView extends React.Component {
  state = {
    editing: false
  };

  editSwitch = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  triggerSave = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.editSwitch();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <ContextView.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <ItemView>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: "title is required."
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.triggerSave}
                      onBlur={this.triggerSave}
                    />
                  )}
                </ItemView>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  onClick={this.editSwitch}
                >
                  {restProps.children}
                </div>
              );
            }}
          </ContextView.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

class MainViewComponent extends Component {
  componentDidMount() {
    this.props.fetchShipmentData();
  }

  handleSave = row => {
    const { updateShipmentName, shipmentGrid } = this.props;
    const updatedShipmentGrid = [...shipmentGrid];
    const index = updatedShipmentGrid.findIndex(item => {
      return row.id === item.id;
    });
    const item = updatedShipmentGrid[index];
    updatedShipmentGrid.splice(index, 1, {
      ...item,
      ...row
    });
    updateShipmentName(updatedShipmentGrid[index], index);
  };

  render() {
    const { shipmentGrid, isLoading } = this.props;

    const components = {
      body: {
        row: EditableFormRow,
        cell: CellView
      }
    };

    const columnData = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <Fragment>
        <div className="search">
          <SearchViewComponent history={history} />
        </div>
        {isLoading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="huge">Loading</Loader>
            </Dimmer>
          </Segment>
        ) : (
          <Table
            size="medium"
            pagination={{ pageSize: 20 }}
            rowKey={record => record.id}
            history={history}
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={shipmentGrid}
            columns={columnData}
          />
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ shipmentStack }) {
  return {
    shipmentGrid: shipmentStack.shipmentList,
    isLoading: shipmentStack.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchShipmentData, updateShipmentName },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainViewComponent);
