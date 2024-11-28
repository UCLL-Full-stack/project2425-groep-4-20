const getAllUsers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    });
  };

  const LoginUser = async (username: string, password: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/login', {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
      
    });
  };
  
  
  const LecturerService = {
    getAllUsers,
    LoginUser
  };  


  
  export default LecturerService;