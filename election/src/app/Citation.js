// import React, { useRef, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Overlay from 'react-bootstrap/Overlay';
// import Tooltip from 'react-bootstrap/Tooltip';

// const Citation = () => {
//   const citationRef = useRef(null);
//   const [showTooltip, setShowTooltip] = useState(false);

//   const citationStyle = {
//     fontFamily: 'Arial, sans-serif',
//     fontSize: '14px',
//     lineHeight: '1.4',
//     position: 'relative', 
//     maxWidth: '800px',
//     margin: 'auto', 
//     padding: '20px',
//   };

//   const listItemStyle = {
//     marginLeft: '20px',
//   };

//   const handleCopyClick = () => {
//     const citationText = citationRef.current.innerText;
//     navigator.clipboard.writeText(citationText);
//     setShowTooltip(true); // Show tooltip when text is copied
//     setTimeout(() => setShowTooltip(false), 1000); // Hide tooltip after 1 second
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}> {/* Adjusted minHeight */}
//       <div style={citationStyle}>
//         <Overlay target={citationRef.current} show={showTooltip} placement="top">
//           {(props) => (
//             <Tooltip id="overlay-example" {...props}>
//               Copied!
//             </Tooltip>
//           )}
//         </Overlay>
//         <Button
//           variant="outline-secondary"
//           onClick={handleCopyClick}
//           style={{ position: 'absolute', top: '5px', right: '1px', zIndex: '999' }}
//         >
//           <i className="far fa-copy">copy</i>
//         </Button>
//         <div ref={citationRef}>
//           <p>@misc&#123;precodiiitd-2024,</p>
//           <p style={listItemStyle}>author = &#123;Precod@IIITD&#125;,</p>
//           <p style={listItemStyle}>month = &#123;3&#125;,</p>
//           <p style={listItemStyle}>title = &#123;&#123;Election Dasboard&#125;&#125;,</p>
//           <p style={listItemStyle}>year = &#123;2024&#125;,</p>
//           <p style={listItemStyle}>
//             url = &#123;
//             <a href="http://ElectionDasboard.com" style={{ color: '#0000EE', textDecoration: 'none' }}>
//               http://ElectionDasboard.com
//             </a>
//             &#125;
//           </p>
//           <p>&#125;</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Citation;
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

const Citation = () => {
  const citationRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const citationStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    lineHeight: '0.4',
    position: 'relative', // Add relative positioning to the citation container
    maxWidth: '800px', // Set maximum width to make it responsive
    margin: '50px auto', // Center the citation horizontally with top and bottom margin
    padding: '20px', // Add padding for better readability
  };

  const listItemStyle = {
    marginLeft: '20px',
  };

  const handleCopyClick = () => {
    const citationText = citationRef.current.innerText;
    navigator.clipboard.writeText(citationText);
    setShowTooltip(true); // Show tooltip when text is copied
    setTimeout(() => setShowTooltip(false), 1000); // Hide tooltip after 1 second
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={citationStyle}>
        <Overlay target={citationRef.current} show={showTooltip} placement="top">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              Copied!
            </Tooltip>
          )}
        </Overlay>
        <Button
          variant="outline-secondary"
          onClick={handleCopyClick}
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '999' }}
        >
          <i className="far fa-copy">copy</i>
        </Button>
        <div ref={citationRef}>
          <p>@misc&#123;precodiiitd-2024,</p>
          <p style={listItemStyle}>author = &#123;Precod@IIITD&#125;,</p>
          <p style={listItemStyle}>month = &#123;3&#125;,</p>
          <p style={listItemStyle}>title = &#123;&#123;Election Dasboard&#125;&#125;,</p>
          <p style={listItemStyle}>year = &#123;2024&#125;,</p>
          <p style={listItemStyle}>
            url = &#123;
            <a href="http://ElectionDasboard.com" style={{ color: '#0000EE', textDecoration: 'none' }}>
              http://ElectionDasboard.com
            </a>
            &#125;
          </p>
          <p>&#125;</p>
        </div>
      </div>
    </div>
  );
};

export default Citation;
