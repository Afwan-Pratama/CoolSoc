import React,{ useContext, useState ,useEffect} from 'react'
import { auth , provider } from '../firebase'
import { sendPasswordResetEmail, createUserWithEmailAndPassword , signInWithEmailAndPassword  , signInWithRedirect } from 'firebase/auth'

const FirebaseContext = React.createContext()

export function useAuth() {
    return useContext(FirebaseContext)
}

export function FirebaseProvider({children}) {

    const [currentUser , setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email,password) {
      createUserWithEmailAndPassword(auth , email ,password)
    }

    function login(email,password) {
      return signInWithEmailAndPassword(auth, email , password)
    }

    const logOut = () =>{
      return auth.signOut()
    }

    const signGoogle = () => {
      return signInWithRedirect(auth, provider)
    }

    const forgotPassword = (email) => {
      return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{

      const unsubscribe = auth.onAuthStateChanged( user => {
        
        setCurrentUser(user)
        
        setLoading(false)

      })

      return unsubscribe

    }, [])
    
    const value = {
        currentUser,
        login,
        signup,
        logOut,
        signGoogle,
        forgotPassword
    }

  return (
    <FirebaseContext.Provider value={value}>
        {!loading && children}
    </FirebaseContext.Provider>
  )
}
