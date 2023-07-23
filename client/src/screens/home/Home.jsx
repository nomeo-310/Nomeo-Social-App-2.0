import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import Header from './Header';
import ProfileWidget from './ProfileWidget';
import Feeds from './Feeds';
import PostForm from './PostForm';
import FriendListWidget from './FriendListWidget';



const Home = () => {
    const {user} = useContext(UserContext);
  return (
    <div className='w-full min-h-screen md:pb-10 pb-6'>
        <Header/>
        <div className="pt-16 lg:pt-24 md:pt-20 flex-col md:flex-row lg:w-[78%] mx-auto flex md:gap-4 w-[92%]">
            <div className='lg:w-[35%] md:w-[45%]'>
                <div className='mt-3 md:mt-0 hidden md:block'>
                    <FriendListWidget/>
                </div>
            </div>
            <div className='lg:w-[65%] md:w-[55%]'>
                <PostForm/>
                <Feeds/>
            </div>
        </div>
    </div>
  );
}

export default Home;
