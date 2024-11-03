import { useState, useEffect } from 'react';
import CompanyList from '../components/CompanyList';
import AddCompany from '../components/AddCompany';

const Home = () => {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setTodayDate(formattedDate);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">Job Tracker</h1>
      <p className="text-lg text-gray-600 mb-6">{todayDate}</p>
      <AddCompany onAdd={() => window.location.reload()} />
      <CompanyList />
    </div>
  );
};

export default Home;