import PropTypes from "prop-types";

const EndingDirectionInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        How should this part of the story end?
      </label>
      <textarea
        className="w-full h-20 p-2 border border-gray-400 rounded"
        placeholder="Describe the ending direction..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

EndingDirectionInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EndingDirectionInput;
