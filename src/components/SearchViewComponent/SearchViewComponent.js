/**
 * @Author: harsha
 * @Date:   2019-06-13T20:29:51+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-14T02:16:07+05:30
 */

import { AutoComplete } from "antd";
import React, { Fragment, Component } from "react";
import Fuse from "fuse.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { setSearchResults } from "../../actions/fetchShipmentActions";

class SearchViewComponent extends Component {
  onSelectSearch = value => {
    const { history } = this.props;
    history.push(`/detail/${value}`);
  };

  updateSearch = value => {
    const { shipmentGrid, setSearchResults } = this.props;
    const options = {
      shouldSort: true,
      threshold: 0.3,
      maxPatternLength: 7,
      minMatchCharLength: 1,
      keys: ["id"]
    };
    const fuse = new Fuse(shipmentGrid, options);
    const result = fuse.search(value);
    const resultsUpdated = result.slice(0, 5).map(val => {
      return val.id;
    });
    setSearchResults(resultsUpdated);
  };

  render() {
    const { searchResults, shipmentGrid } = this.props;
    return (
      <Fragment>
        <span className="searchLabel">Search:</span>
        <AutoComplete
          dataSource={searchResults}
          onSelect={this.onSelectSearch}
          onSearch={this.updateSearch}
          placeholder="S1001"
        />
      </Fragment>
    );
  }
}

function mapStateToProps({ shipmentStack }) {
  return {
    shipmentGrid: shipmentStack.shipmentList,
    searchResults: shipmentStack.searchResultsStack
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSearchResults }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchViewComponent)
);
