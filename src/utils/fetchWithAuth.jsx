const fetchWithAuth = async (url, options = {}, isAuthenticated = true) => {
    const token = localStorage.getItem("token");
  
    // If this request requires authentication, add the Authorization header
    if (isAuthenticated && token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  
    const response = await fetch(url, options);
    return response;
  };
  
  export default fetchWithAuth;
  