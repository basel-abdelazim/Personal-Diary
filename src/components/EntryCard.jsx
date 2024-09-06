import React from 'react';  
import PropTypes from 'prop-types';  

function EntryCard({ entry, onClick }) {  

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if(loggedInUser.email !== entry.email) return null;
  return (  
    <div  
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"  
      onClick={onClick}  
    >  
      <img  
        src="https://picsum.photos/200/300" 
        alt={entry.title}  
        className="h-40 w-full object-cover rounded-md mb-3"  
        onError={(e) => {  
          e.target.onerror = null; // prevents looping  
          e.target.src = 'path/to/placeholder/image.jpg'; // fallback image  
        }}  
      />  
      <h2 className="text-xl font-semibold text-gray-800">{entry.title}</h2>  
      <p className="text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>  
    </div>  
  );  
}  

EntryCard.propTypes = {  
  entry: PropTypes.object.isRequired,  
  onClick: PropTypes.func.isRequired,  
};  

export default EntryCard;