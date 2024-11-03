import { useState, useEffect } from "react";
import { getCompanies, getJobs, getContacts } from "../services/api";
import AddJobModal from "./AddJobModal";
import AddContactModal from "./AddContactModal";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [expandedPeople, setExpandedPeople] = useState({});
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCompanies();
      setCompanies(response.data);
    };
    fetchData();
  }, []);

  const toggleCompanyDetails = async (companyId) => {
    if (expandedCompany === companyId) {
      setExpandedCompany(null);
      setJobs([]); // Reset jobs when collapsing
      setContacts([]); // Reset contacts when collapsing
    } else {
      setExpandedCompany(companyId);
      const jobsResponse = await getJobs(companyId);
      const contactsResponse = await getContacts(companyId);
      setJobs(jobsResponse.data);
      setContacts(contactsResponse.data);
    }
  };

  const toggleJobs = (companyId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [companyId]: !prev[companyId],
    }));
  };

  const togglePeople = (companyId) => {
    setExpandedPeople((prev) => ({
      ...prev,
      [companyId]: !prev[companyId],
    }));
  };

  const handleJobAdded = () => {
    toggleCompanyDetails(selectedCompany); // Refresh job list after adding a job
  };

  const handleContactAdded = () => {
    toggleCompanyDetails(selectedCompany); // Refresh contact list after adding a contact
  };

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <div key={company._id} className="border p-4 rounded">
          <div className="flex justify-between items-center hover:bg-blue-100 cursor-pointer transition-colors duration-200">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <button
              onClick={() => toggleCompanyDetails(company._id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <img
                src={
                  expandedCompany === company._id
                    ? "/svgs/up-arrow.svg"
                    : "/svgs/down-arrow.svg"
                }
                alt={expandedCompany === company._id ? "Collapse" : "Expand"}
                className="w-4 h-4" // Adjust width and height as necessary
              />
            </button>
          </div>

          {expandedCompany === company._id && (
            <div className="mt-4">
              {/* Jobs Section */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">Jobs</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleJobs(company._id)}
                    className="flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <img
                      src={
                        expandedJobs[company._id]
                          ? "/svgs/up-arrow.svg"
                          : "/svgs/down-arrow.svg"
                      }
                      alt={
                        expandedJobs[company._id]
                          ? "Collapse Jobs"
                          : "Expand Jobs"
                      }
                      className="w-5 h-5" // Adjusted size for better visibility
                    />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCompany(company._id);
                      setIsJobModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                  >
                    Add Job
                  </button>
                </div>
              </div>

              {expandedJobs[company._id] && (
                <ul className="space-y-2 mb-4">
                  {jobs.map((job) => (
                    <li key={job._id} className="border p-2 rounded">
                      <p>
                        <strong>Job Name:</strong> {job.jobName}
                      </p>
                      <p>
                        <strong>Tech Stack:</strong> {job.techStack.join(", ")}
                      </p>
                      <a
                        href={job.linkedinURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        LinkedIn Posting
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* People Section */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">People</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePeople(company._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <img
                      src={
                        expandedPeople[company._id]
                          ? "/svgs/up-arrow.svg"
                          : "/svgs/down-arrow.svg"
                      }
                      alt={
                        expandedPeople[company._id]
                          ? "Collapse People"
                          : "Expand People"
                      }
                      className="w-4 h-4"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCompany(company._id);
                      setIsContactModalOpen(true);
                    }}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors duration-200"
                  >
                    Add People
                  </button>
                </div>
              </div>
              {expandedPeople[company._id] && (
                <ul className="space-y-2 mb-4">
                  {contacts.map((contact) => (
                    <li key={contact._id} className="border p-2 rounded">
                      <p>
                        <strong>Name:</strong> {contact.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {contact.email}
                      </p>
                      <a
                        href={contact.linkedinURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Modals for Adding Job and Contact */}
      <AddJobModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        companyId={selectedCompany}
        onJobAdded={handleJobAdded}
      />
      <AddContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        companyId={selectedCompany}
        onContactAdded={handleContactAdded}
      />
    </div>
  );
};

export default CompanyList;
