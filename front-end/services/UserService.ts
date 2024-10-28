const getAllUsers = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      }
    });
  };
  
  const LecturerService = {
    getAllUsers,
  };
  
  export default LecturerService;