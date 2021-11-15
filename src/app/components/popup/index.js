import React, { Component } from "react";
class Popup extends Component {
    handleClick = () => {
        this.props.toggle();
    };
    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                <div className="popupTitle">Create a task</div>
                    <div className="content-wrapper">
                        <div className="inputTitle">Title</div>
                        <input placeholder="Type the title" className="titleInput"></input>
                        <div className="inputTitle">Desciption</div>
                        <input placeholder="Type the desciption" className="descriptionInput"></input>
                    </div>

                </div>
            </div>
        );
    }
}

export default Popup