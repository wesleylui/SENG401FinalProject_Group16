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
                className="border p-2 w-full mt-2"
                placeholder="Enter a sentence or two describing your story..."
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-indigo-500 text-black p-2 rounded w-full"
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
