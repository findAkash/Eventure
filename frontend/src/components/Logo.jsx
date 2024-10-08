import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #3498db; /* blue color */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const LogoAccent = styled.span`
  color: #2c3e50; /* Dark slate color for accent */
`;

const LogoCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3498db; /* blue color */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 10px;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <LogoCircle>E</LogoCircle>
      <LogoAccent>Venture</LogoAccent>
    </LogoContainer>
  );
};

export default Logo;
