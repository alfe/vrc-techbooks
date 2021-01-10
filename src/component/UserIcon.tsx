import React from 'react'
import styled from 'styled-components';
import { getPlaceColor } from './lib';

type Props = {
  imgClass: string,
  place: number,
  rotate: number,
  height: number,
  onHover: Function,
};

const UserIcon = React.memo(({
  imgClass,
  place,
  rotate,
  height,
  onHover,
}: Props) => {
  return (
    <UserIconBar rotate={rotate} height={height}>
      <UserIconImg className={imgClass} place={place} rotate={rotate} onMouseEnter={onHover} />
    </UserIconBar>
  );
});

export default UserIcon;



const UserIconBar = styled.div`
  && {
    height: ${p=>p.height}rem;
    width: 48px;
    position: absolute;
    left: calc(50% - 24px);
    top: 64px;
    transform: rotate(${p => p.rotate}deg) translateY(-50px);
  }
`;
const UserIconImg = styled.i`
  && {
    display: block;
    border-radius: 50%;
    cursor: pointer;
    transform: rotate(${p => -p.rotate}deg);
    box-shadow: 0 0 8px ${p => getPlaceColor(p.place)}, 0 0 12px ${p => getPlaceColor(p.place)};
    border: 2px solid;
    border-color: ${p => getPlaceColor(p.place)};
  }
`;

