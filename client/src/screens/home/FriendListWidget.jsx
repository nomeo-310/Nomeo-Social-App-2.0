import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';
import Card from '../../components/Card';
import SmallAvatar from '../../components/SmallAvatar';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';


const FriendListWidget = ({onClick}) => {
    const [allUser, setAllUser] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const {user} = useContext(UserContext);
    const userId = user.user._id;

    useEffect(() => {
        axios.get(`api/user/${userId}`).then(({data}) => {
            setCurrentUser(data);
            })
    }, [userId]);

    useEffect(() => {
        axios.get('api/user').then(({data}) => {
            setAllUser(data);
          })
    }, []);
    console.log(allUser)

    const newAll = allUser.filter(user => user._id !== currentUser._id);
    newAll.unshift(currentUser);

    const Friend =({friendDetails: {_id, profilePicture, fullName, userName, occupation}})=> {
        const [alreadyFriend, setAlreadyFriend] = useState(false);
        const friendId = _id

         useEffect(() => {
            if (allUser.includes(friendId)) {
                setAlreadyFriend(true)
            }
         }, [friendId]);

        const addRemoveFriend =()=> {
            try {
                axios.put(`api/user/${userId}/${friendId}`, {userId, friendId});
                alert('friend added');
                window.location.reload();
            } catch (error) {
                alert('error adding friend');
            }
        }
        
        return (
        <div className='flex gap-2 items-center border-b py-2 px-3 lg:px-4 last:border-b-0'>
            <Link className="" to={`/profile/${_id}`}>
                <SmallAvatar profileImage={profilePicture}/>
            </Link>
            <div className='flex justify-between items-center grow'>
                <div>
                    <h2 className='capitalize text-sm font-semibold'>{fullName}</h2>
                    <h2 className='capitalize text-xs text-gray-400 dark:text-white'>{userName}</h2>
                    <h2 className='capitalize text-xs text-gray-400 dark:text-white'>{occupation}</h2>
                </div>
                { _id === currentUser._id ? '' 
                : 
                    <button className='p-[6px] rounded-full flex justify-center items-center bg-secondary/[0.48] dark:bg-primary/[0.48]' onClick={addRemoveFriend}>
                        {alreadyFriend ? <FaUserMinus/> : <FaUserPlus/>}
                    </button>
                }

            </div>
        </div>
        )
    }
  return (
    <Card>
        <div className='pb-2'>
            <div className="flex justify-between items-center">
              <h2 className='capitalize text-sm lg:text-base font-semibold p-3 lg:p-4'>All users ({allUser.length})</h2>
              <button className='mr-3 text-xs py-1 px-3 rounded-full bg-secondary dark:bg-primary text-white md:hidden' onClick={onClick}>Close</button>
            </div>
            { newAll.map((user) => (
                <Friend key={user.userName} friendDetails={user}/>
            ))}
        </div>
    </Card>
  );
}

export default FriendListWidget;
