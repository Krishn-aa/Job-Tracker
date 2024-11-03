import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getCompanies = () => axios.get(`${API_BASE_URL}/companies`);
export const addCompany = (companyData) =>
  axios.post(`${API_BASE_URL}/companies`, companyData);

export const getJobs = (companyId) =>
  axios.get(`${API_BASE_URL}/jobs/${companyId}`);

export const addJob = (companyId, jobData) =>
  axios.post(`${API_BASE_URL}/jobs/${companyId}`, jobData);

export const getContacts = (companyId) =>
  axios.get(`${API_BASE_URL}/contacts/${companyId}`);

export const addContact = (companyId, contactData) =>
  axios.post(`${API_BASE_URL}/contacts/${companyId}`, contactData);
