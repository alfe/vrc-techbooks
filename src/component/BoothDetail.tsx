import React from 'react'
import styled from 'styled-components'
import { getPlaceColor, getPlaceName } from './lib';
import twitterLogo from '../assets/image/twitter-icon.svg';

type Props = {
  data: {
    twitterId: string;
    place: number;
    displayName: string;
    boothNo: string;
    boothURL: string;
    hasPoster: boolean;
    hasMenu: boolean;
  };
  index: string;
  zoom?: any;
  setZoom?: Function;
};

const BoothDetail = ({ data, index, zoom, setZoom }: Props) => {
  const getImgUrl = (type) => `/img/booth-detail/${data.twitterId}-${type}.jpg`
  return (
    <BoothBlock>
      <BoothTag place={data.place}>{getPlaceName(data.place)}</BoothTag>
      <div>
        <UserInfoArea>
          <div>
            <i className={`icon-${index}`} />
            <span>{data.displayName}</span>
            <BoothNo place={data.place}>{data.boothNo}</BoothNo>
          </div>
          <a href={`https://twitter.com/${data.twitterId}`} target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt={`@{data.twitterId}`} />
          </a>
        </UserInfoArea>
        <BoothImageArea zoom={zoom} onClick={() => setZoom && setZoom(!zoom)}>
          <img src={!data.hasPoster ? '/null-poster.png' : getImgUrl('poster')} alt="poster" />
          <img src={!data.hasMenu ? '/null-menu.png' : getImgUrl('menu')} alt="menu" />
        </BoothImageArea>
        <ShopLinkButton href={data.boothURL} disabled={!data.boothURL} alt="頒布場所" target="_blank" rel="noopener noreferrer">
          頒布場所
        </ShopLinkButton>
      </div>
    </BoothBlock>
  );
}

const BoothNo = styled.div`
  && {
    width: 4rem;
    height: inherit;
    padding: .5em;
    line-height: 1;
    border-radius: 3px;
    background: ${p => getPlaceColor(p.place)};
    color: #FFFFFF;
    font-size: 0.8em;
    font-weight: bold;
    margin: 0 1rem;
  }
`;
const ShopLinkButton = styled.a`
  && {
    text-decoration: none;
    padding: .5rem;
    margin: 0 1rem;
    border-radius: 3px;
    background: ${p=>p.disabled ? '#999' : '#333'};
    color: #FFFFFF;
    font-weight: bold;
    box-shadow: ${p=>p.disabled ? 'none' : '2px 2px 4px #333'};;
  }
  &&:hover {
    background: ${p=>p.disabled ? '#999' : '#282C34'};
    transform: ${p=>p.disabled ? 'none' : 'translate(1px, 1px)'};
    box-shadow: none;
  }
`;
const BoothBlock = styled.div`
  && {
    display: flex;
    width: 33.6rem;
    height: 20rem;
    background: #FFFFFF;
    border-radius: 8px;
    overflow: hidden;
  }
  && > div:last-of-type {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const BoothTag = styled.div`
  width: 1.4rem;
  writing-mode: vertical-rl;
  transform: scale(-1);
  font-weight: bold;
  color: #FFFFFF;
  background: ${p => getPlaceColor(p.place)};
`;
const UserInfoArea = styled.div`
  && {
    display: flex;
    padding: 0 1rem;
    align-items: center;
    justify-content: space-between;
    height: 48px;
  }
  && > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  && > div > i {
    border-radius: 50%;
  }
  && > div > span {
    font-size: 1.2em;
    margin-left: 1rem;
    font-weight: bold;
  }
  && > a {
    margin: 0.5rem 0.5rem 0;
    text-decoration: underline;
  }
  && > a > img {
    height: 2.5rem;
    width: 2.5rem;
  }
  && > a > img:hover {
    height: 2.5rem;
    width: 2.5rem;
    transform: translate(1px, 1px);
  }
`;

const BoothImageArea = styled.div`
  && {
    display: flex;
    padding: .5rem;
    height: 200px;
    background: #FFFFFF;
    cursor: ${p => typeof p.zoom === 'undefined' ? 'auto' : (p.zoom ? 'zoom-out' : 'zoom-in') };
  }
  && img {
    object-fit: contain;
  }
  && img:first-of-type {
    width: 8.75rem;
  }
  && img:last-of-type {
    width: 22rem;
    padding-left: .5rem;
  }
`;

export default BoothDetail;
