import React from 'react';
// import Logo from '../../Logo/Logo'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import {Dropdown} from 'react-bootstrap';



class Toolbar extends React.Component{
    

    render() {
        
    const auth = this.props.isAuth ?  <Dropdown>
                                    <Dropdown.Toggle variant="transparent" id="dropdown-basic" style={{color: 'white', paddingTop: '18px'}}>
                                        {this.props.user} 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {this.props.logout()} }>Logout</Dropdown.Item>
                                        {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}
                                    </Dropdown.Menu>
                                 </Dropdown> : '';
    return (
        <header className={classes.Toolbar}>
        <DrawerToggle toggled={this.props.toggle} />
         {/* <Logo height="80%" />   */}
        <nav className={classes.DesktopOnly}>
           <NavigationItems />
        </nav>
        
        
        <nav className={classes.DesktopOnly}>
        {auth}
        </nav>
    </header>
    )
    }
    
   
}

export default Toolbar;