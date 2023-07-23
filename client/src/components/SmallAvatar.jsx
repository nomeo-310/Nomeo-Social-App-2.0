import React from 'react';

const SmallAvatar = ({isextraSmall, profileImage}) => {
    const small = 'w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center'
    const extraSmall = 'w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden flex items-center justify-center'
  return (
    <div className={isextraSmall ? extraSmall : small}>
      { profileImage ?  
        <img src={'http://localhost:8000/assets/' + profileImage } alt="profile_img" className='w-full h-full object-cover'/>
      :
        <img src={'http://localhost:8000/assets/default_user.png'} alt="profile_img"/>
      }
    </div>
  );
}

export default SmallAvatar;
