import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Adsf from './Adsf';
import Adsg from '../Google_Graphs/Adsg';
import Results from '../results';
import Resultss from '../resultss';



const ToggleSwitch = () => {
  const [isMetaSelected, setIsMetaSelected] = useState(true);

  const styles = {
    switch: {
      width: '56px',
      height: '28px',
      backgroundColor: '#e5e7eb',
      borderRadius: '999px',
      padding: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      margin: '0 16px'
    },
    knob: {
      width: '20px',
      height: '20px',
      backgroundColor: 'white',
      borderRadius: '50%',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      transition: 'transform 300ms ease-in-out'
    },
    knobMoved: {
      transform: 'translateX(28px)'
    }
  };

  return (
    
   

    <div className="container">
       <Results />
       <Resultss />

      <br></br><br></br><br></br>
      <div className="row justify-content-center mb-4">
        <div className="col-auto d-flex align-items-center">
          <span 
            className={`btn ${isMetaSelected ? 'text-primary fw-bold' : 'text-secondary'}`}
            onClick={() => setIsMetaSelected(true)}
          >
            Meta
          </span>
          
          <div 
            style={styles.switch}
            onClick={() => setIsMetaSelected(!isMetaSelected)}
          >
            <div 
              style={{
                ...styles.knob,
                ...(isMetaSelected ? {} : styles.knobMoved)
              }}
            />
          </div>
          
          <span 
            className={`btn ${!isMetaSelected ? 'text-primary fw-bold' : 'text-secondary'}`}
            onClick={() => setIsMetaSelected(false)}
          >
            Google
          </span>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-10">
          {isMetaSelected ? <Adsf /> : <Adsg />}
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;