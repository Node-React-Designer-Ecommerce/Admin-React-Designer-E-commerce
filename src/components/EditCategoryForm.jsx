import PropTypes from "prop-types";
import { useState } from "react";

const EditCategoryForm = ({ newCategoryData, setNewCategoryData, handleSave }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newCategoryData.name) {
      newErrors.name = "Name is required.";
    }
    if (newCategoryData.description.length < 30) {
      newErrors.description = "Description must be at least 30 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <>
      <input
        type="text"
        className="input input-bordered w-full"
        value={newCategoryData.name}
        onChange={(e) => setNewCategoryData({ ...newCategoryData, name: e.target.value })}
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}
      <input
        type="text"
        className="input input-bordered w-full"
        value={newCategoryData.description}
        onChange={(e) => setNewCategoryData({ ...newCategoryData, description: e.target.value })}
      />
      {errors.description && <p className="text-red-500">{errors.description}</p>}
      <button
        className="btn my-1 float-right bg-mintColor hover:bg-mintColor text-white"
        onClick={handleSubmit}
      >
        Save
      </button>
    </>
  );
};

EditCategoryForm.propTypes = {
  newCategoryData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setNewCategoryData: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default EditCategoryForm;