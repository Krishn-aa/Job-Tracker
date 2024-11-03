import { useState } from 'react';
import { addJob } from '../services/api';

const AddJobModal = ({ isOpen, onClose, companyId, onJobAdded }) => {
  const [jobName, setJobName] = useState('');
  const [techStack, setTechStack] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');

  const handleAddJob = async () => {
    console.log(companyId); // Check what this logs
    try {
      await addJob(companyId, {
        jobName,
        techStack: techStack.split(',').map((item) => item.trim()), // Ensuring tech stack is an array of strings
        linkedinURL,
      });
      onJobAdded();
      onClose();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Job</h2>
        <input
          type="text"
          placeholder="Job Name"
          className="w-full p-2 mb-2 border rounded"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tech Stack (comma separated)"
          className="w-full p-2 mb-2 border rounded"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          className="w-full p-2 mb-4 border rounded"
          value={linkedinURL}
          onChange={(e) => setLinkedinURL(e.target.value)}
        />
        <button
          onClick={handleAddJob}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Add Job
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddJobModal;
