import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import StoryLengthSelector from "../components/StoryLengthSelector";
import StoryGenreSelector from "../components/StoryGenreSelector";

const MainPage = () => {
  const [prompt, setPrompt] = useState("");
  const [storyLength, setStoryLength] = useState("");
  const [storyGenre, setStoryGenre] = useState("");
  const [error, setError] = useState("");
  const [story, setStory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Error checking
    if (!prompt) {
      setError("Story prompt cannot be empty");
      return;
    }

    try {
      // local version
      const response = await axios.post("http://localhost:5050/generate", {
        prompt,
      });

      // for deployment version
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BACKEND_URL}/`,
      //   { generate }
      // );

      console.log("Story generation successful:", response.data);
      // navigate("/main"); // redirect to separate page??
      setStory(response.data.story);
    } catch (err) {
      console.error("Story generation error:", err);
      setError("Error generating story. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="pt-16">
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
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
      {story && <p className="text-blue-500 mb-3">{story}</p>}
    </div>
  );
};

export default MainPage;
