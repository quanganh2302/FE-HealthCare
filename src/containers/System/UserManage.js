import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userServices";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  state = {};

  async componentDidMount() {
    this.getAllUserFromReact();
  }
  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      console.log(response);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        console.log(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
      }
      await this.getAllUserFromReact();
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}

        <div className="title">Manage users</div>
        <div className="my-3">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus pe-2"></i>
            Add new user
          </button>
        </div>
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                          className="btn-delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
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
