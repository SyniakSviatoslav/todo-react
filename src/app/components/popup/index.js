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

    
     
    // handleClick = () => {
    //     this.props.toggle();
    //   };


    // = {()=>this.delete(user.id)}
    // handleClick = () => {
    //     this.props.toggle();
    // };
    render() {
        return (
            <div className="modal">

                <div className="modal_content">
                    <form onSubmit={(this.handleSumbit)}>
                        <div className="popupTitle">Create a task</div>
                        <div className="content-wrapper">
                            <div className="inputTitle">Title</div>
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