import PropTypes from "prop-types";

const MoralInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
        Should this part of the story include a moral or lesson?
      </label>
      <textarea
        className="w-full h-20 p-2 border border-gray-400 rounded"
        placeholder="Describe the moral or lesson..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

MoralInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MoralInput;
