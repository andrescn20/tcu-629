const fetchWithAuth = async (endpoint, options = {}, isAuthenticated = true) => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_API_URL;
  const url = baseUrl + endpoint;
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
