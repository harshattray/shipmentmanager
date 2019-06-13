/**
 * @Author: harsha
 * @Date:   2019-06-12T15:49:44+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-13T19:46:39+05:30
 */

import { Tag } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { Form } from "antd";

export const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => {
      return 1;
    },
    render: id => {
      return (
        <Link className="sid" to={`/detail/${id}`}>
          <Tag style={{ cursor: "pointer" }} color="purple" key={id}>
            {id.toUpperCase()}
          </Tag>
        </Link>
      );
    }
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "30%",
    editable: true,
    key: "name"
  },
  {
    title: "Mode",
    dataIndex: "mode",
    key: "mode"
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    sorter: (a, b) => a.total - b.total
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: status => {
      let color = "orange";
      if (status === "COMPLETED") {
        color = "blue";
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    }
  }
];

export const cargoHeaderStack = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Volume",
    dataIndex: "volume",
    key: "volume"
  }
];

export const ItemView = Form.Item;
