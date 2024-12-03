import { User } from "@types";

const getAllUsers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    });
  };

  const LoginUser = async (user : User) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(user)
      
    });
  };
  
  const addUser = async (username: string, password: string, email: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({username, password, email})
    });
  };
  
  const LecturerService = {
    getAllUsers,
    LoginUser,
    addUser
  };  


  
  export default LecturerService;