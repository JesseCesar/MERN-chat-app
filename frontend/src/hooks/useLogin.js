import {useState} from 'react'
import {toast} from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'


const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const  { setAuthUser } = useAuthContext();

  const login = async ({username, password}) => {
    const success = hundleInputErrors({username, password});
    if(!success) return;

    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })

      const data = await res.json()
      if(data.error) {
        throw new Error(data.error)
      }

      //localstorage
      localStorage.setItem('chat-user-auth', JSON.stringify(data))
      console.log(data);
      // context
      setAuthUser(data);

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {loading, login}
}

export default useLogin

function hundleInputErrors ({username, password}) {
  if(!username || !password) {
   toast.error('Please fill all the fields')
    return false
  }

  // if credentials does not correspond to any user





  return true
}
