import PropTypes from "prop-types";
import axios from "axios";

const Modal = ({ show, onClose, title, genre, description, story, storyId, onDelete }) => {
  if (!show) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5050/stories/${storyId}`);
      alert("Story deleted successfully!");
      onDelete(storyId); // Notify parent component about deletion
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Failed to delete the story. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg relative">
        {/* Delete Story button in the top-left */}
        <button
          className="absolute top-2 left-2 text-sm text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          Delete Story
        </button>
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <div className="overflow-y-auto max-h-screen pt-8 pr-8">
          <div className="flex justify-between mb-4">
            <span className="font-bold text-xl">{title}</span>
            <span className="text-lg text-gray-600">{genre}</span>
          </div>
          <p className="mb-4">{description}</p> {/* Display description */}
          <textarea
            className="w-full h-auto max-h-96 p-2 border border-gray-300 rounded resize-none"
            readOnly
            value={story} // Display story
          />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  genre: PropTypes.string,
  description: PropTypes.string,
  story: PropTypes.string,
  storyId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Modal;
