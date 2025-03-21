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
    console.error("Error saving story:", err.response?.data || err);
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

export const deleteStory = async (storyId, backendUrl) => {
  try {
    await axios.delete(`${backendUrl}/stories/${storyId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting story:", error.response?.data || error);
    return { success: false, error: error.response?.data?.error || "Failed to delete the story." };
  }
};

export const generateStory = async ({
  storyLength,
  storyGenre,
  storyDescription,
  backendUrl,
  onSuccess,
  onError,
}) => {
  if (!storyLength || !storyGenre || !storyDescription) {
    onError("All fields (genre, length, and description) are required.");
    return;
  }

  try {
    const response = await axios.post(`${backendUrl}/generate`, {
      storyLength,
      storyGenre,
      storyDescription,
    });
    onSuccess(response.data);
  } catch (error) {
    console.error("Error generating story:", error.response?.data || error);
    onError("Error generating story. Please try again.");
  }
};
