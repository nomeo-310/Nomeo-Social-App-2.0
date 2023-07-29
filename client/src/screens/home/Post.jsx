import React from 'react';
import { useState } from 'react';
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import chatIcon from '../../assets/images/comment.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import SmallAvatar from '../../components/SmallAvatar';
import axios from 'axios';
import moment from 'moment';


const Post = ({postDetails:{_id, userId, profilePicture, userName, postPicture, comments, description, likes, createdAt, location}}) => {
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
            if (likes.includes(user.user._id)) {
                await axios.put(`api/posts/${id}/like`, {id, userId, postId})
                alert('You just unliked this post')
                window.location.reload();
            } else {
                await axios.put(`api/posts/${id}/like`, {id, userId, postId})
                alert('You just liked this post')
                window.location.reload();
            }
        } catch (error) {
            alert('You could not like the post')
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

    const [showMenu, setShowMenu] = useState(false)
 
    const Comment = ({profilePicture, commentText})=> {
        return (
            <div className='border flex items-center gap-2 py-1 rounded-full pl-1 pr-4'>
                <div className='float-left'>
                    <SmallAvatar isextraSmall={true} profileImage={profilePicture}/>
                </div>
                <h2 className='text-xs lg:text-sm text-justify'>{commentText}</h2>
            </div>
        )
    }

    const deletePost = async ()=> {
        try {
            await axios.delete(`api/posts/${postId}/${userId}`);
            confirm('Are you sure you want to delete this post?');
            alert('post deleted');
            window.location.reload();
        } catch (error) {
            alert('post not deleted');
        }
    }

  return (
    <Card>
        <div className='flex justify-between items-center mb-3 px-3 pt-3 lg:px-4 lg:pt-4 relative'>
            <div className='flex gap-3'>
                <Link to={`/profile/${userId}`}>
                    <SmallAvatar profileImage={profilePicture}/>
                </Link>
                <div>
                    <h2 className='text-sm font-semibold'>@{userName}</h2>
                    <h2 className='text-xs capitalize'>{location}</h2>
                </div>
                <h2 className='text-sm font-medium'>{moment(createdAt, 'YYYY-MM-DD').fromNow()}</h2>
            </div>
            { id === userId && 
                <button onClick={() => setShowMenu(!showMenu)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </button>
            }
            { showMenu && 
            <div className='absolute right-4 top-16'>
                <div className='bg-white border rounded-md dark:bg-[#31302c] px-1'>
                    <div className='py-1'>
                        <ul className='w-32 lg:w-36'>
                            <button className='flex justify-between rounded-md px-1 hover:bg-secondary/[0.45] dark:hover:bg-primary/[0.5] py-1 w-full' onClick={()=> setShowMenu(false)}>
                                <h2 className='text-sm'>Edit post</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            <button className='flex justify-between rounded-md px-1 hover:bg-secondary/[0.45] dark:hover:bg-primary/[0.5] py-1 w-full' onClick={deletePost}>
                                <h2 className='text-sm'>Delete Post</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                            <button className='flex justify-between rounded-md px-1 hover:bg-secondary/[0.45] dark:hover:bg-primary/[0.5] py-1 w-full' onClick={deletePost}>
                                <h2 className='text-sm'>Save Post</h2>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            </button>
                        </ul>
                    </div>
                </div>
            </div> }

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
            <div className=' p-3 lg:p-4 flex items-center justify-center rounded-md'>
                <img src={'http://localhost:8000/assets/' + postPicture } alt="post_img" className='rounded-md'/>
            </div>
        : ""}
        <div className='p-3 lg:p-4 pt-0 lg:pt-0 flex gap-4 items-center'>
            <button className='flex gap-1 items-center' onClick={handleLike}>
                {isliked ? <span className='text-secondary dark:text-primary'><FaHeart/></span> : <FaRegHeart/>}
                <h2 className='text-xs lg:text-sm'>{like === 0 ? null : like}</h2>
            </button>
            <button className='flex gap-1 items-center' onClick={() => setShowComment(!showComment)}>
                <span className='w-[18px]'><img src={chatIcon}/></span>
                <h2 className='text-xs lg:text-sm'>{comments.length === 0 ? '' : comments.length}</h2>
            </button>
        </div>

        { showComment &&  (
            <div className='border-t p-3 lg:p-4'>
                <div className='mb-3 flex flex-col gap-2'>
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
