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
        this.editSubmit = this.editSubmit.bind(this);
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
       
        fetch(`${apiUrl}/tasks`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tasks)

        })
        this.props.toggle();

    }

    editSubmit(event){
        event.preventDefault();
        alert('The task has been edited');
        let task = {
            title: this.state.title,
            goal: this.state.goal
            }

            fetch(`${apiUrl}/tasks/2`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({title: this.state.title, goal: this.state.goal })
    
            })
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ task})
        // };
        // fetch(`${apiUrl}/tasks/1`, requestOptions)
        //     .then(response => response.json())
        //     // .then(task => this.setState({ title: this.state.title }));
        //     console.log(task)
    
    }
    
    
     
    render() {
        
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