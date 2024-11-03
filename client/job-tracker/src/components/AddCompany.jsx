import { useState } from "react";
import { addCompany } from "../services/api";

const AddCompany = ({ onAdd }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCompany = { name };
    await addCompany(newCompany);
    onAdd();
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Company
      </button>
    </form>
  );
};

export default AddCompany;
