import React, { Component } from 'react';
import NavBar from './components/navbar';
import Create from './components/create';
import Tasks from './components/tasks';
import ProgressBar from './components/progressbar';

class App extends Component {
  state = {
    tasks : []
  };

  constructor(){
    super();
    document.title='To do list';
  }

  changeActive = (id) =>{
    const index=[...this.state.tasks].findIndex(t => t.id===id);
    let updTasks=this.state.tasks;
    const active=updTasks[index].active;
    updTasks[index].active=!active;
    this.setState({tasks : updTasks});
  }

  addTask = (name) =>{
    if(name==='') return;
    let updTasks=[...this.state.tasks];
    let maxId=0;
    if(updTasks.length) maxId=Math.max(...updTasks.map(t => t.id));
    updTasks.push({id: maxId+1, name: name, active:true});
    this.setState({tasks: updTasks});
  }

  deleteTask = (id) =>{
    const updTasks=[...this.state.tasks].filter(t => t.id!==id);
    console.log(updTasks);
    this.setState({tasks : updTasks});
  }

  render(){
    return(
      <React.Fragment>
      <NavBar/>   
      <ProgressBar
      tasks={this.state.tasks}
      />
      <center>
        <Create
        onAdd={this.addTask}
        />
        <Tasks
        tasks={this.state.tasks}
        onActive={this.changeActive}
        onDelete={this.deleteTask}
        />
        </center>
      </React.Fragment>
    )};
}

export default App;
