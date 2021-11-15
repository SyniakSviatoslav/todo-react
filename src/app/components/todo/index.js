import React, { Component } from "react";
import './index.css';
import vector from '../../assets/Vector.svg'


class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            tasks: []
        }
    }

    // async componentDidMount() {
    //     const response = await fetch(`${apiUrl}/collections`);
    //     const collections = await response.json();

    //     this.setState({ collections: collections, isLoaded: true })
    // }

    render() {
       
        // const { error, collections, isLoaded } = this.state;

        // if (error) return <p>{error}</p>;
        // if (!isLoaded) return <LoaderComponent/>;
        
        return (
            <div className="todo-main">
               <header>
                   <div className="title">To Do</div>
                   <button className="add-button"><img src={vector}/></button>
               </header>
               <main>
                   <div className="task-wrapper">Task</div>
               </main>

            </div>
        )
    }
}
export default TodoComponent;
