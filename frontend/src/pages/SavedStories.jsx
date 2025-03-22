import { useState, useEffect } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { fetchSavedStories, deleteStory } from "../utils/storyHandlers";

const SavedStories = () => {
  const { userId } = useAuth();
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const backendUrl =
    import.meta.env.ENV === "local"
      ? "http://localhost:5050"
      : import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchSavedStories({
      userId,
      backendUrl,
      onSuccess: setStories,
      onError: (errorMessage) => console.error(errorMessage),
    });
  }, [userId, backendUrl]);

  const handleCardClick = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  const handleDeleteStory = async (storyId) => {
    const { success, error } = await deleteStory(storyId, backendUrl);
    if (success) {
      setStories((prevStories) =>
        prevStories.filter((story) => story.id !== storyId)
      );
      alert("Story deleted successfully!"); // Show success alert here
    } else {
      alert(error); // Show error alert
    }
  };

  const handleAddStory = (newStory, callback) => {
    setStories((prevStories) => [...prevStories, newStory]);
    setSelectedStory(newStory);
    setShowModal(true);
    callback && callback();
  };

  return (
    <div>
      <Header />
      <div
        className={`flex ${
          showModal ? "sm:flex-col md:flex-row" : "flex-row"
        } gap-10 transition-all duration-700 mt-20`}
      >
        {/* Stories List */}
        <div
          className={`bg-gray-100 p-6 rounded shadow-lg overflow-auto max-h-[80vh] transition-all duration-700 ease-in-out
          ${showModal ? "sm:hidden md:block" : "block"}`}
        >
          <h2 className="text-2xl font-bold mb-8 mt-8">Saved Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full">
                No saved stories
              </p>
            ) : (
              stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white p-6 pt-8 rounded shadow-lg cursor-pointer flex flex-col"
                  onClick={() => handleCardClick(story)}
                >
                  <h3 className="text-2xl font-bold mb-1">{story.title}</h3>
                  <h4 className="text-lg text-gray-600 mb-2">{story.genre}</h4>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal */}
        <div
          className={`transition-all duration-700 ease-in-out
          ${showModal ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          ${showModal ? "w-full sm:w-full md:max-w-[70vw]" : "hidden"}`}
        >
          <Modal
            show={showModal}
            onClose={handleCloseModal}
            title={selectedStory?.title}
            genre={selectedStory?.genre}
            description={selectedStory?.description}
            story={selectedStory?.story}
            storyLength={selectedStory?.length}
            storyId={selectedStory?.id}
            userId={userId} // Pass userId to Modal
            onDelete={handleDeleteStory}
            onAddStory={handleAddStory} // Pass handleAddStory to Modal
          />
        </div>
      </div>
    </div>
  );
};

export default SavedStories;
