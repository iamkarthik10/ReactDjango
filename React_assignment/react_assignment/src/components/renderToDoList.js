
const RenderToDoList = (props) =>{
    return(
        <div className='todo-list-display-container'>
            {props.renderData && props.renderData.length>0?props.renderData.map(item => (
                <div key={item.id} className='todo-control-container'>
                    <input type='text' value={item.to_do_list} disabled={item.editFlag === 'N'?true:false} onChange={(event) =>props.handleText(event.target.value,item.id)}></input>
                    <select disabled={item.editFlag === 'N'?true:false} value={item.completed} onChange={(event)=>{props.handleSelect(event.target.value,item.id)}}>
                        <option value='Y'>Y</option>
                        <option value='N'>N</option>
                    </select>
                    <button hidden={item.editFlag === 'N'?false:true} onClick={() =>props.handleEditTodo(item.id)}>Edit</button>
                    <button hidden={item.editFlag === 'N'?true:false} onClick={()=> props.handleSave(item.id)}>Save</button>
                    <button onClick={() => props.handelDeleteTodo(item.id)} >Delete</button>
                </div>
            ))
            :null}
        </div>
    )
}

export default RenderToDoList;