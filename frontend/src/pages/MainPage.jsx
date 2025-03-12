import { useState } from "react";
import Header from "../components/Header";

const MainPage = () => {
  const [storyDescription, setStoryDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the story generation logic here
    console.log("Generating story with description:", storyDescription);
  };
  return (
    <div>
      <Header />
      <div className="p-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Story Generator</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium">
                Describe your story
              </label>
              <textarea
                id="story-description"
                className="block p-2 w-full mt-2 h-40 border border-gray-400"
                placeholder="Enter a sentence or two describing your story..."
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-white text-black p-6 border border-gray-400 rounded w-full mb-3"
            >
              Generate Story
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
