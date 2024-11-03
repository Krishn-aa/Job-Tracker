import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Companies
export const getCompanies = () => axios.get(`${API_BASE_URL}/companies`);
export const addCompany = (companyData) =>
  axios.post(`${API_BASE_URL}/companies`, companyData);
export const deleteCompany = (companyId) =>
  axios.delete(`${API_BASE_URL}/companies/${companyId}`);


//Jobs
export const getJobs = (companyId) =>
  axios.get(`${API_BASE_URL}/jobs/${companyId}`);

export const addJob = (companyId, jobData) =>
  axios.post(`${API_BASE_URL}/jobs/${companyId}`, jobData);


//Contacts

export const getContacts = (companyId) =>
  axios.get(`${API_BASE_URL}/contacts/${companyId}`);

export const addContact = (companyId, contactData) =>
  axios.post(`${API_BASE_URL}/contacts/${companyId}`, contactData);
