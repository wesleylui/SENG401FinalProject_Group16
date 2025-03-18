import PropTypes from "prop-types";

const StoryLengthSelector = ({ storyLength, setStoryLength }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-2">Select Story Length</label>
      <div className="flex justify-center space-x-4">
        <label
          className={`px-4 py-2 border rounded cursor-pointer ${
            storyLength === "100"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <input
            type="radio"
            name="storyLength"
            value="100"
            className="hidden"
            checked={storyLength === "100"}
            onChange={(e) => setStoryLength(e.target.value)}
          />
          50-100 words
        </label>
        <label
          className={`px-4 py-2 border rounded cursor-pointer ${
            storyLength === "200"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <input
            type="radio"
            name="storyLength"
            value="200"
            className="hidden"
            checked={storyLength === "200"}
            onChange={(e) => setStoryLength(e.target.value)}
          />
          100-200 words
        </label>
        <label
          className={`px-4 py-2 border rounded cursor-pointer ${
            storyLength === "300"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <input
            type="radio"
            name="storyLength"
            value="300"
            className="hidden"
            checked={storyLength === "300"}
            onChange={(e) => setStoryLength(e.target.value)}
          />
          200-300 words
        </label>
      </div>
    </div>
  );
};

StoryLengthSelector.propTypes = {
  storyLength: PropTypes.string.isRequired,
  setStoryLength: PropTypes.func.isRequired,
};

export default StoryLengthSelector;
