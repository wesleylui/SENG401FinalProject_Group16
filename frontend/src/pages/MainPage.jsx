import { useState } from "react";
import Header from "../components/Header";
import StoryLengthSelector from "../components/StoryLengthSelector";
import StoryGenreSelector from "../components/StoryGenreSelector";

const MainPage = () => {
  const [storyDescription, setStoryDescription] = useState("");
  const [storyLength, setStoryLength] = useState("");
  const [storyGenre, setStoryGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generating story with description:", storyDescription);
    console.log("Selected story length:", storyLength);
    console.log("Selected story genre:", storyGenre);
  };

  return (
    <div>
      <Header />
      <div className="pt-16"> {/* padding bw header and h1*/}
        <h1 className="text-3xl font-bold mb-6">Story Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <StoryLengthSelector
            storyLength={storyLength}
            setStoryLength={setStoryLength}
          />
          <StoryGenreSelector
            storyGenre={storyGenre}
            setStoryGenre={setStoryGenre}
          />
          <div>
            <label className="block text-lg font-medium mb-2">
              Describe your story
            </label>
            <textarea
              id="story-description"
              className="block p-2 w-full h-40 border border-gray-400"
              placeholder="Enter a sentence or two describing your story..."
              value={storyDescription}
              onChange={(e) => setStoryDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black p-6 border border-gray-400 rounded w-full"
          >
            Generate Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
