import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {getAllUsers} from "../../services/userServices"
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {};

  async componentDidMount() {
    let response = await getAllUsers("ALL")
    console.log("get user from db", response)
  }

  render() {
    return (
      <div className="users-container">
        <div className="title">Manage users</div>
        <div className="users-table">
          <table>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>

            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
           
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
