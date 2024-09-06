import { useState, useEffect } from 'react';
import Header from './Header';
import EntryList from './EntryList';
import AddEntryModal from './AddEntryModal';

function HomePage() {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const storedEntries = localStorage.getItem('entries' || []);
  
  useEffect(() => {  
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntryClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveEntry = (entry) => {
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-red-400 to-gray-700">
      <div className="flex justify-center mb-6">
        <img src="http://i.huffpost.com/gen/2395634/images/o-DIARY-facebook.jpg" alt="Login Illustration" className="h-100% w-100% sm:h-40 sm:w-40 lg:w-60 lg:h-60" />
      </div>
      <div className="flex justify-center mb-6">
        <Header onAddEntryClick={handleAddEntryClick} />
      </div>
      <EntryList entries={entries} />
      <AddEntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEntry}
        entries={entries}
      />
    </div>
  );
}

export default HomePage;
