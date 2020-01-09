import React from 'react'
import { getUserList } from '../config';
import styled from 'styled-components'
import twitterLogo from './twitter-icon.svg';

const WorldAlias = React.memo(() => {
  const [list, setlist] = React.useState([]);
  const [rotate, setRotate] = React.useState(9);
  const [height, setHeight] = React.useState(42);
  const [selected, setSelect] = React.useState(23);
  const [genre, setGenre] = React.useState([]);
  const setMatchGenre = (gen) => {
    if (genre.includes(gen)) {
      const newGenre = genre.filter(n => n !== gen);
      setGenre(newGenre)
    } else {
      setGenre([...genre, gen])
    }
  };
  if (list.length === 0) {
    getUserList(setlist)
  }
  return (
    <WorldAliasArea>
      <WorldAliasCircle>
        <div>
          {list.map((user, i) => (
            <UserIcon
              key={`icon-${user.twitterId}`}
              rotate={i * rotate}
              height={height}
              onHover={() => setSelect(i)}
              place={user.place}
              src={user.photoURL || "/default-user-icon.png"} />
          ))}
        </div>
        {window.location.hash === '#d' && (
          // デバッグ用
          <React.Fragment>
            <input type="number" value={rotate} onChange={e => setRotate(e.target.value)} />
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
          </React.Fragment>
        )}
        {list.length !== 0 &&
          <CenterDetail>
            <BoothDetail data={list[selected]} />
          </CenterDetail>
        }
      </WorldAliasCircle>

      <GenreList>
        <GenreItem color='#EA4235' selected={genre.includes('avater')} onClick={() => setMatchGenre('avater')}>avater</GenreItem>
        <GenreItem color='#FBBC06' selected={genre.includes('tool')} onClick={() => setMatchGenre('tool')}>tool</GenreItem>
        <GenreItem color='#34A752' selected={genre.includes('shader')} onClick={() => setMatchGenre('shader')}>shader</GenreItem>
        <GenreItem color='#46BDC6' selected={genre.includes('gimmic')} onClick={() => setMatchGenre('gimmic')}>gimmic</GenreItem>
        <GenreItem color='#7442F4' selected={genre.includes('world')} onClick={() => setMatchGenre('world')}>world</GenreItem>
      </GenreList>

      <DetailList>
        {list.filter(user => getMatchGenre(genre, user.place)).map((user, i) => (
          <DetailItem key={`detail-${user.twitterId}`}>
            <BoothDetail data={user} />
          </DetailItem>
        ))}
      </DetailList>
    </WorldAliasArea>
  )
});
export default WorldAlias;

const getMatchGenre = (genre, place) => {
  if (genre.length === 0) return true;
  switch (true) {
    case 500000 < place: return genre.includes('world');
    case 400000 < place: return genre.includes('gimmic');
    case 300000 < place: return genre.includes('shader');
    case 200000 < place: return genre.includes('tool');
    case 100000 < place: return genre.includes('avater');
    default: return false;
  }
}

const GenreList = styled.div`
  && {
    flex: 100%;
    display: flex;
    align-item: center;
    justify-content: center;
    margin-top: 3rem;
  }
`;
const GenreItem = styled.button`
  && {
    cursor: pointer;
    border: 2px solid ${p => p.color};
    border-radius: 8px;
    background: ${p => p.selected ? p.color : 'transparent'};
    color: ${p => p.selected ? '#FFFFFF' : p.color};
    font-size: 1.5rem;
    padding: .5rem 2rem;
    margin: 0 .5rem;
  }
`;
const WorldAliasArea = styled.div`
  && {
    padding: 3rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
const WorldAliasCircle = styled.div`
  && {
    position: relative;
    background: #333333;
    border-radius: 50%;
    width: 50rem;
    height: 50rem;
    box-shadow: 0 0 8px #FFFFFF, 0 0 16px #FFFFFF;
  }
`;
const DetailList = styled.div`
  && {
    flex: 100%;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
  }
`;
const DetailItem = styled.div`
  && {
    margin: 0.75rem 0.5rem;
  }
`;
const UserIcon = ({ src, place, rotate, height, onHover }) => {
  return (
    <UserIconBar rotate={rotate} height={height}>
      <UserIconImg place={place} rotate={rotate} src={src} onMouseEnter={onHover} />
    </UserIconBar>
  );
}
const getPlaceColor = (place) => {
  switch (true) {
    case 500000 < place: return '#7442F4';
    case 400000 < place: return '#46BDC6';
    case 300000 < place: return '#34A752';
    case 200000 < place: return '#FBBC06';
    case 100000 < place: return '#EA4235';
    default: return '#26B5FF';
  }
}
const getPlaceName = (place) => {
  switch (true) {
    case 500000 < place: return 'WORLD';
    case 400000 < place: return 'GIMMIC';
    case 300000 < place: return 'SHADER';
    case 200000 < place: return 'TOOL';
    case 100000 < place: return 'AVATER';
    default: return 'OFFICIAL';
  }
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
    box-shadow: 0 0 8px ${p => getPlaceColor(p.place)}, 0 0 12px ${p => getPlaceColor(p.place)};
    border: 2px solid;
    border-color: ${p => getPlaceColor(p.place)};
  }
`;

const BoothDetail = ({ data={} }) => {
  const getImgUrl = (type) =>
    `${process.env.REACT_APP_FIREBASE_STORAGE_URL}${data.twitterId}%2F${data.twitterId}-${type}.png?alt=media`
  return (
    <BoothBlock>
      <BoothTag place={data.place}>{getPlaceName(data.place)}</BoothTag>
      <div>
        <UserInfoArea>
          <div>
            <img src={data.photoURL || "/default-user-icon.png"} alt={`${data.displayName}'s icon`} />
            <span>{data.displayName}</span>
          </div>
          <a href={`https://twitter.com/${data.twitterId}`} alt="twitter"
            target="_blank" rel="noopener noreferrer">
            <img src={twitterLogo} alt={`@{data.twitterId}`} />
          </a>
        </UserInfoArea>
        <BoothImageArea>
          <img src={!data.PosterSubmittedAt ? '/null-poster.png' : getImgUrl('poster')} alt="poster" />
          <img src={!data.MenuSubmittedAt ? '/null-menu.png' : getImgUrl('menu')} alt="menu" />
        </BoothImageArea>
        <ShopLinkButton href={data.boothURL || ''} alt="頒布場所">頒布場所</ShopLinkButton>
      </div>
    </BoothBlock>
  );
}
const ShopLinkButton = styled.a`
  && {
    text-decoration: none;
    padding: .5rem;
    margin: 0 1rem;
    border-radius: 3px;
    background: #333;
    color: #FFFFFF;
    font-weight: bold;
    box-shadow: 2px 2px 4px #333;
  }
  &&:hover {
    background: #282C34;
    transform: translate(1px, 1px);
    box-shadow: none;
  }
`;
const CenterDetail = styled.div`
  && {
    position: absolute;
    left: calc(50% - 16.7rem);
    top: 15rem;
    border-radius: 8px;
    box-shadow: 2px 2px 8px #999999;
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
  && > div > img {
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
