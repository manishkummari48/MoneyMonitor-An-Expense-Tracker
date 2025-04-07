import { useState,useEffect} from 'react'
import axios from 'axios'
import { loginContext } from './loginContext'

function UserLoginStore({children}){
    let [loggedInUser,setLoggedInUser] =useState({})
    let [userLoginStatus,setUserLoginStatus] = useState(false)
    let [loginErr,setLoginErr] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Verify token and get user data
            axios.get("http://localhost:3500/users-api/verify-user", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                if (response.data.success) {
                    setUserLoginStatus(true)
                    setLoggedInUser({...response.data.user})
                    setLoginErr("")
                } else {
                    localStorage.clear()
                    setUserLoginStatus(false)
                    setLoggedInUser({})
                }
            })
            .catch(err => {
                localStorage.clear()
                setUserLoginStatus(false)
                setLoggedInUser({})
            })
        }
    }, [])
    
    //function to make User login request
    const loginUser=(userCredentialObj)=>{
        axios.post("http://localhost:3500/users-api/login",userCredentialObj)
        .then(response=>{
            if(response.data.message === "success"){
                //navigate to user profile
                //save token to local storage
                localStorage.setItem('token',response.data.token)
               // console.log(response.data.user)
                setUserLoginStatus(true)
                setLoginErr("")
                setLoggedInUser({...response.data.user});
            }
            else{
                //console.log("user login failed - ",response.data.message)
                localStorage.clear()
                setLoginErr(response.data.message)
            }
        })
        .catch(err=>{
            console.log('An error occurred during login:',err.message);
        })
    };

    const logoutUser = ()=>{
        localStorage.clear();
        setUserLoginStatus(false);
        setLoggedInUser({});
        window.location.reload();
        window.location.href = "/"; 
    };
        return (
            <loginContext.Provider value = {[loggedInUser,loginErr,userLoginStatus,loginUser,logoutUser]}>
                {children}
            </loginContext.Provider>
        );
    
}
export default UserLoginStore;