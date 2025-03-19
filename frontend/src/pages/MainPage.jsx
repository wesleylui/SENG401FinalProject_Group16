import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import StoryTitleSelector from "../components/StoryTitleSelector";
import StoryLengthSelector from "../components/StoryLengthSelector";
import StoryGenreSelector from "../components/StoryGenreSelector";
import { useAuth } from "../context/AuthContext";

const MainPage = () => {
  const { userId } = useAuth(); // Get userId from AuthContext
  const [storyDescription, setStoryDescription] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [storyLength, setStoryLength] = useState("");
  const [storyGenre, setStoryGenre] = useState("");
  const [error, setError] = useState("");
  const [story, setStory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Error checking
    if (!storyGenre || !storyLength || !storyDescription) {
      setError(
        "All fields (genre, length, and description) are required"
      );
      return;
    }

    // mock story for testing saving to db
    /*
    const mockStory = {
      userId: userId,
      title: storyTitle,
      length: storyLength,
      genre: storyGenre,
      description: description,
      story: "fake story here for now please SAVE TO THE DB PLEASE", // Rename content to story
    };
    setStory(mockStory);
    */

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/generate`,
        {
          storyLength,
          storyGenre,
          storyDescription,
        }
      );

      const storyTitle = response.data.storyTitle;
      const story = response.data.story;
      setStoryTitle(storyTitle);
      setStory(story);
    } catch (err) {
      console.error("Story generation error:", err);
      setError("Error generating story. Please try again.");
    }
  };

  // Discarding story clears all input fields
  const handleDiscard = () => {
    setStoryDescription("");
    setStoryLength("");
    setStoryGenre("");
    setStory("");
    setStoryTitle("");
  };

  // saving story to db
  const handleSave = async () => {
    if (!storyTitle || !storyGenre || !storyDescription || !story) {
      alert(
        "Title, genre, description, and story are required to save the story."
      );
      return;
    }

    try {
      const payload = {
        userId,
        storyTitle,
        storyLength,
        storyGenre,
        storyDescription,
        story: story,
      };

      console.log("Saving story with payload:", payload); // Log the payload being sent

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/save-story`,
        payload
      );
      alert("Story saved successfully!");
    } catch (err) {
      console.error("Error saving story:", err.response?.data || err);
      alert("Failed to save the story. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="pt-22">
        {" "}
        {/* padding bw header and h1*/}
        <h1 className="text-3xl font-bold mb-6">Story Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Length of Story Radio Buttons*/}
          <StoryLengthSelector
            storyLength={storyLength}
            setStoryLength={setStoryLength}
          />
          {/* Genre of Story Radio Buttons*/}
          <StoryGenreSelector
            storyGenre={storyGenre}
            setStoryGenre={setStoryGenre}
          />
          {/* Story Description Text Area */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Describe your story
            </label>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <textarea
              id="story-description"
              className="block p-2 w-full h-40 border border-gray-400"
              placeholder="Enter a sentence or two describing your story..."
              value={storyDescription}
              onChange={(e) => setStoryDescription(e.target.value)}
            />
          </div>
          {/* Generate Story Button */}
          <button
            type="submit"
            className="bg-white text-black p-6 border border-gray-400 rounded w-full"
          >
            Generate Story
          </button>
        </form>
      </div>
      {/* Generated Story Response Text */}
      {story && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800">{storyTitle}</h2>
          <p className="text-lg text-gray-600 mb-4">Genre: {storyGenre}</p>
          <p className="text-blue-500 mb-3">{story}</p>
        </div>
      )}
      {/* Save Discard and Change Story Buttons */}
      {story && (
        <div className="flex justify-end space-x-4 mt-4">
          <StoryTitleSelector
              storyTitle={storyTitle}
              setStoryTitle={setStoryTitle}
            />
          <button
            className="bg-white text-black p-6 border border-gray-400 rounded hover:bg-gray-100"
            onClick={handleSave}
          >
            Save Story
          </button>
          <button
            className="bg-white text-black p-6 border border-gray-400 rounded hover:bg-gray-100"
            onClick={handleDiscard}
          >
            Discard Story
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
