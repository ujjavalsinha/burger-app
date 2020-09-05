import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
        Burger App
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    )
  }
}
 
export default App;


