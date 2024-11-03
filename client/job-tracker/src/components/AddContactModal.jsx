import { useState } from "react";
import { addContact } from "../services/api";

const AddContactModal = ({ isOpen, onClose, companyId, onContactAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinURL, setLinkedinURL] = useState("");
  const [contacted, setContacted] = useState(false);

  const handleAddContact = async () => {
    try {
      console.log("Adding contact with compnayId:", companyId); // Log jobId to ensure it's correct
      await addContact(companyId, {
        companyId,
        name,
        email,
        linkedinURL,
        contacted,
      }); // Ensure you're passing jobId as the first argument
      onContactAdded();
      onClose();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Contact</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          className="w-full p-2 mb-4 border rounded"
          value={linkedinURL}
          onChange={(e) => setLinkedinURL(e.target.value)}
        />
        <button
          onClick={handleAddContact}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          Add Contact
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

export default AddContactModal;
