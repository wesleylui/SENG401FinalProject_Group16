import axios from "axios";

export const handleSave = async ({
  userId,
  storyTitle,
  storyLength,
  storyGenre,
  storyDescription,
  story,
  backendUrl,
  onSuccess,
  onError,
}) => {
  if (!userId) {
    onError("User is not logged in. Please log in to save the story.");
    return;
  }

  if (!storyTitle || !storyDescription || !story) {
    onError(
      "All fields (title, description, and story) are required to save the story."
    );
    return;
  }

  const payload = {
    userId,
    storyTitle,
    storyLength,
    storyGenre,
    storyDescription,
    story,
  };

  try {
    await axios.post(`${backendUrl}/save-story`, payload);
    onSuccess("Story saved successfully!");
  } catch (err) {
    console.error("Error saving story:", err.response?.data || err); // Log error in terminal
    onError("Failed to save the story. Please try again.");
  }
};

export const handleDiscard = ({
  setStoryTitle,
  setStoryLength,
  setStoryGenre,
  setStoryDescription,
  setStory,
  setGuestMessage,
}) => {
  setStoryTitle("");
  setStoryLength("");
  setStoryGenre("");
  setStoryDescription("");
  setStory("");
  setGuestMessage && setGuestMessage("");
};
