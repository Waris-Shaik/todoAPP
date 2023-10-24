import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Context, server } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { isAuthenticated } = useContext(Context);


    const submitHandler = async (e) => {
        e.preventDefault();


        try {
            setLoading(true);
            const { data } = await axios.post(`${server}/tasks/new`, { title, description }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            toast.success(data.message)
            setLoading(false);
            setTitle("");
            setDescription("");
            setRefresh(!refresh)

        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }

    }


    const updateHandler = async (id) => {


        try {
            const { data } = await axios.put(`${server}/tasks/${id}`, {}, {
                withCredentials: true
            })

            toast.success(data.message);
            setRefresh(!refresh);

        } catch (error) {
            toast.error(error.response.data.message)

        }


    }
    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${server}/tasks/${id}`, {
                withCredentials: true
            })

            toast.success(data.message);
            setRefresh(!refresh)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        axios.get(`${server}/tasks/my`, {
            withCredentials: true
        }).then((res) => {
            console.log(res.data.tasks)
            setTasks(res.data.tasks);
        }).catch((error) => {
            // toast.error(error.response.data.message);
            console.log('here u go', error.response.data.message)
        })
    }, [refresh])

    if (!isAuthenticated) return <Navigate to='/login'></Navigate>
    return (
        <div className="container">

            <div className="login" onSubmit={submitHandler}>
                <section>
                    <form>
                        <input type="text" placeholder="title.." onChange={(e) => setTitle(e.target.value)} value={title} required></input>
                        <input type="text" placeholder="description.." onChange={(e) => setDescription(e.target.value)} value={description} required></input>
                        <button disabled={loading} type="submit">Add Task</button>
                    </form>
                </section>

            </div>








            <section className="todosContainer">
                {tasks.map(task => (
                    <TodoItem key={task._id} id={task._id} title={task.title} description={task.description} isCompleted={task.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler}            ></TodoItem>
                ))}

            </section>

        </div>
    )
}

export default Home