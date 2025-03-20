import PropTypes from "prop-types";

const StoryTitleSelector = ({ storyTitle, setStoryTitle }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      <label className="text-lg font-medium">Edit Story Title</label>
      <input
        type="text"
        className="p-2 border border-gray-400 rounded"
        placeholder="Change your story title..."
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
