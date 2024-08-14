import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #3498db; /* Bright blue color */
  display: flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const LogoAccent = styled.span`
  color: #2c3e50; /* Dark slate color for accent */
`;

const LogoCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  margin-right: 10px;
`;

export const Logo = () => (
  <LogoContainer>
    <LogoCircle>E</LogoCircle>
    <LogoAccent>Venture</LogoAccent>
  </LogoContainer>
);
