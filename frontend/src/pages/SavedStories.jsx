import { useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";

const SavedStories = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "Story 1",
      summary: "Summary of story 1",
      content: "Full content of story 1",
    },
    {
      id: 2,
      title: "Story 2",
      summary: "Summary of story 2",
      content: "Full content of story 2",
    },
    // Add more stories here
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

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
              className="bg-white p-6 rounded shadow-lg cursor-pointer h-72 w-96"
              onClick={() => handleCardClick(story)}
            >
              <h3 className="text-xl font-bold mb-2">{story.title}</h3>
              <p>{story.summary}</p>
            </div>
          ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        content={selectedStory?.content}
      />
    </div>
  );
};

export default SavedStories;
