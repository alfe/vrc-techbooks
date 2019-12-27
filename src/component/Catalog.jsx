import React from 'react'
import { getUserList } from '../config';
import styled from 'styled-components'

const Catalog = React.memo(() => {
  const [list, setlist] = React.useState([]);
  const [rotate] = React.useState(8.7);
  const [height] = React.useState(42);
  const [selected, setSelect] = React.useState(23);
  if (list.length === 0) {
    getUserList(setlist)
  }
  console.log(list)
  return (
    <WorldAliasArea>
      <div>
        {list.map((user, i) => (
          <UserIcon
            key={`icon-${user.twitterId}`}
            rotate={i * rotate}
            height={height}
            onHover={() => setSelect(i)}
            src={user.photoURL || "/default-user-icon.png"} />
        ))}
      </div>
      {list.length !== 0 && <BoothDetail data={list[selected]} />}
    </WorldAliasArea>
  )
});
export default Catalog;

const WorldAliasArea = styled.div`
  && {
    position: relative;
    background: #333333;
    margin: 3rem auto;
    border-radius: 50%;
    width: 50rem;
    height: 50rem;
  }
`;
const UserIcon = ({ src, rotate, height, onHover }) => {
  return (
    <UserIconBar rotate={rotate} height={height}>
      <UserIconImg rotate={rotate} src={src} onMouseEnter={onHover} />
    </UserIconBar>
  );
}
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
const UserIconImg = styled.img`
  && {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    transform: rotate(${p => -p.rotate}deg);
  }
`;

const BoothDetail = ({ data={} }) => {
  const getImgUrl = (type) =>
    `${process.env.REACT_APP_FIREBASE_STORAGE_URL}${data.twitterId}%2F${data.twitterId}-${type}.png?alt=media`
  return (
    <BoothBlock>
      <BoothTag>WORLD</BoothTag>
      <div>
        <UserInfoArea>
          <img src={data.photoURL || "/default-user-icon.png"} alt={`${data.displayName}'s icon`} />
          <span>{data.displayName}</span>
          <a href={`https://twitter.com/${data.twitterId}`} alt="twitter"
            target="_blank" rel="noopener noreferrer">
            @{data.twitterId}
          </a>
          <div>BoothURL</div>
        </UserInfoArea>
        <BoothImageArea>
          <img src={!data.PosterSubmittedAt ? '/null-poster.png' : getImgUrl('poster')} alt="poster" />
          <img src={!data.MenuSubmittedAt ? '/null-menu.png' : getImgUrl('menu')} alt="menu" />
        </BoothImageArea>
      </div>
    </BoothBlock>
  );
}
const BoothBlock = styled.div`
  && {
    display: flex;
    position: absolute;
    width: 33.4rem;
    height: 18rem;
    left: calc(50% - 16.7rem);
    top: 16rem;
    background: #FFFFFF;
    box-shadow: 2px 2px 8px #999999;
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
  background: orangered;
  font-weight: bold;
  color: #FFFFFF;
`;
const UserInfoArea = styled.div`
  && {
    display: flex;
    padding: 0 1rem;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
  }
  && > img {
    border-radius: 50%;
  }
  && > span {
    font-size: 1.2em;
    margin-left: 1rem;
    font-weight: bold;
  }
  && > a {
    font-size: 1.2em;
    margin: 1rem;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const BoothImageArea = styled.div`
  && {
    display: flex;
    padding: .5rem;
    height: 200px;
    background: #FFFFFF;
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
