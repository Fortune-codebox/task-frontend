import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import {Table, Button} from 'react-bootstrap';
import classes from './Table.module.css'


const Tables = (props) => {

    const task = props.allTasks.map((task, i) => {
          return(
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{task.name}</td>
                    <td>{task.country}</td>
                    <td>{task.assigned_to}</td>
                    <td>{task.date}</td>
                    <td>
                        <Button className={classes.Button} onClick={() => {props.getTask(task.id)}}> <small>Edit</small> </Button>
                        <Button className={classes.Button} variant="danger" onClick={() => {props.deleteTask(task.id)}}> <small>Delete</small> </Button>
                    </td>

                </tr>
          )
      })
   
        return (
            <Aux>
                <Table className={classes.Table} striped  hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Assigned To</th>
                            <th>Date</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {task}
                           
                            
                        </tbody>
                        </Table>
            </Aux>
        )
    
}

export default Tables;