import  { useState } from 'react';
import AddNewPerson from './components/AddNewPerson';
import RetrieveInformation from './components/RetrieveInformation';

const App = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 mr-2 rounded-lg ${
            activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('add')}
        >
          Add New Person
        </button>
        <button
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'retrieve' ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('retrieve')}
        >
          Retrieve Information
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {activeTab === 'add' && <AddNewPerson />}
        {activeTab === 'retrieve' && <RetrieveInformation />}
      </div>
    </div>
  );
};

export default App;
