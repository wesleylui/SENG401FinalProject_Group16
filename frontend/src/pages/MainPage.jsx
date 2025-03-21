import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import StoryTitleSelector from "../components/StoryTitleSelector";
import StoryLengthSelector from "../components/StoryLengthSelector";
import StoryGenreSelector from "../components/StoryGenreSelector";
import { useAuth } from "../context/AuthContext";
import TTSControls from "../components/TTSControls";

const MainPage = () => {
  const { userId, isGuest, logout } = useAuth();
  const [storyDescription, setStoryDescription] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [storyLength, setStoryLength] = useState("");
  const [storyGenre, setStoryGenre] = useState("");
  const [error, setError] = useState("");
  const [story, setStory] = useState(null);
  const [guestMessage, setGuestMessage] = useState("");

  const backendUrl =
    import.meta.env.ENV === "local"
      ? "http://localhost:5050"
      : import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGuestMessage("");

    if (!storyGenre || !storyLength || !storyDescription) {
      setError("All fields (genre, length, and description) are required");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/generate`, {
        storyLength,
        storyGenre,
        storyDescription,
      });

      setStoryTitle(response.data.storyTitle);
      setStory(response.data.story);
    } catch (err) {
      console.error("Story generation error:", err);
      setError("Error generating story. Please try again.");
    }
  };

  const handleSave = () => {
    if (isGuest || !userId) {
      setGuestMessage(
        <>
          <Link
            to="/"
            onClick={() => logout()}
            className="text-blue-500 underline"
          >
            Create an account
          </Link>{" "}
          to save your story.
        </>
      );
      return;
    }

    if (!storyTitle || !storyGenre || !storyDescription || !story) {
      alert(
        "Title, genre, description, and story are required to save the story."
      );
      return;
    }

    // Save story logic (only if userId exists)
    const payload = {
      userId,
      storyTitle,
      storyLength,
      storyGenre,
      storyDescription,
      story,
    };

    axios
      .post(`${backendUrl}/save-story`, payload)
      .then(() => alert("Story saved successfully!"))
      .catch((err) => {
        console.error("Error saving story:", err.response?.data || err);
        alert("Failed to save the story. Please try again.");
      });
  };

  const handleDiscard = () => {
    setStoryDescription("");
    setStoryLength("");
    setStoryGenre("");
    setStory("");
    setStoryTitle("");
    setGuestMessage("");
  };

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold md:mb-6 sm:mt-20 md:mt-24">
        Story Generator
      </h1>
      <div className="flex sm:flex-col md:flex-row gap-10">
        <div className="flex flex-shrink justify-center pt-12">
          {/* padding bw header and h1*/}
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

        <div className="flex-1 flex-col">
          {" "}
          {/* Story section */}
          <div
            className={`transition-all duration-700 ease-in-out ${
              story ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            {/* Generated Story Response Text */}
            {story && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {storyTitle}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  Genre: {storyGenre}
                </p>
                <p className="text-blue-500 mb-3">{story}</p>
                <TTSControls story={story} />
              </div>
            )}
            {/* Save Discard and Change Story Buttons */}
            {story && (
              <div className="flex sm:flex-col md:flex-row justify-center space-x-4 mt-4">
                <StoryTitleSelector
                  storyTitle={storyTitle}
                  setStoryTitle={setStoryTitle}
                />
                <div className="flex justify-center space-x-4 mt-4">
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
                {guestMessage && (
                  <div className="text-center mt-4 text-red-500">
                    {guestMessage}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
