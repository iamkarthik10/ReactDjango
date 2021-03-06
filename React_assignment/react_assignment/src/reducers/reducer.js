export default function Reducer(state={status:'Fill the form to continue'}, action){
    switch(action.type){
        case 'GET_USER_BUCKETS':
            return {...state, user_buckets:action.payload}
        case 'CREATE_BUCKET':
            let updated_bucket_list = [...state.user_buckets,action.payload]
            return {...state, user_buckets:updated_bucket_list}
        case 'LOGINUSER':
            return {...state, status:action.payload.status, user_id:action.payload.user_id}
        case 'UPDATE_STATUS':
            return {...state, status:action.payload}
        case 'CREATE_TODO':
            return {...state, todo_list:action.payload}
        case 'GET_TODO':
            return {...state, todo_list:action.payload}
        case 'DELETE_TODO':
            console.log(action.payload)
            let to_do_list = state.todo_list
            to_do_list = to_do_list.filter(item => item.id !== action.payload)
            console.log(to_do_list)
            return {...state, todo_list:to_do_list}
        default:
            return state
    }
}