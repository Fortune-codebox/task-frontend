import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import layoutCss from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    toggleSideDrawer = () => {
        this.setState((prevState) => {
          return  {showSideDrawer: !prevState.showSideDrawer}
        })
    }
   render() {
    return <Aux>
        <Toolbar toggle={this.toggleSideDrawer} logout={this.props.logout} isAuth={this.props.isAuth} />
        <SideDrawer open={this.state.showSideDrawer}  closed={this.sideDrawerClosedHandler} />
        <main className={layoutCss.Content}>
            {this.props.children}
        </main>
    </Aux>
   }
}

export default Layout;