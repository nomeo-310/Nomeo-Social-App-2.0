import axios from "axios";

export const loginCalls = async (userCredentials, dispatch) => {
    dispatch({type:'LOGIN_START'});
    try {
        const response = await axios.post('api/auth/login', userCredentials);
        alert('login successful');
        dispatch({type:'LOGIN_SUCCESS', payload:response.data});
    } catch (error) {
        alert('login not successful');
        dispatch({type:'LOGIN_FAILURE', payload:error});
    }
}
