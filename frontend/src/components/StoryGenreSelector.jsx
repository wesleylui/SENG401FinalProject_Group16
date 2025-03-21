import PropTypes from "prop-types";

const StoryGenreSelector = ({ storyGenre, setStoryGenre }) => {
  return (
    <div>
      <label className="block text-lg font-medium mb-2">Pick your Genre</label>
      <div className="flex justify-center space-x-4">
        <label
          className={`px-4 py-2 border rounded cursor-pointer ${
            storyGenre === "fairy tale"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <input
            type="radio"
            name="storyGenre"
            value="fairy tale"
            className="hidden"
            checked={storyGenre === "Fairy Tale"}
            onChange={(e) => setStoryGenre(e.target.value)}
          />
          Fairy Tale
        </label>
        <label
          className={`px-4 py-2 border rounded cursor-pointer ${
            storyGenre === "lullaby"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <input
            type="radio"
            name="storyGenre"
            value="lullaby"
            className="hidden"
            checked={storyGenre === "Lullaby"}
            onChange={(e) => setStoryGenre(e.target.value)}
          />
          Lullaby
        </label>
        <label
          className={`px-4 py-2 border rounded cursor-pointer ${
            storyGenre === "fiction"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          <input
            type="radio"
            name="storyGenre"
            value="fiction"
            className="hidden"
            checked={storyGenre === "Fiction"}
            onChange={(e) => setStoryGenre(e.target.value)}
          />
          Fiction
        </label>
      </div>
    </div>
  );
};

StoryGenreSelector.propTypes = {
  storyGenre: PropTypes.string.isRequired,
  setStoryGenre: PropTypes.func.isRequired,
};

export default StoryGenreSelector;
