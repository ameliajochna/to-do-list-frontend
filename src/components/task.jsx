import React, { Component } from 'react';

class Task extends Component {
    displayTask(){
        let name=this.props.name;
        if(!this.props.active) name=<del>{name}</del>;
        return name;
    }

    render() {
        const {name, id, onActive, onDelete}=this.props;

        return (
            <div 
                className="alert alert-dark" 
                role="alert" 
                style={{width:'50%', textAlign:'left'
            }}> 

            <input 
                className='form-check-input' 
                type='checkbox' 
                value='' 
                id='flexCheckDefault' 
                onClick={() => onActive(id)}
            />{this.displayTask()}

            <button 
                type="button" 
                class="btn btn-danger"
                style={{fontSize:12, float:'right'}}
                onClick={() => onDelete(id)}
            >Done</button>
            </div>
            
        );
    }
}
 
export default Task;