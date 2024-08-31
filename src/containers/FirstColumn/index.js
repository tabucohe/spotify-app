import React from 'react'
import { MainLogo, UserIcon } from '../../assets/Assets';
import styled from 'styled-components';

const FirstColumn = () => {
  return (
    <Container>
      <Logo><img src={MainLogo} alt='brand-logo' width={"120px"} /></Logo>
      <AccountIcon><img src={UserIcon} alt='brand-logo' width={"40px"} /></AccountIcon>
    </Container>
  )
}

export default FirstColumn



const Container = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%; 
    height: 80px;
    flex-direction: row;
    justify-content: space-between; 
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color:#fff
`;

const AccountIcon = styled.div`
  font-size: 20px;
`;