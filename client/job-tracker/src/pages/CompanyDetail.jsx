import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobs, getContacts } from '../services/api';
import AddJobModal from '../components/AddJobModal';
import AddContactModal from '../components/AddContactModal.jsx';

const CompanyDetail = () => {
  const { companyId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const fetchJobs = async () => {
    const response = await getJobs(companyId);
    setJobs(response.data);
  };

  useEffect(() => {
    fetchJobs();
  }, [companyId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Details</h1>
      
      <h2 className="text-xl font-semibold">Jobs</h2>
      <ul className="space-y-4 mb-6">
        {jobs.map((job) => (
          <li key={job._id} className="border p-4 rounded">
            <p><strong>Job Name:</strong> {job.jobName}</p>
            <p><strong>Tech Stack:</strong> {job.techStack.join(', ')}</p>
            <a href={job.linkedinURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              LinkedIn Posting
            </a>
          </li>
        ))}
      </ul>

      <div className="space-x-4 mt-4">
        <button
          onClick={() => setIsJobModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Job
        </button>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add People
        </button>
      </div>

      <AddJobModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        companyId={companyId}
        onJobAdded={fetchJobs}
      />
      <AddContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        jobId={jobs[0]?._id}
        onContactAdded={fetchJobs} // Adjust to reload contacts if needed
      />
    </div>
  );
};

export default CompanyDetail;
