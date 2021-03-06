import React from 'react';
import {connect} from 'react-redux';
import {} from '../actions/index'
import {URL_BACKEND} from '../actions/index';
import RenderToDoList from './renderToDoList';

class Todo extends React.Component{

    state={

        todo_list:[],

            createToDo:{
            todo_name:'',
            completed:'N',
            status_flag:'N'
        }
    }

    handleCreateText(event){
        this.setState({createToDo:Object.assign(this.state.createToDo,{todo_name:event.target.value, status_flag:'Y'})})
    }

    handleSelectCategory(event){
        this.setState({createToDo:Object.assign(this.state.createToDo,{completed:event.target.value, status_flag:'Y'})})
    }

    async handleCreate(){
        
       let json = await fetch(`${URL_BACKEND}todolist/${this.props.todoState.user_id}/${this.props.match.params.id}`, {method:'POST', 
       body: JSON.stringify({ to_do_list:this.state.createToDo.todo_name,completed:this.state.createToDo.completed}),
       headers:{'Content-Type':'application/json'}})

       .then(resp => resp.json())
       this.setState({createToDo:Object.assign(this.state.createToDo,{status_flag:'N',completed:'N',todo_name:''})})

       json.editFlag = 'N'
       let updatedLists = this.state.todo_list
        updatedLists.push(json)
        this.setState({todo_list:updatedLists})

    }


    appendControl(actualData){
        actualData.forEach(item => item.editFlag = 'N')
        return actualData
    }

    async componentDidMount(){
        let resp = await fetch(`${URL_BACKEND}todolist/${this.props.todoState.user_id}/${this.props.match.params.id}`, {
            method:'GET'
        })
        .then(res => res.json())
      
        let updatedLists = this.appendControl(resp)
        this.setState({todo_list:updatedLists})
    }

    async deleteTodo(todoId){
      let status =  await fetch(`${URL_BACKEND}todolist/${this.props.todoState.user_id}/${this.props.match.params.id}`, {
            method:'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ id:todoId})
        })
        .then(resp => resp.status)

        if(status === 200){
            this.setState({todo_list: this.state.todo_list.filter(item => item.id !== todoId)})
        }
    }

    editTodoHandle (todoId){
        let updatedLists = this.state.todo_list
        updatedLists.forEach((item)=>{
            if(item.id === todoId){
                item.editFlag = 'Y'
            }
        })
        this.setState({todo_list:updatedLists})
    }

    handleTextEdit (text,todoId){
        let updatedLists = this.state.todo_list

        updatedLists.forEach((element)=>{
            if(element.id === todoId){
                element.to_do_list = text
            }
        })

        this.setState({todo_list:updatedLists})
    }

    handleSelectEdit(select,todoId){
        let updatedLists = this.state.todo_list

        updatedLists.forEach((element)=>{
            if(element.id === todoId){
                element.completed = select
            }
        })

        this.setState({todo_list:updatedLists})
    }

    async handleSaveEdit(todoId){
        let getTodo = this.state.todo_list.filter(element => element.id === todoId)[0]
        delete getTodo.editFlag
        
        let resp = await fetch(`${URL_BACKEND}todolist/${this.props.todoState.user_id}/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(getTodo)
        })
        .then(res => res.json())
        if(resp){
            let updatedLists = this.state.todo_list
            updatedLists.forEach((element) =>{
                if(element.id === todoId){
                    element.editFlag = 'N'
                }
            })
            this.setState({todo_list:updatedLists})
        }

    }

    render(){
        return(
            <div className='todo-main-container'>
                <div className='todo-create-container'>
                    <input type='text' onChange={this.handleCreateText.bind(this)} value={this.state.createToDo.status_flag === 'N'?'':this.state.createToDo.todo_name}></input>
                    <select className='todo-select-completed' onChange={this.handleSelectCategory.bind(this)} value={this.state.createToDo.status_flag === 'N'?'N':this.state.createToDo.completed}>
                        <option value='Y'>Y</option>
                        <option value='N'>N</option>
                    </select>
                    <button onClick={this.handleCreate.bind(this)}>Create</button>
                </div>
                <RenderToDoList renderData={this.state.todo_list} handelDeleteTodo={(id) => this.deleteTodo(id)} handleEditTodo={(id) => this.editTodoHandle(id)} handleText ={(text,id) => this.handleTextEdit(text,id)} handleSelect={(select,id)=>{this.handleSelectEdit(select,id)}} handleSave={(id)=>this.handleSaveEdit(id)}/>
            </div>
        )
    }
}

function MapStateToProps(state){
    return{
        todoState: state.Reducer
    }
}

function MapDispatchToProps(dispatch){
    return{
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(Todo);