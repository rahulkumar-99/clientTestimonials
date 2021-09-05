import React, { useState, useEffect, useRef } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import { FcCollapse} from "react-icons/fc";
import ReactAudioPlayer from 'react-audio-player';
import data from './data';
function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }

    
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>Client</span>Testimonials
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, avatar, name, designation, message, location,rating,audio} = person;

          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <img src={avatar} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="designation" >{designation}</p>
              <p className="rating"><FcCollapse/> {rating}</p>
              <ReactAudioPlayer
                src={audio}
                autoPlay
                controls
                muted = {personIndex!==index}
              />
              <p className="text">{message}</p>
              <h5 className="location">{location}</h5>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;