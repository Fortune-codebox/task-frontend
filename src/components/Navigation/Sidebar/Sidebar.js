import React from 'react';
import classes from './Sidebar.module.css';
import {Link} from 'react-router-dom'


const Sidebar = (props) => {
   return (
       <div className={classes.Sidebar}>
          <ul>
              <li>
                  <Link to="/">
                     Dashboard
                  </Link>
                </li>

                
          </ul>
       </div>
       
   )
}

export default Sidebar;
