import React from 'react';
import './ExploreNow.css';

// Sample image imports (Replace these with actual paths)
import room1 from "../../Assets/room1.jpeg";
import room2 from "../../Assets/room2.jpeg";
import room3 from "../../Assets/room3.jpeg";
import room4 from "../../Assets/room4.jpeg";
import room5 from "../../Assets/room5.jpeg";
import room6 from "../../Assets/room6.jpeg";
import room7 from "../../Assets/room7.jpeg";
import restArea from "../../Assets/restArea.jpeg";

const images = [
  { 
    src: room1, 
    title: 'Bodleian Library', 
    description: 'A quiet space to study and focus on your work.',
    boxes: ['LED lighting', 'Series Chair']
  },
  { 
    src: room2, 
    title: 'Secret', 
    description: 'A hidden gem perfect for deep concentration.',
    boxes: ['LED lighting', 'Series Chair', 'Personal lighting brightness control']
  },
  { 
    src: room3, 
    title: 'Hatchard', 
    description: 'This is a new type of seat for members who want to study leisurely in a spacious window. It is my own hideout where I can relax and focus.',
    boxes: ['Series Chair']
  },
  { 
    src: room4, 
    title: 'Group Study', 
    description: 'It is a space where you can discuss and study together, and through discussions and Q&A, you can complement the limitations of studying alone. In addition to group study, you can also create synergy by participating in learning community activities such as reading clubs, tutoring/mentoring, etc. according to your purpose.',
    boxes: ['100% reservation only']
  },
  { 
    src: room5, 
    title: 'Oxford', 
    description: 'A sophisticated study area designed for focused learning.',
    boxes: ['LED lighting', 'Series Chair', 'Personal lighting brightness control']
  },
  { 
    src: room6, 
    title: 'Imperial', 
    description: 'Inspired by the Imperial College Library in England, the four-sided, independent, individual space allows for greater concentration.',
    boxes: ['LED lighting', 'Series Chair', 'Personal lighting brightness control']
  },
  { 
    src: room7, 
    title: 'Laptop Zone', 
    description: 'This is a separate seat specifically designed for laptop use within the cafe zone.',
    boxes: ['LED lighting', 'Series Chair', 'Personal lighting brightness control']
  },
  { 
    src: restArea, 
    title: 'Rest Area', 
    description: 'This is a space designed for relaxation and simple meals. You can enjoy a simple meal and a cup of coffee without having to leave the reading room.',
    boxes: ['Microwave oven', 'Complimentary tea and coffee']
  }
];

const ExploreNow = () => {
  return (
    <div className="explore-container">
      {images.map((item, index) => (
        <div key={index} className="image-box">
          <img src={item.src} alt={item.title} />
          <p className="image-title">{item.title}</p>
          <p className={`image-description ${index % 2 === 0 ? 'left-align' : 'right-align'}`}>
            {item.description}
          </p>
          <div className="boxes-container">
            <div className="box-item-wrapper">
              {item.boxes.map((box, i) => (
                <div key={i} className="box-item">{box}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExploreNow;
