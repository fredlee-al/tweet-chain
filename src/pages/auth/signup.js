import React from "react";
import Tweeter from "../../Images/tweetchain.svg";
import "./signup.css";
import Auth from "../../components/auth/auth";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/action";

class SignupPage extends React.Component {
  state = {
    requestBody: {
      email: "",
      password: "",
    },
  };

  inputChangedHandler = (event) => {
    const updatedFormBody = {
      ...this.state.requestBody,
    };
    updatedFormBody[event.target.name] = event.target.value;
    this.setState({ requestBody: updatedFormBody });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const formdata = this.state.requestBody;
    this.props.onAuth(formdata["email"], formdata["password"]);
  };

  componentDidUpdate() {
    if (this.props.error) {
      setTimeout(this.props.onResetError, 2000);
    }
  }

  render() {
    let errorMessage = <p style={{ color: "red" }}>{this.props.error}</p>;

    return (
      <Auth>
        {this.props.loading ? <Loader /> : null}
        <div className="signupPage">
          <Link to="/">
            <img src={Tweeter} className="tweeterHome" />
          </Link>
          <p>Join us today at Geekathon1.0</p>
          <p>- the exodus</p>
          {errorMessage}
          <form autoComplete="off" onSubmit={this.submitHandler}>
            <i className="material-icons-outlined">email</i>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.inputChangedHandler}
              value={this.state.requestBody.email}
            />
            <i className="material-icons-outlined">lock</i>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.inputChangedHandler}
            />
            <button>Enter!!</button>
          </form>
          <p>
            been here before? <Link to="/login">login now</Link>
          </p>
        </div>
      </Auth>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password, true)),
    onResetError: () => dispatch({ type: "RESET_ERROR" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
