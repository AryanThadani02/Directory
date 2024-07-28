import  { useState } from 'react';

const RetrieveInformation = () => {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);
  const [message, setMessage] = useState('');

  const handleRetrieve = () => {
    const savedPeople = JSON.parse(localStorage.getItem('people') || '[]');
    const foundPerson = savedPeople.find((p) => p.aadhar === aadhar);
    if (foundPerson) {
      setPerson(foundPerson);
      setMessage('');
    } else {
      setPerson(null);
      setMessage('No match found');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          placeholder="Enter Aadhar Number"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleRetrieve} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
          Retrieve
        </button>
      </div>
      {person && (
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Date of Birth</th>
              <th className="py-3 px-4 border-b">Aadhar Number</th>
              <th className="py-3 px-4 border-b">Mobile Number</th>
              <th className="py-3 px-4 border-b">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{person.name}</td>
              <td className="py-2 px-4 border-b">{person.dob}</td>
              <td className="py-2 px-4 border-b">{person.aadhar}</td>
              <td className="py-2 px-4 border-b">{person.mobile}</td>
              <td className="py-2 px-4 border-b">{person.age}</td>
            </tr>
          </tbody>
        </table>
      )}
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default RetrieveInformation;
