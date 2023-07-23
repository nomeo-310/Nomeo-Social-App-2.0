import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import axios from 'axios';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { FaImage, FaMicrophone, FaPaperclip, FaTimesCircle } from 'react-icons/fa';
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
                <textarea placeholder={`What's on your mind today ${user.user.fullName}?`} className='grow p-3 h-10 md:h-12 text-xs lg:text-sm rounded-full placeholder:text-sm bg-gray-200 placeholder:text-black placeholder:dark:text-white dark:bg-inherit dark:border outline-none resize-none' value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>
            <div className='p-3 lg:p-4'>
                <div className='flex justify-between'>
                    <div className='flex gap-3 lg:gap-5'>
                        <label className='flex gap-1 items-center cursor-pointer'>
                            <FaImage/>
                            <h2 className='text-sm text-gray-400 dark:text-white'>Image</h2>
                            <input type="file" className='hidden' name='postImage' id='file' onChange={(event) => setPostImage(event.target.files[0])}/>
                        </label>
                        <div className='flex gap-1 items-center'>
                            <FaPaperclip/>
                            <h2 className='text-sm text-gray-400 dark:text-white'>Clip</h2>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <FaMicrophone/>
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
