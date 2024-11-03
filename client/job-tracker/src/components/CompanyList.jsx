import { useState, useEffect } from "react";
import {
  getCompanies,
  getJobs,
  getContacts,
  deleteCompany,
} from "../services/api";
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

  // Define a color palette for company backgrounds
  const companyColors = [
    "#f8d7da", // Light red
    "#d1ecf1", // Light blue
    "#d4edda", // Light green
    "#fff3cd", // Light yellow
    "#d9edf7", // Light cyan
    "#f5f5f5", // Light gray
    "#ffeeba", // Light amber
  ];

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

  const handleDeleteCompany = async (companyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (confirmDelete) {
      try {
        await deleteCompany(companyId);
        // Filter out the deleted company from the list
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company._id !== companyId)
        );
        // Optionally, you can collapse the expanded company details
        if (expandedCompany === companyId) {
          setExpandedCompany(null);
        }
      } catch (error) {
        console.error("Error deleting company:", error);
        alert("There was an error deleting the company. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-4 mt-5">
      {companies.map((company, index) => (
        <div
          key={company._id}
          className="border rounded"
          style={{
            backgroundColor: companyColors[index % companyColors.length],
          }} // Apply color from palette
        >
          <div
            className="rounded p-4 hover:bg-blue-300 cursor-pointer transition-colors duration-200"
            onClick={() => toggleCompanyDetails(company._id)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <div className="flex">
                <img
                  src="/svgs/delete-btn.svg"
                  alt="delete"
                  className="w-7 h-7 mx-3 hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => handleDeleteCompany(company._id)}
                />
                <button className="text-gray-500 hover:text-gray-700">
                  <img
                    src={
                      expandedCompany === company._id
                        ? "/svgs/up-arrow.svg"
                        : "/svgs/down-arrow.svg"
                    }
                    alt={
                      expandedCompany === company._id ? "Collapse" : "Expand"
                    }
                    className="w-7 h-7" // Adjust width and height as necessary
                  />
                </button>
              </div>
            </div>
          </div>

          {expandedCompany === company._id && (
            <div className="m-4">
              {/* Jobs Section */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="w-40 text-lg font-bold flex items-center justify-between text-gray-600 hover:text-gray-800 transition-colors duration-200 bg-white border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                  Jobs
                  <button
                    className="flex items-center justify-center text-gray-600 px-5"
                    onClick={() => toggleJobs(company._id)}
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
                      className="w-5 h-5"
                    />
                  </button>
                </h3>
                <button
                  onClick={() => {
                    console.log("Adding job for company ID:", company._id); // Debug log
                    setSelectedCompany(company._id);
                    setIsJobModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-3 w-40 py-3 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  Add Job
                </button>
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
              <div className="flex justify-between mb-2">
                <h3 className="w-40 text-lg font-bold flex items-center justify-between text-gray-600 hover:text-gray-800 transition-colors duration-200 bg-white border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                  People
                  <button
                    className="flex items-center justify-center text-gray-600 px-5"
                    onClick={() => togglePeople(company._id)}
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
                      className="w-5 h-5"
                    />
                  </button>
                </h3>
                <button
                  onClick={() => {
                    setSelectedCompany(company._id);
                    setIsContactModalOpen(true);
                  }}
                  className="bg-green-500 text-white px-3 w-40 py-1 rounded hover:bg-green-600 transition-colors duration-200"
                >
                  Add People
                </button>
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

      {isJobModalOpen && (
        <AddJobModal
          isOpen={true}
          companyId={selectedCompany}
          onClose={() => setIsJobModalOpen(false)}
          onJobAdded={handleJobAdded}
        />
      )}

      {isContactModalOpen && (
        <AddContactModal
          isOpen={true}
          companyId={selectedCompany}
          onClose={() => setIsContactModalOpen(false)}
          onContactAdded={handleContactAdded}
        />
      )}
    </div>
  );
};

export default CompanyList;
