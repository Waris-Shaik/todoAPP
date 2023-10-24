import PropTypes from 'prop-types';

const TodoItem = ({ id, title, description, isCompleted, updateHandler, deleteHandler }) => {

  TodoItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    updateHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired


  };

  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input onChange={() => updateHandler(id)} type='checkbox' checked={isCompleted} ></input>
        <button className='btn' onClick={() => deleteHandler(id)}>Delete</button>
      </div>
    </div>
  )
}


export default TodoItem;