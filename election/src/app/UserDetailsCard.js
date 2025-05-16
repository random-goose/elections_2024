import React from 'react';
import { Card } from 'react-bootstrap'; // Import Card from react-bootstrap

function UserDetailsCard({ userName, details, links }) {
  const renderLinks = () => {
    if (!links || links.length === 0) {
      return null;
    }

    // Calculate the number of icons per row
    const iconsPerRow = 3;
    const rows = Math.ceil(links.length / iconsPerRow);

    // Render the icons
    return Array.from({ length: rows }).map((_, rowIndex) => {
      const iconsInThisRow = links.slice(rowIndex * iconsPerRow, (rowIndex + 1) * iconsPerRow);
      
      // Calculate the appropriate class for this row
      let rowClass = 'd-flex';
      if (iconsInThisRow.length === 1 || iconsInThisRow.length === 2) {
        rowClass += ' justify-content-center';
      }

      return (
        <Card.Text key={rowIndex} className={`mb-0 ${rowClass}`}>
          {iconsInThisRow.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ marginRight: '2px' }}>
              {link.icon}
            </a>
          ))}
        </Card.Text>
      );
    });
  };

  return (
    <Card style={{ width: '30rem', border: 'none' }}>
      <div className="d-flex">
        <div className="p-2">
          <img
            src="https://via.placeholder.com/150"
            alt="placeholder"
            className="rounded-circle"
            style={{ width: '150px', height: '150px' }}
          />
        </div>
        <div className="p-2">
          <Card.Body>
            <Card.Title className="mb-2">{userName}</Card.Title>
            {details.map((detail, index) => (
              <Card.Text key={index} className="mb-0">
                {detail}
              </Card.Text>
            ))}
            {renderLinks()}
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default UserDetailsCard;
