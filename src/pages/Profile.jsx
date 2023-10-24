import { useContext } from "react"
import { Context } from "../main"
import Loader from "../components/Loader";

const Profile = () => {
  const {user, loading} = useContext(Context);
  return (
    loading ? <Loader /> : (<div>
    <h2>Profile</h2>
    <h3>{user?.name}</h3>
    <p>{user?.email}</p>
  </div>)
  )
}

export default Profile