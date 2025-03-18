import PropTypes from "prop-types";

const Modal = ({ show, onClose, title, genre, description, story }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-lg relative">
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
};

export default Modal;
