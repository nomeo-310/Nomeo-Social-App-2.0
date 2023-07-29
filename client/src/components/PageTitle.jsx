import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

//this function helps to change the title on switching between pages
const PageTitle =()=> {
    const location = useLocation(); //this helps to pick current location whenever page is changed from which pathname can be extracted
    const currentPath = location.pathname;
    const new_place = currentPath.split('/')[currentPath.split('/').length - 1]; 
    const {user} = useContext(UserContext)
    useEffect(() => {
        if (location.pathname === '/') {
           document.title = 'Nomeo Social 2.0 | Home' 
        }else if (new_place.includes(user.user._id)) {
            document.title = 'Nomeo Social 2.0 | Profile';
        } else {
            document.title = 'Nomeo Social 2.0 | Users';
        }
        console.log(location.pathname)
    }, [location.pathname])
    return null;
}

export default PageTitle;