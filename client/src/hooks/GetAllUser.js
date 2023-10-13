import { useState, useEffect } from "react";
import axios from 'axios';

const useGetAllUsers = () => {
  const [loading, setLoading] = useState();
  const [users, setUsers] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const GetUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getUsers');
        setUsers(response.data);
        console.log(response)
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    GetUsers();
  }, []);

  console.log(users)

return {
  loading,
  users,
  error
}

}

export default useGetAllUsers