import React from 'react';
import { useState } from 'react';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import SmallAvatar from '../../components/SmallAvatar';
import { FaHeart, FaRegHeart, FaUserPlus } from 'react-icons/fa';
import {HiOutlineChatAlt} from 'react-icons/hi'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';

const Post = ({postDetails:{_id, userId, profilePicture, userName, postPicture, comments, description, likes, createdAt}}) => {
    const { user } = useContext(UserContext)
    const [showComment, setShowComment] = useState(false);
    const [like, setLike] = useState(likes.length);
    const [isliked, setIsLiked] = useState(false);

    const id = user.user._id;
    const postId = _id;

    useEffect(() => {
        if (likes.includes(user.user._id)) {
            setIsLiked(true);
        }
    }, [user.user._id]);

    const handleLike = async ()=> {
        setLike( isliked ? like - 1 : like + 1);
        setIsLiked( !isliked);
        try {
            await axios.put(`api/posts/${id}/like`, {id, userId, postId})
            window.location.reload();
        } catch (error) {
            alert('you could not like the post')
        }
    }

    const [commentText, setCommentText] = useState('');

    const handleComment = async (event)=> {
        event.preventDefault();
        const profilePicture = user.user.profilePicture;
        const senderId = user.user._id;
        const data = { profilePicture, commentText, senderId}
        try {
            axios.put(`api/posts/${_id}/comments`, data);
            alert('comment created');
            window.location.reload();
        } catch (error) {
            alert('comment not created');
        }
    }

    const Comment = ({profilePicture, commentText})=> {
        return (
            <div className='border flex items-center gap-2 p-1 rounded-md'>
                <div className='float-left mr-1 lg:mr-2'>
                    <SmallAvatar isextraSmall={true} profileImage={profilePicture}/>
                </div>
                <h2 className='text-xs lg:text-sm text-justify'>{commentText}</h2>
            </div>
        )
    }
  return (
    <Card>
        <div className='flex justify-between items-center mb-3 px-3 pt-3 lg:px-4 lg:pt-4'>
            <div className='flex gap-3'>
                <Link to={`/profile/${userId}`}>
                    <SmallAvatar profileImage={profilePicture}/>
                </Link>
                <div>
                    <h2 className='text-sm font-semibold'>@{userName}</h2>
                    <h2 className='text-xs'>Lekki, Lagos</h2>
                </div>
                <h2 className='text-sm font-medium'>{moment(createdAt, 'YYYY-MM-DD').fromNow()}</h2>
            </div>
        </div>
        {postPicture ?         
            <div className='px-3 lg:px-4'>
                <p className='text-sm lg:text-base'>{description}</p>
            </div>
        :   <div className='px-3 lg:px-4 pb-3 lg:pb-4'>
                <p className='text-sm lg:text-base'>{description}</p>
            </div>
        }

        { postPicture ? 
            <div className=' overflow-hidden p-3 lg:p-4 flex items-center justify-center rounded-md'>
                <img src={'http://localhost:8000/assets/' + postPicture } alt="post_img" className='rounded-md'/>
            </div>
        : ""}
        <div className='p-3 lg:p-4 pt-0 lg:pt-0 flex gap-4 items-center'>
            <button className='flex gap-1 items-center' onClick={handleLike}>
                {isliked ? <span className='text-secondary dark:text-primary'><FaHeart/></span> : <FaRegHeart/>}
                <h2 className='text-xs lg:text-sm'>{like === 0 ? null : like}</h2>
            </button>
            <button className='flex gap-1 items-center' onClick={() => setShowComment(!showComment)}>
                <span className='text-xl'><HiOutlineChatAlt/></span>
                <h2 className='text-xs lg:text-sm'>{comments.length === 0 ? '' : comments.length}</h2>
            </button>
        </div>
        { showComment &&  (
            <div className='border-t p-3 lg:p-4'>
                <div className='mb-3'>
                    {comments.length > 0 && comments.map((comment) => (
                       <Comment key={comment.senderId} profilePicture={comment.profilePicture} commentText={comment.commentText}/> 
                    ))}
                </div>
                <form encType='multipart/form-data' onSubmit={handleComment}>
                    <div className='flex gap-2'>
                        <Avatar profileImage={user.user.profilePicture}/>
                        <textarea placeholder="Leave a comment..." 
                            className='grow p-3 h-10 md:h-12 text-xs lg:text-sm rounded-full placeholder:text-sm bg-gray-200 placeholder:text-black placeholder:dark:text-white dark:bg-inherit dark:border outline-none resize-none' 
                            value={commentText} onChange={(event)=> setCommentText(event.target.value)}>
                        </textarea>
                    </div>
                    <div className='flex justify-end'>
                    <button type="submit" className='bg-secondary dark:bg-primary text-white py-1 px-3 lg:px-4 rounded-full text-sm'>Post</button>
                    </div>
                </form>
            </div>
        )}
    </Card>
  );
}

export default Post;
