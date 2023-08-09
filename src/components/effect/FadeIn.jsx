import { useEffect, useState } from 'react';
import './FadeIn.css';

const FadeIn = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // console.log(props);
    setIsVisible(true);
  }, []);

  return (
    <div className={`fade-in ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export default FadeIn;
