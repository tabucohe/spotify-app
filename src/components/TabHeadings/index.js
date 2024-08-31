import React from 'react'
import styled from 'styled-components'

const TabHeadings = ({title,isActive,onClick}) => {
  return (
    <Heading onClick={()=>onClick(title)} active={isActive}>
      {title}
    </Heading>
  )
}

export default TabHeadings

const Heading = styled.p`
  font-size: 24px;
  font-weight: 700;
  color:#fff;
  opacity: ${(props) => (props.active ? '100%' : '50%')}; 
  cursor: pointer; 
  transition: color 0.3s ease-in-out; 
`
