import  { useState } from 'react';  
import EntryModal from './EntryModal';  

function ParentComponent() {  
  const [isOpen, setIsOpen] = useState(false);  
  const [entry, setEntry] = useState(null);  

  const handleOpenModal = (entry) => {  
    setEntry(entry);  
    setIsOpen(true);  
  };  

  const handleCloseModal = () => {  
    setIsOpen(false);  
    setEntry(null); // Clear the entry when closing  
  };  

  return (  
    <div>  
      {entries.map((entry) => (  
        <div key={entry.title} onClick={() => handleOpenModal(entry)}>  
          <h3>{entry.title}</h3>  
        </div>  
      ))}  
      <EntryModal isOpen={isOpen} onClose={handleCloseModal} entry={entry} />  
    </div>  
  );  
}  

export default ParentComponent;