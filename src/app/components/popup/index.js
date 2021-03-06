import React, { Component } from "react";
import "./index.css";
import { apiUrl } from "../../constants/urls.js";

// creates Popup on click add or edit 

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.isEditPopup ? props.taskToEdit.title : "",
      goal: props.isEditPopup ? props.taskToEdit.goal : "",
      tasks: []
    };
  }
   
  // transferes value of input to state of Popup Component

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleGoalChange = (event) => {
    this.setState({ goal: event.target.value });
  };


  // gets data from server

  async componentDidMount() {
    const response = await fetch(`${apiUrl}/tasks`);
    const tasks = await response.json();

    this.setState({ tasks: tasks });
  }

  // pushes data from form to server to create a new task on click, if is invoked via add button
  // pushes data from form to server to edit an old task on click, if is invoked via edit button

  handleSumbit = async (event) => {
    event.preventDefault();
    const { title, goal } = this.state;
    const { taskToEdit, handleClose, update } = this.props;

    if (this.props.isEditPopup) {
      const response = await fetch(`${apiUrl}/tasks/${taskToEdit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, goal: goal })
      })
      const updatedTask = await response.json();

      update(updatedTask)
      handleClose();

    } else {
      const response = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, goal: goal })
      })
      const newTask = await response.json();

      update(newTask);
      handleClose();

    }
  };
 
  // creates visual appereance with props from TodoComponent

  render() {

    const { popupTitle, handleClose } = this.props;
    const { title, goal } = this.state;

    return (
      <div className="modal" >
        <div className="blocker" onClick={handleClose}></div>
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
