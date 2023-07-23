import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SmallAvatar from '../../components/SmallAvatar';
import { FaUserCog, FaMapMarkerAlt, FaBriefcase, FaPeopleArrows, FaPen, FaTwitter, FaLinkedin, FaMagic, FaTimesCircle } from 'react-icons/fa';
import Header from '../home/Header';
import Avatar from '../../components/Avatar';
import FriendListWidget from '../home/FriendListWidget';
import ProfileWidget from '../home/ProfileWidget';
import Post from '../home/Post';
import PostForm from '../home/PostForm';
import ProfileForm from './ProfileForm';
import Card from '../../components/Card';

import axios from 'axios';


const Profile = () => {
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const [profile, setProfile] = useState('');
    const [friends, setFriends] = useState([]);
    const [posts, setPosts] = useState([]);
    const [showFriends, setShowFriends] = useState(false);
    const [showProfileEdit, setShowProfileEdit] = useState(false);

    const [coverPicture, setCoverPicture] = useState('');
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        axios.get(`api/user/${id}`).then(({data}) => {
            setProfile(data);
          })
      }, [id]);

      useEffect(() => {
        axios.get(`api/posts/timeline/${id}`).then(({data}) => {
            setPosts(data);
          })
      }, [id]);

      useEffect(() => {
        axios.get(`api/user/${id}/friends`).then(({data}) => {
            setFriends(data);
          });
      }, [id]);

      const handleUpload = async (event)=> {
        event.preventDefault();
        const data = new FormData();
        data.append('coverImage', coverPicture);
        try {
            await axios.patch(`api/user/${id}/image`, data)
            alert('cover picture successfully set');
            setShowButton(false);
        } catch (error) {
            alert('error setting cover picture');
        }
      }

      const handleCancel =()=> {
        setCoverPicture(null);
        setShowButton(false)
      }

  return (
    <div className='w-full min-h-screen md:pb-10 pb-6'>
        <Header/>
        <div className="pt-16 lg:pt-24 md:pt-20 flex-col md:flex-row lg:w-[78%] md:w-[92%] mx-auto flex md:gap-4 w-[92%]">
            <div className='hidden md:block lg:w-[35%] md:w-[40%]'>
                <ProfileWidget profileDetails={profile}/>
                <Card>
                { friends.length > 0 && <h2 className='capitalize text-sm lg:text-base font-semibold p-3 lg:p-4'>Friends</h2>}
                    { friends.length > 0 && friends.map((friend) => (
                        <div className='flex gap-2 items-center border-b py-2 px-3 lg:px-4 last:border-b-0' key={friend._id}>
                            <Link className="" to={`/profile/${friend._id}`}>
                                <SmallAvatar profileImage={friend.profilePicture}/>
                            </Link>
                            <div className='flex justify-between items-center grow'>
                                <div>
                                    <h2 className='capitalize text-sm font-semibold'>{friend.fullName}</h2>
                                    <h2 className='capitalize text-xs text-gray-400 dark:text-white'>{friend.userName}</h2>
                                    <h2 className='capitalize text-xs text-gray-400 dark:text-white'>{friend.occupation}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </Card>
            </div>
            <div className='lg:w-[65%] md:w-[60%]'>
                <Card>
                    { coverPicture ? 
                    <div className="h-32 md:h-36 lg:h-48 overflow-hidden flex items-start justify-start rounded-t-md">
                        <img src={URL.createObjectURL(coverPicture)} alt="" className='rounded-t-md'/>
                    </div> :
                    <div className="h-32 md:h-36 lg:h-48 overflow-hidden flex items-start justify-start rounded-t-md">
                        <img src={profile.coverPicture ? `http://localhost:8000/assets/`+ profile.coverPicture : `http://localhost:8000/assets/banner_fallback.jpg` } alt="" className='rounded-t-md'/>
                    </div>
                    }
                    <form encType='multipart/form-data' onSubmit={handleUpload}>
                        <label htmlFor="file" className='flex justify-end -mt-5 pr-3'>
                            <input type="file" name="coverImage" id="file" className='hidden' onChange={(event) => setCoverPicture(event.target.files[0])}/>
                            {user.user._id === id && <FaPen className='text-white' onClick={()=> setShowButton(true)}/>}
                        </label>
                        { showButton && 
                            <div className="flex gap-3 float-right">
                                <button type="submit" className='float-right bg-secondary dark:bg-primary mr-3 px-2 capitalize text-white rounded-full mt-2 text-sm'>save</button>
                                <span className='float-right bg-secondary dark:bg-primary mr-3 px-2 capitalize text-white rounded-full mt-2 text-sm' onClick={handleCancel}>cancel</span>
                            </div>
                        }
                    </form>
                    <div className='px-3 lg:px-4 -mt-20'>
                        <Avatar isBig={true} profileImage={profile.profilePicture}/>
                        <h2 className='text-sm mt-2 lg:mt-3 text-justify'>{profile.description}</h2>
                    </div>
                    <Card>
                        <div className="border-b md:border-0 p-3 lg:p-4">
                            <div className="flex justify-between w-full items-center">
                                <div>
                                    <h2 className='text-xs lg:text-sm text-gray-400 dark:text-white'>@{profile.userName}</h2>
                                    <h2 className='capitalize text-sm lg:text-base font-semibold'>{profile.fullName}</h2> 
                                    <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white mb-4 md:mb-0'>{profile.friends}</h2>
                                    <button className='bg-secondary dark:bg-primary py-1 px-3 md:hidden text-sm rounded-full text-white' onClick={()=> setShowFriends(!showFriends)}>View all users</button>
                                </div>
                                {user.user._id === id && 
                                    <button className="text-lg flex items-center gap-2" onClick={()=> setShowProfileEdit(!showProfileEdit)}>
                                        <h2 className='text-sm lg:text-base'>Edit profile </h2><FaUserCog/>
                                    </button>
                                }
                            </div>
                        </div>
                        <div className="border-b p-3 lg:p-4 flex flex-col gap-1 lg:gap-2 md:hidden">
                            <div className='flex gap-2'>
                            <FaMapMarkerAlt/>
                            <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>{profile.location}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <FaBriefcase/>
                                <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>{profile.occupation}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <FaPeopleArrows/>
                                <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>{profile.relationship}</h2>
                            </div>
                            <div className='flex gap-2'>
                                <FaMagic/>
                                <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>{profile.hobby}</h2>
                            </div>
                        </div>
                        <div className="border-b p-3 lg:p-4 flex flex-col gap-1 lg:gap-2 md:hidden">
                            <div className='flex items-center justify-between'>
                            <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>Who's viewed your profile today</h2>
                            <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>{profile.viewedProfile}</h2>
                            </div>
                            <div className='flex items-center justify-between'>
                                <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>Impresssion of your post</h2>
                                <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>{profile.impressions}</h2>
                            </div>
                        </div>
                        <div className="p-3 lg:p-4 flex flex-col gap-1 lg:gap-2 md:hidden">
                            <h2 className='capitalize text-sm lg:text-base font-semibold mb-2'>social profiles</h2> 
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <FaTwitter/>
                                    <div>
                                        <h2 className="text-sm font-semibold">Twitter</h2>
                                        <h2 className="capitalize text-xs text-gray-400 dark:text-white">social network</h2>
                                    </div>
                                </div>
                                <FaPen/>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <FaLinkedin/>
                                    <div>
                                        <h2 className="text-sm font-semibold">Linkedin</h2>
                                        <h2 className="capitalize text-xs text-gray-400 dark:text-white">social network</h2>
                                    </div>
                                </div>
                                <FaPen/>
                            </div>
                        </div>
                    </Card>
                </Card>
                <div className='lg:w-[35%] md:w-[45%] md:hidden'>
                    { showFriends && <FriendListWidget onClick={() => setShowFriends(false)}/>}
                </div>
                { showProfileEdit && <ProfileForm/>}
                {user.user._id === profile._id ? <PostForm/> : ''}
                {posts.length > 0 && posts.map((post) => (
                    <Post postDetails={post} key={post._id}/>
                ))}
            </div>
        </div>
    </div>
  );
}

export default Profile;
