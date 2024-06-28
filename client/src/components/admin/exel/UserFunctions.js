import axios from 'axios';

export const register = newUser => {
    return axios.post('users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log("Registered");
        window.alert("Registered");
    })
    .catch(err => {
        console.error("Error registering user:", err);
        throw err; // Propagate the error to handle it in the component
    });
};


export const login = async (user) => {
  try {
    const res = await axios.post('http://localhost:5000/users/login', {
      email: user.email,
      password: user.password
    });
    localStorage.setItem('usertoken', res.data);
    return res.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};
