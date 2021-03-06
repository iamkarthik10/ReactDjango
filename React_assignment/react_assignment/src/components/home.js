import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {GetUserBuckets, CreateBucket} from '../actions/index'
import '../styles/bucket.css'

class Home extends React.Component{

    state = {
        bucket_name:'',
        completed: 'N'
    }

    renderTemplate(){
        return (
            <div className='bucket-sub-container'>
                <b>BUCKETS/CATEGORY</b>
                {this.props.bucketState.user_buckets && this.props.bucketState.user_buckets.length >0?
                (this.props.bucketState.user_buckets.map(item =>(
                    <Link key={item.id} to={`todolist/${item.id}`}>
                        <div className='bucket-list-container' >
                        <label>Bucket Name: </label> <label>{item.bucket_name}</label>
                        </div>
                    </Link>
                )))
                :<div><b>No Buckets present as of now</b></div>}
            </div>
        )
    }

    componentDidMount(){
        this.props.getlistofbuckets(this.props.bucketState.user_id)
    }

    handleOnchange(event){
        this.setState({bucket_name:event.target.value})
    }

    handleOnSubmit(){
        this.props.createbucket(this.state.bucket_name,this.state.completed,this.props.bucketState.user_id)
    }

    handleOnSelect(event){
        this.setState({completed:event.target.value})
    }

    render(){
        return(
            <div className='bucket-main-container'>
                <div className='bucket-create'>
                    <b>Create New Bucket</b>
                    <input type='text' onChange={this.handleOnchange.bind(this)}></input>
                    <select name='completed' id='select_1' onChange={this.handleOnSelect.bind(this)}>
                        <option value='Y'>Y</option>
                        <option value='N'>N</option>
                    </select>
                    <button onClick={this.handleOnSubmit.bind(this)}>Create</button>
                </div>
                {this.renderTemplate()}
            </div>
        )
    }
}

function MapStateToProps(state){
    return{
        bucketState : state.Reducer
    }
}

function MapDispatchToProps(dispatch){
    return{
        getlistofbuckets: (user_id) => dispatch(GetUserBuckets(user_id)),
        createbucket: (bucket_name,completed,user_id) => dispatch(CreateBucket(bucket_name,completed,user_id)),
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(Home);