import React from 'react';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Dashboard.module.css';
import { Container, Row, Button, Form} from 'react-bootstrap';
import Tables from '../../components/UI/Table/Table';
import axios from '../../axios-tasks'
import Modal from '../../components/UI/Modal/Modal';
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allTasks: [],
            create: false,
            edit: false,
             name: '',
             assigned_to: '',
             country: '',
             date: '',
             id: ''
        }
        this.createTaskHandler = this.createTaskHandler.bind(this);
    
   }

   componentDidMount() {
        this.getAllTasks();
    }

    // componentDidUpdate() {
    //     this.getAllTasks();
    // }
    
    getAllTasks = () => {
        axios.get('/tasks')
        .then(res => {
             this.setState({allTasks: res.data.data})
        })
        .catch(err => {
            console.log(err);
        })
    }

  deleteTaskHandler(id) {
    //  console.log('My id is ' + id);
     axios.delete('/tasks/' + id )
    .then( res => {
        console.log('deleted successfully');
        this.getAllTasks();
    })
    .catch(err => {
        console.log(err)
    });

   
 }

  openCreateTaskHandler = () => {
      this.setState({create: true})
  }

  closeCreateTaskHandler = () => {
    this.setState({create: false, edit: false, name: '', country: '', assigned_to: '', date: ''})
}

createTaskHandler = (event) => {
    // event.preventDefault();
   const data = {
       name: this.state.name,
       country: this.state.country,
       assigned_to: this.state.assigned_to,
       date: this.state.date
   }
    console.log(data);
    axios.post('/tasks', data)
    .then(res => {
        console.log('created success')
        this.setState({create: false})
        this.getAllTasks();
    })
    .catch(err => console.log(err));
}

editTaskHandler = (id) => {
    console.log('event', id)
    const data = {
        name: this.state.name,
        country: this.state.country,
        assigned_to: this.state.assigned_to,
        date: this.state.date
    }
    axios.patch('/tasks/' + id, data)
    .then(res => {
        console.log('edited successfully')
        this.setState({create: false, edit: false})
        this.getAllTasks();
    })
    .catch(err => console.log(err));
}

getTaskHandler = (id) => {
    this.setState({create: true, edit: true})
    
    axios.get('/tasks/' + id)
    .then(res => {
        
            const name =  res.data.data.name;
            const country= res.data.data.country;
            const assigned_to = res.data.data.assigned_to;
            const date = res.data.data.date;
            const id = res.data.data.id
        
        console.log('task', res)
        this.setState({name: name, country: country, assigned_to: assigned_to, date: date, id: id})
    })
    .catch(err => {
        console.log(err);
    })
}

// handleChange = (evt) => {
//     const value = evt.target.value;
//     setState({
//       ...state.task,
//       [evt.target.name]: value
//     });
//     console.log(this.state)
// }



   render() {
       
       
       const button =  this.state.create && !this.state.edit ?  <Button variant="primary" className={classes.Button}  onClick={ (event) => { this.createTaskHandler() } }>
       Create
   </Button> : <Button variant="primary" className={classes.Button} onClick={(event) =>{ this.editTaskHandler(this.state.id) }}>
       Update
    </Button> ;
       return (
          <Aux>
              <div className={classes.Dashboard}>
                  <div className={classes.Side}>
                  <Sidebar ></Sidebar>
                  </div>

                    {/* <div className={classes.Content}>I am also here</div> */}
                    <Modal show={this.state.create} modalClosed={this.closeCreateTaskHandler}>
                        <h4>Create A Task</h4>
                        <hr></hr>
                    <Form >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="name"  value={this.state.name} onChange={( event ) => this.setState({ name : event.target.value } )} />
                            <Form.Text className="text-muted">
                            Name of Task Here
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Country</Form.Label>
                            <Form.Control  type="text" name="country" placeholder="country"  value={this.state.country}  onChange={( event ) => this.setState({ country : event.target.value } )}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Appointee</Form.Label>
                            <Form.Control  type="text" name="assigned_to" placeholder="Appointee"  value={this.state.assigned_to} onChange={( event ) => this.setState({ assigned_to : event.target.value } )} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Appointee</Form.Label>
                            <Form.Control  type="date" name="date" placeholder="date" value={this.state.date} onChange={( event ) => this.setState( { date : event.target.value })}/>
                        </Form.Group>
                        
                        {button}
                        </Form>
                    </Modal>
                    <Container className={classes.Content}>
                     
                     <div className={classes.Top}> <h4>All Tasks</h4> <Button onClick={this.openCreateTaskHandler}>Create</Button></div> 
                        <Row>
                       
                            <Tables getTask={this.getTaskHandler} allTasks={this.state.allTasks}  deleteTask={this.deleteTaskHandler} />
                        </Row>
                     </Container>
              </div>
          </Aux>
       )
   }


}

export default Dashboard;