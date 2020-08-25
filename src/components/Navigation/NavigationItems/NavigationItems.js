import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Dashboard</NavigationItem>
        <NavigationItem link="/create" exact>Create</NavigationItem>
    </ul>
)

export default NavigationItems;