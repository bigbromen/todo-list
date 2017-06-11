class FormUpdate extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      id: this.props.task.id,
      title: this.props.task.title,
      content: this.props.task.content,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    componentWillReceiveProps(nextProps) {
    this.setState({ 
      id: nextProps.task.id,
      title: nextProps.task.title,
      content: nextProps.task.content,
    }); 
  }
  handleChange(event){
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    $this = this;
    let props = this.props
    let data = JSON.stringify(this.state);
    $.ajax({
      url: '/tasks/'+this.state.id,
      type: 'put',
      dataType: 'json',
      data: {task: data},
      success: function(data) {
        console.log(data.error)
        if(data.error){
            alert(data.text)
        }        
        else{
            $this.setState( { 
                title: "",
                content: ""
            });
            props.handleUpdate(data)
            
        }        
      }
    });
  }

  render() {
    return (
      <div id="update_form">
        <h2>Edit task</h2>
        <form onSubmit={this.handleSubmit}>
            <label className="label_form">
            title:
            <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </label>
            <label className="label_form">
            content:
            <textarea className="form-control" type="text" name="content" value={this.state.content} onChange={this.handleChange} />
            </label>
            <input className="btn" type="submit" value="Edit" />
        </form>
      </div>
    );
  }

}