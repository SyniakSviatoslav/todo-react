import React, { Component } from "react";
import { apiUrl } from "../../constants/urls.js";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.isEditPopup ? props.taskToEdit.title : "",
      goal: props.isEditPopup ? props.taskToEdit.goal : "",
    };
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleGoalChange = (event) => {
    this.setState({ goal: event.target.value });
  };

   handleSumbit = async (event) => {
    event.preventDefault();
    const { title, goal } = this.state;
    const { taskToEdit, handleClose } = this.props;

    if (this.props.isEditPopup) {
      // do edit, you have access to the task id by taskToEdit.id
      console.log("edit");
      handleClose();
    } else {
      // do creation
      console.log("create");
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
