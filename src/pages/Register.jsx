import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const {isAuthenticated,setIsAuthenticated, loading, setLoading} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/users/new`, {
        name, email, password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);

    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);

    }


  }

  if(isAuthenticated) return <Navigate to='/'></Navigate>
  
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler} autoComplete="on" >
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required></input>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  required></input>
          <input type="password" placeholder="Passworrd" value={password} onChange={(e) => setPassword(e.target.value)}  required></input>
          <button disabled={loading} type="submit">Sign up</button>
          <h4>Or</h4>
          <Link to='/login'>Log in</Link>
        </form>
      </section>

    </div>
  )
}

export default Register