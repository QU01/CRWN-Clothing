import {Route, Switch, Redirect } from "react-router-dom";
import React from 'react';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout'


import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user.actions'

import {Container} from 'react-bootstrap';

import {auth, createUserProfileDocument} from './firebase.utils';


class App extends React.Component {

  


  unsuscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props;


    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(userAuth);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  render() {

    return(
    <div className="app">
      <Header/>
      <Container>
      <Switch>

        <Route exact path="/" component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />

      </Switch>
      </Container>
    </div>
    );
  };

};


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({

  setCurrentUser: user => dispatch(setCurrentUser(user))


})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);