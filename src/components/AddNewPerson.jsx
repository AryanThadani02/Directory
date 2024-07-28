import { useState } from 'react';

const AddNewPerson = () => {
  const [people, setPeople] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleAddRow = () => {
    setPeople([...people, { name: '', dob: '', aadhar: '', mobile: '', age: '' }]);
    setErrors([...errors, { name: '', dob: '', aadhar: '', mobile: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPeople = [...people];
    const updatedErrors = [...errors];
    updatedPeople[index][field] = value;
    
    // Clear errors on change
    updatedErrors[index][field] = '';
    
    if (field === 'dob') {
      const age = calculateAge(value);
      updatedPeople[index].age = age;
    }
    
    setPeople(updatedPeople);
    setErrors(updatedErrors);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  const handleSave = (index) => {
    const person = people[index];
    let valid = true;
    const newErrors = { name: '', dob: '', aadhar: '', mobile: '' };

    if (!person.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!person.dob) {
      newErrors.dob = 'Date of Birth is required';
      valid = false;
    }
    if (!person.aadhar || person.aadhar.length !== 12 || !/^\d+$/.test(person.aadhar)) {
      newErrors.aadhar = 'Aadhar must be 12 digits';
      valid = false;
    }
    if (!person.mobile || person.mobile.length !== 10 || !/^\d+$/.test(person.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits';
      valid = false;
    }

    if (valid) {
      const updatedPeople = [...people];
      const savedPeople = JSON.parse(localStorage.getItem('people') || '[]');
      savedPeople.push(person);
      localStorage.setItem('people', JSON.stringify(savedPeople));
      updatedPeople[index].saved = true;
      setPeople(updatedPeople);
    } else {
      const updatedErrors = [...errors];
      updatedErrors[index] = newErrors;
      setErrors(updatedErrors);
    }
  };

  const handleDelete = (index) => {
    const updatedPeople = [...people];
    if (updatedPeople[index].saved) {
      const savedPeople = JSON.parse(localStorage.getItem('people') || '[]');
      const newSavedPeople = savedPeople.filter((p) => p.aadhar !== updatedPeople[index].aadhar);
      localStorage.setItem('people', JSON.stringify(newSavedPeople));
    }
    updatedPeople.splice(index, 1);
    setPeople(updatedPeople);
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  return (
    <div>
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Date of Birth</th>
            <th className="py-3 px-4 border-b">Aadhar Number</th>
            <th className="py-3 px-4 border-b">Mobile Number</th>
            <th className="py-3 px-4 border-b">Age</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="border p-2 rounded w-full"
                />
                {errors[index]?.name && <p className="text-red-500 text-xs mt-1">{errors[index].name}</p>}
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="date"
                  value={person.dob}
                  onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
                  className="border p-2 rounded w-full"
                />
                {errors[index]?.dob && <p className="text-red-500 text-xs mt-1">{errors[index].dob}</p>}
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  value={person.aadhar}
                  onChange={(e) => handleInputChange(index, 'aadhar', e.target.value)}
                  className="border p-2 rounded w-full"
                />
                {errors[index]?.aadhar && <p className="text-red-500 text-xs mt-1">{errors[index].aadhar}</p>}
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  value={person.mobile}
                  onChange={(e) => handleInputChange(index, 'mobile', e.target.value)}
                  className="border p-2 rounded w-full"
                />
                {errors[index]?.mobile && <p className="text-red-500 text-xs mt-1">{errors[index].mobile}</p>}
              </td>
              <td className="py-2 px-4 border-b">
                <input type="text" value={person.age} readOnly className="border p-2 rounded w-full bg-gray-100" />
              </td>
              <td className="py-2 px-4 border-b flex justify-center">
                <button onClick={() => handleSave(index)} className="bg-green-500 text-white px-3 py-1 mr-2 rounded">
                  Save
                </button>
                <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow} className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
        Add New Person
      </button>
    </div>
  );
};

export default AddNewPerson;
