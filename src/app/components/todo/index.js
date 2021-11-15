import React, { Component } from "react";
import './index.css';
import add from '../../assets/add.svg';
import edit from '../../assets/edit.svg';
import remove from '../../assets/remove.svg';
import { apiUrl } from "../../constants/urls";
import Popup from "../popup";



class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            tasks: [],
            seen: false
        }
    }

    

    togglePop = (event) => {
        console.log("fuck")
        this.setState({
         seen: !this.state.seen
        });
       };

    async componentDidMount() {
        const response = await fetch(`${apiUrl}/tasks`);
        const tasks = await response.json();

        this.setState({ tasks: tasks, isLoaded: true })
    }

    delete = (id) => {
        let tasks = []
        fetch(`${apiUrl}/tasks/` + id, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tasks)

        })
        
    }



    
    render() {

        const { error, tasks, isLoaded } = this.state;
        console.log(this.state.tasks)

        // if (error) return <p>{error}</p>;
        // if (!isLoaded) return <LoaderComponent/>;

        return (
            <div className="todo-main">
                <header>
                    <div className="title">To Do</div>
                    <button className="add-button" onClick= {this.togglePop} ><img src={add} /></button>
                    {this.state.seen ? <Popup toggle={this.togglePop} /> : null}
                </header>
                <main>
                    <div className="tasks">

                        {tasks.map((task) => (
                            <div key={task.id} task={task} className="task-container">
                                <div className="title-wrapper">
                                    <div className="task-title">{task.title}</div>
                                    <div className="task-buttons"><button className="button"><img src={edit} /></button>
                                        <button className="button" onClick = {()=>this.delete(task.id)}><img src={remove} /></button></div>
                                </div>
                                <div className="goal-wrapper">
                                    <p>{task.goal}</p>
                                </div>
                            </div>



                        ))}

                    </div>
                </main>

            </div>
        )
    }
}
export default TodoComponent;
