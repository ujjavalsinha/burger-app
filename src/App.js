import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import  {Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import * as actions from './store/actions/index'
import { connect } from 'react-redux'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {
  state = {  }
  componentDidMount(){
    this.props.onCheckAuthState()
  }
  render() { 
    return ( 
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/logout' component={Logout}/>
          </Switch>
          
        </Layout>
      </div>
    )
  }
}   

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState : () => dispatch(actions.checkAuthState())
  }
}
export default connect(null,mapDispatchToProps)(App); 


