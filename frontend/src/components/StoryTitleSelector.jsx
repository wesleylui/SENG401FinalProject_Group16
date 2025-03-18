import PropTypes from "prop-types";

const StoryTitleSelector = ({ storyTitle, setStoryTitle }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-2">Enter Story Title</label>
      <input
        type="text"
        className="block p-2 w-full border border-gray-400 rounded"
        placeholder="Enter your story title..."
        value={storyTitle}
        onChange={(e) => setStoryTitle(e.target.value)}
      />
    </div>
  );
};

StoryTitleSelector.propTypes = {
  storyTitle: PropTypes.string.isRequired,
  setStoryTitle: PropTypes.func.isRequired,
};

export default StoryTitleSelector;
