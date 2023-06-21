import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  componentDidMount() {
    let { currentUser } = this.props;
    if (currentUser && !_.isEmpty(currentUser)) {
      this.setState({
        id: currentUser.id,
        email: currentUser.email,
        password: "currentUser.password",
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (e, id) => {
    // this.state.email === this.state[id]
    // console.log(e.target.value, id);
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        className="modal-user-container"
        size="lg"
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit a user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "email");
                }}
                value={this.state.email}
                disabled
              ></input>
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "password");
                }}
                value={this.state.password}
                disabled
              ></input>
            </div>
            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "firstName");
                }}
                value={this.state.firstName}
              ></input>
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "lastName");
                }}
                value={this.state.lastName}
              ></input>
            </div>
            <div className="input-container">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleOnChangeInput(e, "address");
                }}
                value={this.state.address}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Sava changes
          </Button>{" "}
          <Button onClick={() => this.toggle()} color="secondary">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
