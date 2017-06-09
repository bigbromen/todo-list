class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: this.props.data };
  }

  addTask(task) {
    let tasks = this.state.tasks.slice();
    tasks.push(task);
    
    return this.setState({
       tasks: tasks
    });
  }

  render() {
    const tasks = this.state.tasks;
    return (
      
      <div>
        {React.createElement(FormAddNew, {
          handleNewTask: this.addTask.bind(this)
        })}
      {
        tasks.map(({ id, title, content, active }) => (
          <div>
             <p className={id}>title - { title} </p>
             <p id={id}>content - { content } </p>
          </div>
        ))
      }
      </div>
    )
  }

}