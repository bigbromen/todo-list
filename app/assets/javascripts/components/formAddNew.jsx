class FormAddNew extends React.Component {
  constructor(props) {
    super(props);   
    this.state = { 
      title: "",
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let props = this.props
    let data = JSON.stringify(this.state);
    $.ajax({
      url: '/tasks',
      type: 'post',
      dataType: 'json',
      data: {task: data},
      success: function(data) {
        console.log(data.error)
        if(data.error){
            alert(data.text)
        }        
        else{
            this.state = { //Разобраться
                title: "",
                content: ""
            };
            props.handleNewTask(data)
            
        }        
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        </label>
        <label>
          content:
          <input type="text" name="content" value={this.state.content} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}