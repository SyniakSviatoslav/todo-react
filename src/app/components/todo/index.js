import React, { Component } from "react";
import "./index.css";
import addIcon from "../../assets/add.svg";
import editIcon from "../../assets/edit.svg";
import removeIcon from "../../assets/remove.svg";
import { apiUrl } from "../../constants/urls";
import Popup from "../popup";
import Loader from "../loader";

// creates main component to render tasks with state for objects from server (tasks) and functions

class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      tasks: [],
      isEditPopupShown: false,
      isCreatePopupShown: false,
      taskToEdit: null,
    };

  }

  // gets data from server

  async componentDidMount() {
    const response = await fetch(`${apiUrl}/tasks`);
    const tasks = await response.json();

    this.setState({ tasks: tasks, isLoaded: true });
  }

  // invokes Popup Component with possibility to post a new task on click

  toggleCreatePopup = () => {

    this.setState((prevState) => ({
      isCreatePopupShown: !prevState.isCreatePopupShown,

    }));
  };
  
  // invokes Popup Component with possibility to edit an old task on click

  toggleEditPopup = (task) => {
    this.setState((prevState) => ({
      isEditPopupShown: !prevState.isEditPopupShown,
      taskToEdit: task,
    }));
  };
  
  // closes Popup Component if clicked outside 

  closeOutsidePopup = () => {

    if (this.state.isCreatePopupShown) {


      this.setState((prevState) => ({
        isCreatePopupShown: !prevState.isCreatePopupShown,

      }));
    }
    if (this.state.isEditPopupShown){
      this.setState((prevState) => ({
        isEditPopupShown: !prevState.isEditPopupShown
      }));
    }
  }

  // deletes a task from server and renders a page

  delete = (id) => {
    let tasks = [];
    const response = fetch(`${apiUrl}/tasks/` + id, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(tasks),
    });
    this.setState(prevState => ({ tasks: prevState.tasks.filter(task => task.id != id) }))
  };

  // adds a new task to array of objects(tasks) in state of this component

  addTask = (task) => {
    this.setState(prevState => ({ tasks: [...prevState.tasks, task] }))
  }

  // edits an old task to array of objects(tasks) in state of this component

  editTask = (task) => {
    this.setState(prevState => ({ tasks: prevState.tasks.map(oldTask => oldTask.id === task.id ? { id: task.id, title: task.title, goal: task.goal } : oldTask) }));

  }

  // creates visual appereance with props for PopupComponent

  render() {
    const {
      error,
      tasks,
      isLoaded,
      isEditPopupShown,
      isCreatePopupShown,
      taskToEdit,
    } = this.state;

    if (error) return <p>{error}</p>;
    if (!isLoaded) return <Loader></Loader>;

    return (
      <div className="todo-main" >
        <header>
          <div className="title">To Do</div>
          <button className="add-button" onClick={this.toggleCreatePopup}>
            <img src={addIcon} alt="Add icon" />
          </button>
        </header>
        <div className="tasks">
          <main>
            {tasks.map((task) => (
              <div key={task.id} task={task} className="task-container">
                <div className="title-wrapper">
                  <div className="task-title">{task.title}</div>
                  <div className="task-buttons">
                    <button
                      className="button"
                      onClick={() => this.toggleEditPopup(task)}
                    >
                      <img src={editIcon} alt="Edit icon" />
                    </button>

                    <button
                      className="button"
                      onClick={() => this.delete(task.id)}
                    >
                      <img src={removeIcon} alt="Remove icon" />
                    </button>
                  </div>
                </div>
                <div className="goal-wrapper">
                  <p>{task.goal}</p>
                </div>
              </div>
            ))}
          </main>
        </div>
        {isCreatePopupShown && (
          <Popup
            handleClose={this.closeOutsidePopup}
            popupTitle="Create a task"
            update={this.addTask}
          />
        )}

        {isEditPopupShown && (
          <Popup
            handleClose={this.closeOutsidePopup}
            popupTitle="Edit a task"
            isEditPopup={true}
            taskToEdit={taskToEdit}
            update={this.editTask}
          />
        )}
      </div>
    );
  }
}
export default TodoComponent;
