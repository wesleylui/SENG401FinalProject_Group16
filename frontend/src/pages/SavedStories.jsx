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
        const response = await axios.get(`http://localhost:5050/stories/${userId}`);
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

  return (
    <div>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Saved Stories</h2>
        <div className="flex flex-wrap gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white p-6 pt-8 rounded shadow-lg cursor-pointer w-96"
              onClick={() => handleCardClick(story)}
            >
              <h3 className="text-2xl font-bold mb-1">{story.title}</h3>
              <h4 className="text-lg text-gray-600 mb-2">{story.genre}</h4>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        story={selectedStory?.story}
        title={selectedStory?.title}
        genre={selectedStory?.genre}
      />
    </div>
  );
};

export default SavedStories;
