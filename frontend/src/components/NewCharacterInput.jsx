import PropTypes from "prop-types";

const NewCharacterInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        Introduce a new character (optional)
      </label>
      <textarea
        className="w-full h-20 p-2 border border-gray-400 rounded"
        placeholder="Describe the new character..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

NewCharacterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NewCharacterInput;
