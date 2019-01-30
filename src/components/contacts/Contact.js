import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  onShowClick = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };
  render() {
    const { id, name, email, phone, website } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3 ">
              <h5>
                {name}
                {""}
                <i
                  className="fas fa-sort-down m-1"
                  style={{ cursor: "pointer" }}
                  onClick={this.onShowClick}
                />
                <i
                  className="fas fa-trash-alt"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h5>
              {showContactInfo ? (
                <ul className="list-group ">
                  <li className="list-group-item">
                    <i className="fas fa-envelope" style={{ color: "red" }} /> :{" "}
                    {email}
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-phone" style={{ color: "red" }} />:{" "}
                    {phone}
                  </li>
                  <li className="list-group-item">
                    <i className="fas fa-globe" style={{ color: "red" }} />:{" "}
                    {website}
                  </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
