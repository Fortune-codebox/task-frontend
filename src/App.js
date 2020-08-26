import React from 'react';
import Layout from './hoc/Layout/Layout'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect,withRouter } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './containers/Login/Login';
import axios from './axios-tasks';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authLoading: false,
      isAuth: false,
      loginDetails: {
        email : '',
        password : '',
      },
      token: null,
      user: {}
  }
  this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
     const token = localStorage.getItem('token');
     if(token) {
       this.setState({isAuth: true})
     } else {
      this.setState({isAuth: false})
     }
  }

  
  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };


getDetails = (token) => {
    axios.post('/details', token, {
      headers: {
        'Authorization' : 'Bearer ' + token,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept' : 'application/json'
      }
    })
    .then(data => {
      console.log(data)
        this.setState({authLoading: false, isAuth: true, user: data.data.success})
        localStorage.setItem('user', JSON.stringify(data.data.success))
       
    })
    .catch(err => {
        console.log(err)
    })
}


loginHandler = (event) => {
   event.preventDefault();
   this.setState({authLoading: true})
   const data = {...this.state.loginDetails};
   axios.post('/login', data)
   .then( res => {
     const token = res.data.data.token
     localStorage.setItem('token', token)
      this.setState({token: token});
      this.getDetails(token);
      this.props.history.push('/dashboard')

   })
   .catch(err => console.log(err))

}

handleChange(e) {
  let user = this.state.loginDetails;
  user[e.target.name] = e.target.value
  this.setState({loginDetails : {...user}});
 
  
}

    render() {

      let routes = (
        <Route path="/"  render={props => (
          <Login
          {...props}
          change={this.handleChange}
          login={this.loginHandler}
          email={this.state.loginDetails.email}
          password={this.state.loginDetails.password}
          loading={this.state.authLoading}
          isAuth={this.state.isAuth}
        />
        )} />
      )

      if (this.state.isAuth) {
        routes = (
          <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to="/"  />
        </Switch>
        )
      }
        return (
          <div >
            <Layout logout={this.logoutHandler} isAuth={this.state.isAuth} user={this.state.user}>
               {routes}
            </Layout>
            
          </div>
        );
      }
}

export default withRouter(App);
