import {Switch, Route} from 'react-router-dom';
import LoginContainer from './container/loginContainer'
import HomeContainer from './container/homecontainer'
import ToDoContainer from './container/todocontainer'

const Routes = () =>{
    return(
        <Switch>
            <Route path='/login' exact component={LoginContainer}/>
            <Route path='/home' exact component={HomeContainer}/>
            <Route path='/todolist/:id' exact component={ToDoContainer}/>
        </Switch>
    )
}

export default Routes;