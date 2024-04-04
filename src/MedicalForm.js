// MedicalForm.js

import React, { useState } from 'react';
import './MedicalForm.css';

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    smoke: false,
    yellowFinger: false,
    anxiety: false,
    peerPressure: false,
    chronicDisease: false,
    fatigue: false,
    allergies: false,
    wheezing: false,
    consumeAlcohol: false,
    coughing: false,
    shortnessOfBreath: false,
    difficultySwallowing: false,
    chestPain: false
  });
  const [loading, setLoading] = useState(false);
  const [resultString, setResultString] = useState('');

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'number' ? value.replace(/\D/, '') : value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(formData)
      const response = await fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setResultString(result.message); // Assuming the result object has a 'message' field
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to our Medical Website</h1>
      <p>Please fill out the following information:</p>
      <form onSubmit={handleSubmit}>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="other">Other</option>
        </select>
        <label>Age:</label>
        <input type="text" name="age" value={formData.age} onChange={handleChange} required />
        <div className="subtitle">Check each prompt if it is true:</div>
        <div className="checkbox-prompt">
          <label>I smoke</label>
          <input type="checkbox" name="smoke" checked={formData.smoke} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I have yellow fingers</label>
          <input type="checkbox" name="yellowFinger" checked={formData.yellowFinger} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I experience anxiety</label>
          <input type="checkbox" name="anxiety" checked={formData.anxiety} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I experience peer pressure</label>
          <input type="checkbox" name="peerPressure" checked={formData.peerPressure} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I suffer from a chronic disease</label>
          <input type="checkbox" name="chronicDisease" checked={formData.chronicDisease} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I experience fatigue</label>
          <input type="checkbox" name="fatigue" checked={formData.fatigue} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I have allergies</label>
          <input type="checkbox" name="allergies" checked={formData.allergies} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I experience wheezing</label>
          <input type="checkbox" name="wheezing" checked={formData.wheezing} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I consume alcohol</label>
          <input type="checkbox" name="consumeAlcohol" checked={formData.consumeAlcohol} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I experience coughing</label>
          <input type="checkbox" name="coughing" checked={formData.coughing} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I experience shortness of breath</label>
          <input type="checkbox" name="shortnessOfBreath" checked={formData.shortnessOfBreath} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I have difficulty swallowing</label>
          <input type="checkbox" name="difficultySwallowing" checked={formData.difficultySwallowing} onChange={handleChange} />
        </div>
        <div className="checkbox-prompt">
          <label>I have chest pain</label>
          <input type="checkbox" name="chestPain" checked={formData.chestPain} onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Calculating your results...' : 'Submit'}
        </button>
      </form>
      {resultString && <div>Result: {resultString}</div>}
    </div>
  );
};

export default MedicalForm;
