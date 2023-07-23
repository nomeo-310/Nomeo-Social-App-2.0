import React from 'react';
import Post from './Post';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import { useEffect } from 'react';
import axios from 'axios';
import Moment from 'moment';


const Feeds = () => {
  const [posts, setPosts] = useState([]);

  const {user} = useContext(UserContext);
  
  useEffect(() => {
    if (user) {
          axios.get('api/posts').then(({data}) => {
            setPosts(data.sort((p1, p2) => {return new Moment(p2.createdAt).format('YYYYMMDD') - new Moment(p1.createdAt).format('YYYYMMDD')}));
          })
      }
  }, [user]);


  return (
    <div>
        {  posts.map((post) => (
            <Post postDetails={post} key={post._id}/>
        ))}
    </div>
  );
}

export default Feeds;
