import {useState} from 'react'
import {toast} from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

function useSignup() {
  const [loading, setLoading] = useState(false)
  const  { setAuthUser } = useAuthContext();

  const signup = async ({fullName, username, password, confirmPassword, gender}) => {
    const success = hundleInputErrors({fullName, username, password, confirmPassword, gender});
    if(!success) return;

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({fullName, username, password, confirmPassword, gender})
      })

      const data = await res.json()
      if(data.error) {
        throw new Error(data.error)
      }

      //localstorage
      localStorage.setItem('chat-user-auth', JSON.stringify(data))
      // context
      setAuthUser(data);

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return {loading, signup}
}

export default useSignup


function hundleInputErrors ({fullName, username, password, confirmPassword, gender}) {
  if(!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill all the fields')
    return false
  }

  if(password !== confirmPassword) {
    toast.error('Passwords do not match')
    return false
  }

  if(password.length < 6) {
    toast.error('Password should be at least 6 characters long')
    return false
  }

  return true
}
