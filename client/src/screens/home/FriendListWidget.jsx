import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '../../components/Card';
import SmallAvatar from '../../components/SmallAvatar';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import ReactPaginate from 'react-paginate';
import './friendWidget.scss'


const FriendListWidget = () => {
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

    const newAll = allUser.filter(user => user._id !== currentUser._id);
    newAll.unshift(currentUser);

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffSet, setItemOffSet] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        const endOffSet = itemOffSet + itemsPerPage;
        setCurrentItems(newAll.slice(itemOffSet, endOffSet));
        setPageCount(Math.ceil(allUser.length / itemsPerPage));
    }, [itemOffSet, itemsPerPage, allUser]);

    const handlePageClick =(event)=> {
        const newOffset = (event.selected * itemsPerPage) % allUser.length;
        setItemOffSet(newOffset);
      }

    const UserPlus =()=> {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
        )
    }

    const UserMinus =()=> {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
        )
    }

    const AllUser =()=> {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        )
    }

    const Friend =({friendDetails: {_id, profilePicture, fullName, userName, occupation}})=> {
        const friendId = _id

        const addRemoveFriend =()=> {
            try {
                if (!currentUser?.followers?.includes(friendId)) {
                    axios.put(`api/user/${userId}/${friendId}`, {userId, friendId});
                    alert('Both of you are now friends');
                    window.location.reload();
                } else {
                    axios.put(`api/user/${userId}/${friendId}`, {userId, friendId});
                    alert('Both of you are no longer friends');
                    window.location.reload();
                }
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
                        { currentUser?.followers?.includes(friendId) ? <UserMinus/> : <UserPlus/>}
                    </button>
                }
            </div>
        </div>
        )
    }
  return (
    <Card>
        <div className='pb-2'>
            <div className="flex items-center p-3 lg:p-4 lg:gap-4 gap-3">
                <AllUser/>
              <h2 className='capitalize text-sm lg:text-base font-semibold'>All users ({allUser.length})</h2>
            </div>
            { currentItems.length > 0 && currentItems.map((user, index) => (
                <Friend key={index} friendDetails={user}/>
            ))}
            <div className="px-3 pt-3 lg:px-4 lg:pt-4 shrink">
                <div className="right-section-pagination w-full">
                <ReactPaginate
                  breakLabel={"..."}
                  nextLabel={'next'}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={6}
                  pageCount={pageCount}
                  previousLabel={'previous'}
                  renderOnZeroPageCount={null}
                  containerClassName='pagination'
                  pageLinkClassName='page-num'
                  activeClassName='active-num'
                  nextClassName='next'
                  previousClassName='prev'
                  marginPagesDisplayed={0}
                />
              </div>
            </div>
        </div>
    </Card>
  );
}

export default FriendListWidget;
