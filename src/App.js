import React from 'react';
import Layout from './hoc/Layout/Layout'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';


class App extends React.Component {
    render() {
        return (
          <div >
            <Layout>
              <Switch>
                <Route path="/" component={Dashboard} />
              </Switch>
            </Layout>
            
          </div>
        );
      }
}

export default App;
