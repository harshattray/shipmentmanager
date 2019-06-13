/**
 * @Author: harsha
 * @Date:   2019-06-12T14:45:24+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-13T19:25:30+05:30
 */

import React, { Fragment, Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Card, Icon, Feed, Header, Image } from "semantic-ui-react";
import { shipmentDetailFetch } from "../../actions/fetchShipmentActions";
import DetailViewStyles from "./DetailViewStyles";
import { Tag, Table } from "antd";
import { cargoHeaderStack } from "../../utilities/utilities";
import { Link } from "react-router-dom";

class DetailViewComponent extends Component {
  componentDidMount() {
    const { match, shipmentDetailFetch } = this.props;
    shipmentDetailFetch(match.params.id);
  }
  render() {
    const { detailGrid, isFetching } = this.props;
    return (
      <Fragment>
        {isFetching ? (
          "loading..."
        ) : (
          <DetailViewStyles>
            <div className="list-view">
              <Link to="/">
                <span className="Branch-title">Go back</span>
              </Link>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{detailGrid.name}</Card.Header>
                  <Card.Meta>
                    <Icon name="arrow circle right" color="red" />
                    <Tag color="orange">Status: {detailGrid.status}</Tag>{" "}
                  </Card.Meta>
                  <Card.Meta>
                    <Icon name="bullseye" color="yellow" />
                    ID: {detailGrid.id}
                  </Card.Meta>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label />
                      <Feed.Content>
                        <Feed.Summary>
                          <Icon name="globe" color="green" />
                          Origin: {detailGrid.origin}
                        </Feed.Summary>
                        <Feed.Summary>
                          <Icon name="plane" color="blue" />
                          Destination: {detailGrid.destination}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label />
                      <Feed.Content>
                        <Feed.Summary>
                          <Icon name="certificate" color="yellow" />
                          UserID: {detailGrid.userId}
                        </Feed.Summary>
                        <Feed.Summary>
                          <CargoGrid cargo={detailGrid.cargo} />
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
                <Card.Content extra>
                  <Card.Meta>
                    <Icon name="tasks" color="blue" />
                    Type : {detailGrid.type}
                    <Icon name="dolly" color="red" />
                    Mode : {detailGrid.mode}
                  </Card.Meta>
                  <Card.Meta>
                    <Icon name="calculator" color="green" />
                    Total : {detailGrid.total}
                  </Card.Meta>
                </Card.Content>
              </Card>
            </div>
          </DetailViewStyles>
        )}
      </Fragment>
    );
  }
}

const CargoGrid = ({ cargo }) => {
  return (
    <Table
      pagination={false}
      size="small"
      dataSource={cargo}
      rowKey={cargo => cargo.description}
      columns={cargoHeaderStack}
    />
  );
};

function mapStateToProps({ shipmentStack }) {
  console.log(shipmentStack, "details");
  return {
    detailGrid: shipmentStack.shipmentDetails,
    isFetching: shipmentStack.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ shipmentDetailFetch }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailViewComponent);
