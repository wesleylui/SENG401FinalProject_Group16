import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import StoryTitleSelector from "../components/StoryTitleSelector";
import StoryLengthSelector from "../components/StoryLengthSelector";
import StoryGenreSelector from "../components/StoryGenreSelector";
import { useAuth } from "../context/AuthContext";
import TTSControls from "../components/TTSControls";
import SaveStoryButton from "../components/SaveStoryButton";
import DiscardStoryButton from "../components/DiscardStoryButton";
import GenerateStoryButton from "../components/GenerateStoryButton";
import {
  generateStory,
  handleSave,
  handleDiscard,
} from "../utils/storyHandlers";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setGuestMessage("");

    generateStory({
      storyLength,
      storyGenre,
      storyDescription,
      backendUrl,
      onSuccess: (data) => {
        setStoryTitle(data.storyTitle);
        setStory(data.story);
      },
      onError: (errorMessage) => setError(errorMessage),
    });
  };

  const saveStory = () => {
    handleSave({
      userId,
      storyTitle,
      storyLength,
      storyGenre,
      storyDescription,
      story,
      backendUrl,
      onSuccess: (message) => alert(message),
      onError: (errorMessage) => {
        if (isGuest) {
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
        } else {
          alert(errorMessage);
        }
      },
    });
  };

  const discardStory = () => {
    handleDiscard({
      setStoryTitle,
      setStoryLength,
      setStoryGenre,
      setStoryDescription,
      setStory,
      setGuestMessage,
    });
  };

  return (
    <div>
      <Header />
      <div className="pt-18">
        {" "}
        {/* Add padding between header and title */}
        <h1 className="text-3xl font-bold md:mb-2 max-md:mt-20 md:mt-0">
          Story Generator
        </h1>
      </div>
      <div className="flex max-md:flex-col md:flex-row gap-8">
        <div className="flex flex-shrink justify-center pt-8">
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
            <GenerateStoryButton onGenerate={handleSubmit} />
          </form>
        </div>

        <div className="flex-1 flex-col">
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
                <div className="flex flex-col items-center">
                  <p className="text-blue-500 mb-3 text-center">{story}</p>
                  <TTSControls story={story} />
                </div>
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
                  <SaveStoryButton onSave={saveStory} />
                  <DiscardStoryButton onDiscard={discardStory} />
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
