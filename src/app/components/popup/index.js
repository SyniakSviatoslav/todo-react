import React, { Component } from "react";
import { apiUrl } from "../../constants/urls.js";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.isEditPopup ? props.taskToEdit.title : "",
      goal: props.isEditPopup ? props.taskToEdit.goal : "",
      tasks: []
    };
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleGoalChange = (event) => {
    this.setState({ goal: event.target.value });
  };

  async componentDidMount() {
    const response = await fetch(`${apiUrl}/tasks`);
    const tasks = await response.json();

    this.setState({ tasks: tasks });
  }

   handleSumbit = async (event) => {
    event.preventDefault();
    const { title, goal } = this.state;
    const { taskToEdit, handleClose, } = this.props;

    if (this.props.isEditPopup) {
      const updatedTask = await fetch(`${apiUrl}/tasks/${taskToEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, goal: goal })
    })
    
     this.props.update()
      handleClose();

    } else {
      const updatedTask = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, goal: goal })
    })
      
      this.props.update()
      handleClose();

    }
  };

  render() {
    
    const { popupTitle } = this.props;
    const { title, goal } = this.state;

    return (
      <div className="modal">
        <div className="modal_content">
          <form onSubmit={this.handleSumbit}>
            <div className="popupTitles">{popupTitle}</div>
            <div className="content-wrapper">
              <div className="inputTitle">Task</div>
              <input
                placeholder="Type the title"
                className="titleInput"
                name="title"
                value={title}
                onChange={this.handleTitleChange}
              ></input>
              <div className="inputTitle">Desciption</div>
              <input
                placeholder="Type the desciption"
                className="descriptionInput"
                name="goal"
                value={goal}
                onChange={this.handleGoalChange}
              ></input>
              <div className="saveButtonContainer">
                <button type="submit" className="saveButton">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Popup;
