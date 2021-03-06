import axios from 'axios';
export const URL_BACKEND = 'http://127.0.0.1:8000/'

export function GetUserBuckets(id){
    return async function(dispatch){
      let resp = await axios.get(`${URL_BACKEND}userbucket/${parseInt(id)}`)
                  .then(res => res.data)        
      return dispatch({type:'GET_USER_BUCKETS',payload:resp})
    }
}

export function CreateBucket(bucket_name,completed,user_id){
  return async function(dispatch){
    let resp = await axios.post(`${URL_BACKEND}userbucket/${user_id}`, {"bucket_name":bucket_name, "completed":completed})
                          .then(res => res.data)

      return dispatch({type:'CREATE_BUCKET',payload:resp})
  }
}

export function LoginUser(type,name,password){
  return async function(dispatch){
   let resp =  await axios.post(`${URL_BACKEND}users/`, {"type":type,"name":name,"password":password})
                    .then(res => res)
                    .catch(err =>err.response)

  if (resp.status === 200){
    return dispatch({type:'LOGINUSER',payload:{user_id:resp.data.id, status:'Login Successful'}})
  }
  else{
    return dispatch({type:'LOGINUSER',payload:{user_id:null, status:resp.data}})
  }
  }
}

export function updateStatus(status){
  return {type:"UPDATE_STATUS",payload:status}
}
