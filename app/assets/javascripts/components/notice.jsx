class Notice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: this.props.data}
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ message: nextProps.data }); 
  }

  render(){
    const message = this.state.message;
    if(message.status){
      message.div = <div className="alert alert-info">{message.text}</div>;
    }
    else{
      message.div = <div></div>;
    }      
    return (
      message.div
    )
  }
}