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
            seen: {add: false, edit: false},
            // edit: {yes: false, no: false}
        }
    }



    togglePop = (event) => {
        this.setState({
            seen: {add: !this.state.seen.add, edit: false}
            // seen: !this.state.seen
        });
    };

    editPop = () => {
        this.setState({
            seen: {add:false, edit: !this.state.seen.edit}
            
        });
        
    }
    

    // editPop = (id) => {
    //     let task = {
    //             title: "dfs",
    //             goal: "wdwef"
    //         }
    //     const requestOptions = {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ title: 'React PUT Request Example' })
    //     };
    //     fetch(`${apiUrl}/tasks/` + id, requestOptions)
    //         .then(response => response.json())
    //         .then(task => this.setState({ task: task }));
    // }
    
    
    async componentDidMount() {
        const response = await fetch(`${apiUrl}/tasks`);
        const tasks = await response.json();

        this.setState({ tasks: tasks, isLoaded: true })


    }





    delete = (id) => {
        let tasks = []
        const response = fetch(`${apiUrl}/tasks/` + id, {
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
                    <button className="add-button" onClick={this.togglePop} ><img src={add} />
                    </button>
                    {this.state.seen.add ? <Popup toggle={this.togglePop} title={"Create a task"} edit={true}/> : null}
                </header>
                <div className="tasks">
                    <main>
                        {tasks.map((task) => (
                            <div key={task.id} task={task} className="task-container">
                                <div className="title-wrapper">
                                    <div className="task-title">{task.title}
                                    </div>
                                    <div className="task-buttons">
                                        <button className="button"  onClick={() => this.editPop(task.id)} ><img src={edit} />
                                        
                                        </button>
                                        {this.state.seen.edit ? <Popup toggle={this.editPop} title={"Edit a task"} /> : null}
                                        
                                        <button className="button" onClick={() => this.delete(task.id)}><img src={remove} />
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

            </div>
        )
    }
}
export default TodoComponent;
