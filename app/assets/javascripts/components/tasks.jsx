
class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tasks: this.props.data,
      message: {
        status: false,
        text: ""
      },
      taskEdit: "",
      showUpdateForm: false
   };
  }
  updateTask(task){
    $this = this;
    $this.state.tasks.map(function(t){
      if(t.id == task.id){
        t.title = task.title;
        t.content = task.content;
        $this.setState({
          tasks: $this.state.tasks,
          message: {
            status: true,
            text: "Update was succesfull"
          },
          showUpdateForm: false
       }); 
     }
    })    

  }
  addTask(task) {
    let tasks = this.state.tasks.slice();
    tasks.push(task);
    
    return this.setState({
       tasks: tasks,
       message: {
         status: true,
         text: "Add new task was succsesfull"
      }
    });
  }

  deleteTask(idTask){
    let tasks = this.state.tasks.slice();
    let message = this.state.message;
    $this = this;
    $.ajax({
      url: '/tasks/'+idTask,
      dataType: 'json',
      type: "delete",
      success: function(data) {
        if(data.error){
          $this.setState({
            message: {
              status: true,
              text: "Deleting went wrong"
            }
          });            
        }        
        else{         
          tasks.map(function(task){
            if(task.id == data.id){
              let index = tasks.indexOf(task); 
              tasks.splice(index, 1);
              $this.setState({
                tasks: tasks,
                message: {
                  status: true,
                  text: "Delete was succesfull"
                }
              });            
            }
          })     
        }        
      }
    });
  }

  closeTask(idTask){
    let tasks = this.state.tasks.slice();
    let message = this.state.message;
    $this = this;
    $.ajax({
      url: '/task/close/'+idTask,
      dataType: 'json',
      type: "get",
      success: function(data) {
        if(data.error){
          $this.setState({
            message: {
              status: true,
              text: "Closing went wrong"
            }
          });  
        }        
        else{      
          tasks.map(function(task){
            if(task.id == data.id){
              task.active = false;
              $this.setState({
                tasks: tasks,
                message: {
                  status: true,
                  text: "Close was succesfull"
                }  
              });              
            }
            

          })    
        }        
      }
    });
  }
  activeTask(idTask){
    let tasks = this.state.tasks.slice();
    let message = this.state.message;
    $this = this;
    $.ajax({
      url: '/task/active/'+idTask,
      dataType: 'json',
      type: "get",
      success: function(data) {
        if(data.error){
          $this.setState({
            message: {
              status: true,
              text: "active went wrong"
            }
          });  
        }        
        else{   
          tasks.map(function(task){
            if(task.id == data.id){
              task.active = true;
              $this.setState({
                tasks: tasks,
                message: {
                  status: true,
                  text: "Active was succesfull"
                }
              }); 
            }
          })    
        }        
      }
    });
  }

  fillForm(task){
    this.setState({
      showUpdateForm: true,
      taskEdit: task
    })
  }

  render() {
    const tasks = this.state.tasks;
    const msgs = this.state.message;
    $this = this;
    tasks.forEach(function(task) {
      if(task.active){
        task.iconStatus = <i className="material-icons ok">done</i>;
        task.iconChangeStatus = <i className="material-icons false" onClick={$this.closeTask.bind($this,task.id)}>stop</i>;
        task.iconEdit = <i className="material-icons" onClick={$this.fillForm.bind($this,task)}>edit</i>;
        task.statusText = "activeTask";
      }
      else{
        task.iconStatus = <i className="material-icons false">clear</i>;
        task.iconChangeStatus = <i className="material-icons ok" onClick={$this.activeTask.bind($this,task.id)}>play_arrow</i>;        
        //task.iconEdit = <i className="material-icons false">not_interested</i>;
        task.iconEdit = <i className="material-icons" onClick={$this.fillForm.bind($this,task)}>edit</i>;
        task.statusText = "closeTask";
      }
    });
    return (
      <div id="main">
        <FormAddNew handleNewTask={this.addTask.bind(this)}/>
        <Notice data={ msgs } />         
        <div id="tasks">
          <h2>List of tasks</h2>
        {
          tasks.map(({ id, title, content, active, iconStatus, statusText, iconChangeStatus, iconEdit }) => (
            <div id={id} className={ "task " + statusText }>
              <div className="task__status">{ iconStatus } </div>
              <div className="task__title">{ title } </div>              
              
              <div className="task__change">{ iconChangeStatus }</div>
              <div className="task__edit">{ iconEdit }</div>
              <div className="task__delete">
                <i className="material-icons ic_del" onClick={ this.deleteTask.bind(this,id) }>delete_forever</i>
              </div>
              <div className="clear"></div>
              <hr/>
              <div className="task__content">{ content } </div>
              <div className="clear"></div>
            </div>            
          ))
        }

        
        </div>
        {
          this.state.showUpdateForm ?
          <FormUpdate task={this.state.taskEdit} handleUpdate = {this.updateTask.bind(this)} /> : null
        }
      </div>
    )
  }

}