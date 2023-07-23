import React from 'react';

const Card = ({children, isPadded}) => {
    const padded = 'relative dark:bg-[#31302c] dark:text-white bg-white p-3 lg:p-4 rounded-md shadow-md shadow-gray-300 mb-4 dark:shadow-none'
    const unpadded =  'relative dark:bg-[#31302c] dark:text-white bg-white rounded-md shadow-md shadow-gray-300 mb-4 dark:shadow-none'
  return (
    <div className={isPadded ? padded : unpadded}>
      {children}
    </div>
  );
}

export default Card;
