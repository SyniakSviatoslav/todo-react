import React, { Component } from "react";
import './index.css';
import vector from '../../assets/Vector.svg'
import { apiUrl } from "../../constants/urls";


class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            tasks: []
        }
    }

    async componentDidMount() {
        const response = await fetch(`${apiUrl}/tasks`);
        const tasks = await response.json();

        this.setState({ tasks: tasks, isLoaded: true })
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
                    <button className="add-button"><img src={vector} /></button>
                </header>
                <main>
                    <div className="tasks">

                        {tasks.map((task) => (
                            <div key={task.id} task={task} className="task-container">
                                <div className="title-wrapper">
                                    <div className="task-title">{task.title}</div>
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

{/* <div > 
                <ul>
                    {this.state.users.map(user => (
                        <div key={user.id}> 
                        <li>{user.firstName}, {user.age}</li>
                        <button onClick = {()=>this.delete(user.id)}>Delete</button>
                        </div>
                    ))}
                </ul>
            </div> */}