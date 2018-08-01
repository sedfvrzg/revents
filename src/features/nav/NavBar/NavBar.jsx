import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedInMenu from "./../Menus/SignedInMenu";
import SignedOutMenu from "./../Menus/SignedOutMenu";
import { openModal } from "../../modals/modalActions";
import { logout } from "../../auth/authActions";

const dispatchActions = {
  openModal,
  logout
};

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item as={Link} to="/" header>
              <img src="/assets/logo.png" alt="logo" />
              Re-vents
            </Menu.Item>
            <Menu.Item as={NavLink} to="/events" name="Events" />
            {authenticated && (
              <Menu.Item as={NavLink} to="/people" name="People" />
            )}
            <Menu.Item as={NavLink} to="/test" name="Test" />
            {authenticated && (
              <Menu.Item>
                <Button
                  floated="right"
                  positive
                  inverted
                  content="Create Event"
                  as={Link}
                  to="/createEvent"
                />
              </Menu.Item>
            )}
            {authenticated ? (
              <SignedInMenu
                currentUser={auth.currentUser}
                signOut={this.handleSignOut}
              />
            ) : (
              <SignedOutMenu
                signIn={this.handleSignIn}
                register={this.handleRegister}
              />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default withRouter(
  connect(
    mapStateToProps,
    dispatchActions
  )(NavBar)
);
