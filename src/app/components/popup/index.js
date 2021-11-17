import React, { Component } from "react";
import { apiUrl } from '../../constants/urls.js'
class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            goal: ''
        }
        this.handleSumbit = this.handleSumbit.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);
    }

    handleTitleChange (event){
        this.setState({ title: event.target.value });
    }
    handleGoalChange (event){
        this.setState({ goal: event.target.value });
    }

    handleSumbit(event){

        event.preventDefault();
        alert('The new task has been add');
        let tasks = {
            title: this.state.title,
            goal: this.state.goal
        }
        console.log(tasks)
        fetch(`${apiUrl}/tasks`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tasks)

        })
        this.props.toggle();

    }

    editSubmit(id){
        
        let task = {
                title: "dfs",
                goal: "wdwef"
            }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: task})
        };
        fetch(`${apiUrl}/tasks/` + id, requestOptions)
            .then(response => response.json())
            .then(task => this.setState({ task: task }));
    
    }
    
     
    render() {
        console.log(this.props)
        let add = this.handleSumbit;
        let edit = this.editSubmit;
        
        
        // {this.state.seen.add ? <Popup toggle={this.togglePop} title={"create the new task"} /> : null}

        return (
            <div className="modal">

                <div className="modal_content">
                    <form onSubmit={this.props.edit ? add : edit}>
                        <div className="popupTitle">{this.props.title}</div>
                        <div className="content-wrapper">
                            <div className="inputTitle">Task</div>
                            <input placeholder="Type the title" className="titleInput" name="title" value={this.state.title} onChange={(this.handleTitleChange)}></input>
                            <div className="inputTitle">Desciption</div>
                            <input placeholder="Type the desciption" className="descriptionInput" name="goal" value={this.state.goal} onChange={(this.handleGoalChange)}></input>
                            <div className="saveButtonContainer">
                                <input type="submit" value="Submit" className="saveButton" />
                                {/* <button type='submit' value="Submit" className="saveButton">Save</button> */}
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default Popup