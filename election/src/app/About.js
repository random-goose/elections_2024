import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { LinkedinIcon, XIcon } from 'react-share';

const dummyUrl = "https://example.com";

function InstagramIcon({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="#dc3545" viewBox="0 0 16 16" style={style}>
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
    </svg>
  );
}

function UserDetailsCard({ userName, details, links, photo }) {
  const renderUserName = () => {
    return <div>{userName}</div>;
  };

  const renderLinks = () => {
    if (!links || links.length === 0) {
      return null;
    }

    return (
      <Card.Text className="mb-0 d-flex">
        {links.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ marginRight: '2px' }}>
            {link.icon}
          </a>
        ))}
      </Card.Text>
    );
  };

  return (
    <Card style={{ width: '450px', padding: '2px', border: 'none', margin: '0px' }}>
      <div className="d-flex">
        <div className="p-2">
          <img
            src={photo}
            alt="placeholder"
            className="rounded-circle"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
        <div className="p-2">
          <Card.Body>
            <Card.Title className="mb-2">{renderUserName()}</Card.Title>
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

function generateUserDetailsCard(userName, details, links, photo, key) {
  return (
    <Col xs={12} sm={6} md={4} lg={4} className="mb-3" key={key}>
      <UserDetailsCard userName={userName} details={details} links={links} photo={photo} />
    </Col>
  );
}

export default function About() {
  const Community_dect = [
    {
      userName: "Akshit Sinha",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <XIcon size={16} round={true} /> }
      ],
      photo: "http://localhost:3500/Profilep/" + "akshit.jpg"
    },
    {
      userName: "Deeptansh Sharma",
      details: [],
      links: [],
      photo: "http://localhost:3500/Profilep/" + "Deeptansh_Sharma.png"
    },
  ];

  const FakeNews = [
    {
      userName: "Siddharth Mavani",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
      ],
      photo: "http://localhost:3500/Profilep/" + "mavani.jpg"
    },
    {
      userName: "Arnav Negi",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
      ],
      photo: "http://localhost:3500/Profilep/" + "arnav.jpeg"
    },
  ];

  const Dashboard = [
    {
      userName: "Ritwik Mishra",
      details: ["Student of IIIT Delhi", "Co-Advised with Prof. Rajiv", "Ratn Shah"],
      links: [],
      photo: "http://localhost:3500/Profilep/" + "ritwikm.jpg"
    },
    {
      userName: "Ruthwik Alamuru",
      details: [],
      links: [
        { url: 'https://www.linkedin.com/in/ruthwik-alamuru-bb460a1a4/', icon: <LinkedinIcon size={16} round={true} /> },
        { url: 'https://bsky.app/profile/random-goose.bsky.social', icon: <XIcon size={16} round={true} /> },
      ],
      photo: "http://localhost:3500/Profilep/" + "placeholder.jpg"
    },
    {
      userName: "Bhupathi Reddy Budupu",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <XIcon size={16} round={true} /> },
      ],
      photo: "http://localhost:3500/Profilep/" + "Bhupathi.jpg"
    },
    {
      userName: "C Gaurav Sushant",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <XIcon size={16} round={true} /> }
      ],
      photo: "http://localhost:3500/Profilep/" + "Sushant.jpg"
    },
  ];

  const FramingTeam = [
    {
      userName: "Tejasvi Chebrolu",
      details: [],
      links: [],
      photo: "http://localhost:3500/Profilep/" + "tejasvi.jpg"
    },
    {
      userName: "N Harsha Vardhan",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <XIcon size={16} round={true} /> }
      ],
      photo: "http://localhost:3500/Profilep/" + "harsha_v.jpeg"
    },
    {
      userName: "Rohan Chowdary Modepalle",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <XIcon size={16} round={true} /> }
      ],
      photo: "http://localhost:3500/Profilep/" + "rohan_c.jpeg"
    },
  ];

  const Political_ads = [
    {
      userName: "N Harsha Vardhan",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <XIcon size={16} round={true} /> }
      ],
      photo: "http://localhost:3500/Profilep/" + "harsha_v.jpeg"
    },
    {
      userName: "Bollimuntha Shreya",
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
      ],
      photo: "http://localhost:3500/Profilep/" + "placeholder.jpg"
    },
  ];

  const coreTeamData = [
    {
      userName: 'Ponnurangam Kumaraguru "PK"',
      details: [],
      links: [
        { url: dummyUrl, icon: <LinkedinIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <InstagramIcon size={16} round={true} /> },
        { url: dummyUrl, icon: <XIcon size={16} round={true} /> }
      ],
      photo: "http://localhost:3500/Profilep/" + "pk.jpg"
    },
  ];

  const Toxic_memes = [
    {
      userName: "Khush Patel",
      details: [],
      links: [],
      photo: "http://localhost:3500/Profilep/" + "Khush_Patel.png"
    },
    {
      userName: "Rahul Garg",
      details: [],
      links: [],
      photo: "http://localhost:3500/Profilep/" + "Rahul_Garg.png"
    },
  ];

  const generateRows = (data) => {
    const rows = [];
    let rowItems = [];

    data.forEach((member, index) => {
      // Use a unique key, e.g., userName + index (in case of duplicate names)
      rowItems.push(generateUserDetailsCard(member.userName, member.details, member.links, member.photo, `${member.userName}-${index}`));

      // If the row is filled with 2 items or it's the last item in data, push the row
      if (rowItems.length === 2 || index === data.length - 1) {
        rows.push(<Row key={index} className="justify-content-center">{rowItems}</Row>);
        rowItems = []; // Reset row items
      }
    });

    return rows;
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <h4 className="text-center mb-4">Team Lead</h4>
      </Row>
      <Row>
        {generateRows(coreTeamData)}
      </Row>
      
      <Row className="justify-content-center">
        <h4 className="text-center mb-4">Dashboard</h4>
      </Row>
      <Row>
        {generateRows(Dashboard)}
      </Row>
      
      <Row className="justify-content-center">
        <h4 className="text-center mb-4">Community Detection</h4>
      </Row>
      <Row>
        {generateRows(Community_dect)}
      </Row>
      
      <Row className="justify-content-center">
        <h4 className="text-center mb-4">Toxic Memes</h4>
      </Row>
      <Row>
        {generateRows(Toxic_memes)}
      </Row>

      <Row className="justify-content-center">
        <h4 className="text-center mb-4">Political Ads</h4>
      </Row>
      <Row>
        {generateRows(Political_ads)}
      </Row>
      
      <Row className="justify-content-center">
        <h4 className="text-center mb-4">Fake News</h4>
      </Row>
      <Row>
        {generateRows(FakeNews)}
      </Row>
      
      <Row className="justify-content-center">
        <h4 className="text-center mb-4">Framing</h4>
      </Row>
      <Row>
        {generateRows(FramingTeam)}
      </Row>
    </Container>
  );
}