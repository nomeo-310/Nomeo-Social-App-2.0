import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import axios from 'axios';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostForm = () => {
    
    const {user} = useContext(UserContext);
    const [description, setDescription] = useState('');
    const [postImage, setPostImage] = useState('');

    const handleSubmit = async (event)=> {
        event.preventDefault();
        const userId = user.user._id;
        const userName = user.user.userName;
        const location = user.user.location;
        const profilePicture = user.user.profilePicture;

        const data = new FormData();
        data.append('userId', userId);
        data.append('userName', userName);
        data.append('location', location)
        data.append('description', description);
        data.append('postImage', postImage);
        data.append('profilePicture', profilePicture);
        try {
            await axios.post('/api/posts', data);
            alert('post created successfully');
            window.location.reload();
        } catch (error) {
            alert('error creating posts');
        }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='border-b p-3 lg:p-4 flex gap-2'>
                <Link to={`/profile/${user.user._id}`}>
                    <Avatar profileImage={user.user.profilePicture}/>
                </Link>
                <textarea placeholder={`What's on your mind today ${user.user.fullName}?`} className='grow p-3 h-10 md:h-16 rounded-full text-xs lg:text-sm placeholder:text-sm bg-gray-200 placeholder:text-black placeholder:dark:text-white dark:bg-inherit dark:border outline-none resize-none' value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>
            <div className='p-3 lg:p-4'>
                <div className='flex justify-between'>
                    <div className='flex gap-3 lg:gap-5'>
                        <label className='flex gap-1 items-center cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:w-5 lg:h-5 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <h2 className='text-sm text-gray-400 dark:text-white'>Image</h2>
                            <input type="file" className='hidden' name='postImage' id='file' onChange={(event) => setPostImage(event.target.files[0])}/>
                        </label>
                        <div className='flex gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:w-5 lg:h-5 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                            </svg>
                            <h2 className='text-sm text-gray-400 dark:text-white'>Clip</h2>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:w-5 lg:h-5 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                            <h2 className='text-sm text-gray-400 dark:text-white'>Audio</h2>
                        </div>
                    </div>
                    <button type="submit" className='bg-secondary dark:bg-primary text-white py-1 px-3 lg:px-4 rounded-full text-sm' disabled={description === ''}>Post</button>
                </div>
                {postImage && 
                    <div className="w-3/4 lg:w-1/2 relative">
                        <Card>
                            <img src={URL.createObjectURL(postImage)} alt="" className='rounded-md overflow-hidden mt-2'/>
                        </Card>
                        <FaTimesCircle className='absolute top-2 right-2 text-xl cursor-pointer' onClick={()=> setPostImage(null)}/>
                    </div>
                }
            </div>
        </form>
    </Card>
  );
}

export default PostForm;
