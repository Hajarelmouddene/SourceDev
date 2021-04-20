import React from "react";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";

const Footer = ({ location }) => {
  return (
    <FooterWrapper>
      <LocationStatus>
        <GoPrimitiveDot />
      </LocationStatus>
      {location && (
        <div>
          Your location: {location.city}, {location.country}
        </div>
      )}
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.footerBackground};
  color: ${({ theme }) => theme.footerText};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 4rem;
`;

const LocationStatus = styled.div`
  color: ${({ theme }) => theme.statusColor};
`;
export default Footer;
