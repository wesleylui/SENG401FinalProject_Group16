import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

const SavedStories = () => {
  const { userId } = useAuth();
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/stories/${userId}`
        );
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, [userId]);

  const handleCardClick = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  const handleDeleteStory = (storyId) => {
    setStories((prevStories) =>
      prevStories.filter((story) => story.id !== storyId)
    );
  };

  return (
    <div>
      <Header />
      <div className={`flex ${showModal ? 'sm:flex-col md:flex-row' : 'flex-row'} gap-10 transition-all duration-700`}>
        
        {/* Stories List */}
        <div className={`bg-gray-100 p-6 rounded shadow-lg overflow-auto max-h-[80vh] transition-all duration-700 ease-in-out
          ${showModal ? 'sm:hidden md:block' : 'block'}`}>
          <h2 className="text-2xl font-bold mb-8 mt-8">Saved Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white p-6 pt-8 rounded shadow-lg cursor-pointer flex flex-col"
                onClick={() => handleCardClick(story)}
              >
                <h3 className="text-2xl font-bold mb-1">{story.title}</h3>
                <h4 className="text-lg text-gray-600 mb-2">{story.genre}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <div className={`transition-all duration-700 ease-in-out
          ${showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          ${showModal ? 'w-full sm:w-full md:max-w-[70vw]' : 'hidden'}`}>
          
          <Modal
            show={showModal}
            onClose={handleCloseModal}
            title={selectedStory?.title}
            genre={selectedStory?.genre}
            description={selectedStory?.description}
            story={selectedStory?.story}
            storyId={selectedStory?.id}
            onDelete={handleDeleteStory}
          />
        </div>

      </div>
    </div>
  );
};

export default SavedStories;
