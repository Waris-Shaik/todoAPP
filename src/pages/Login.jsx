import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

  const submitHandler = async (e) =>{
    e.preventDefault();
    console.log(email, password);
    setLoading(true);
    try {
    const {data} =  await axios.post(`${server}/users/login`, {
        email, password
      },{
        headers:{
          "Content-Type" : "application/json"
        },
        withCredentials:true
      })
      toast.success(data.message)
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
        toast.error(error.response.data.message)
        setIsAuthenticated(false);
        setLoading(false);
    }
  
  }

  if(isAuthenticated) return <Navigate to = '/'></Navigate>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}  autoComplete="on">
          <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required></input>
          <input type="password" placeholder="Passworrd" value={password} onChange={(e)=> setPassword(e.target.value)}  required></input>
          <button disabled={loading} type="submit">Log in</button>
          <h4>Or</h4>
          <Link to = '/register'>Sign up</Link>
        </form>
      </section>
      
    </div>
  )
}

export default Login