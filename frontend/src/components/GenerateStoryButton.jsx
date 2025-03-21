import PropTypes from "prop-types";

const GenerateStoryButton = ({ onGenerate }) => {
  return (
    <button
      className="bg-white text-black p-6 border border-gray-400 rounded w-full hover:bg-gray-100"
      onClick={onGenerate}
    >
      Generate Story
    </button>
  );
};

GenerateStoryButton.propTypes = {
  onGenerate: PropTypes.func.isRequired,
};

export default GenerateStoryButton;
