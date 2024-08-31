import React from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../../assets/Assets';
import { SEARCH_PLACEHOLDER } from '../../utils/constants/constants';

const SearchBox = () => {
  return (
    <SearchWrapper>
      <Input placeholder={SEARCH_PLACEHOLDER}/>
      <SearchImg src={SearchIcon} alt="Search_Box" />
    </SearchWrapper>
  );
};

export default SearchBox;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #FFFFFF14;
  border-radius: 8px;
  padding: 5px 10px;
  width: 100%; /* Set the desired width */
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  border-radius: 25px;
`;

const SearchImg = styled.img`
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;