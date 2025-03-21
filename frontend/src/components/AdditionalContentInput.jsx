import PropTypes from "prop-types";

const AdditionalContentInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        What should happen next in the story?
      </label>
      <textarea
        className="w-full h-20 p-2 border border-gray-400 rounded"
        placeholder="Describe the next part of the plot..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

AdditionalContentInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AdditionalContentInput;
