import React from 'react';
import classes from './Login.module.css';
import {  Button, Form, InputGroup} from 'react-bootstrap';
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Auxiliary/Auxiliary'


class Login extends React.Component {
    

    render() {
         

        const spin = this.props.loading ? <Spinner /> : null;
        return (
         <Aux>
             
            {spin}
            <div className={classes.Container}>
                   
                <div className={classes.Login}>
               
                    <h4>Login</h4>
                    <hr></hr>
                <Form >
                   
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="username" value={this.props.email}  onChange={(e) => {this.props.change(e)}} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control  type="password" name="password" placeholder="password" value={this.props.password}  onChange={(e) => {this.props.change(e)}} />
                        </Form.Group>

                        <InputGroup>
                           
                            <InputGroup.Radio aria-label="Radio button for following text input" />
                           
                           <span className={classes.MoveLeft}>Remember Me ?</span> 
                        </InputGroup>

                        <Button variant="primary"  onClick={this.props.login} className={classes.MoveDown}>
                            Login
                         </Button>
                        
                        
                        </Form>
                </div>
            </div>
            </Aux>
        );
    }

}




export default Login;