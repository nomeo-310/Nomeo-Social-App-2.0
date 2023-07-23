import React from 'react';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { FaUserPlus, FaMapMarkerAlt, FaBriefcase, FaPeopleArrows, FaPen, FaTwitter, FaLinkedin, FaMagic } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../components/context/UserContext';
import axios from 'axios';

const ProfileWidget = () => {
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const [profile, setProfile] = useState('')

    useEffect(() => {
        axios.get(`api/user/${id}`).then(({data}) => {
            setProfile(data);
          })
      }, [id]);

    const format =(value)=> {
        if (value === 0 || value === null || value === '') {
           return '' 
        } else if (value === 1) {
            return '1 Friend'
        } else {
            return value + ' Friends'
        }
    }
  return (
    <Card>
        <div className="border-b md:border-b-0 p-3 lg:p-4 flex gap-2 lg:gap-3">
            <div className="grow">
                <Avatar profileImage={profile.profilePicture}/>
            </div>
            <div className="flex justify-between w-full items-center">
                <div>
                    <h2 className='text-xs lg:text-sm text-gray-400 dark:text-white'>@{profile.userName}</h2>
                    <h2 className='capitalize text-sm lg:text-base font-semibold'>{profile.fullName}</h2> 
                </div>
            </div>
        </div>
        <div className="border-b p-3 lg:p-4 flex flex-col gap-1 lg:gap-2">
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
        <div className="border-b p-3 lg:p-4 flex flex-col gap-1 lg:gap-2">
            <div className='flex items-center justify-between'>
            <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>Who's viewed your profile today</h2>
            <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>{profile.viewedProfile}</h2>
            </div>
            <div className='flex items-center justify-between'>
                <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>Impresssion of your post</h2>
                <h2 className='capitalize text-xs lg:text-sm text-gray-400 dark:text-white'>{profile.impressions}</h2>
            </div>
        </div>
        <div className="p-3 lg:p-4 flex flex-col gap-1 lg:gap-2">
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
  );
}

export default ProfileWidget;
