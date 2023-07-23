import React from 'react';

const Avatar = ({isBig, profileImage}) => {
    const small = 'w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center'
    const big = 'w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden flex items-center justify-center'
  return (
    <div className={isBig ? big : small}>
      { profileImage ?  
        <img src={'http://localhost:8000/assets/' + profileImage } alt="profile_img" className='w-full h-full object-cover'/>
      :
        <img src={'http://localhost:8000/assets/default_user.png'} alt="profile_img"/>
      }
    </div>
  );
}

export default Avatar;
