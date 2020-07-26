import React from 'react'
import { getUserList } from '../config';
import styled from 'styled-components'
import BoothDetail from './BoothDetail';
import CatalogGenreList from './CatalogGenreList';
import '../css/generated-icons.css';

const WorldAlias = React.memo(() => {
  const [list, setlist] = React.useState([]);
  const [rotate, setRotate] = React.useState(360/43);
  const [height] = React.useState(42);
  const [selected, setSelect] = React.useState(0);
  const [genre, setGenre] = React.useState([]);
  const [zoom, setZoom] = React.useState(false);
  const setMatchGenre = (gen) => {
    if (genre.includes(gen)) {
      const newGenre = genre.filter(n => n !== gen);
      setGenre(newGenre)
    } else {
      setGenre([gen])
    }
  };
  if (list.length === 0) {
    getUserList((userlist) => {
      setlist(userlist)
      setRotate(360 / userlist.length)
    })
  }
  return (
    <WorldAliasArea>
      <WorldAliasCircle>
        <div>
          {list.map((user, i) => (
            <UserIcon
              key={`icon-${user.twitterId}`}
              index={('0'+(i+1)).slice(-2)}
              rotate={i * rotate}
              height={height}
              onHover={() => setSelect(i)}
              place={user.place} />
          ))}
        </div>
        {list.length !== 0 &&
          <CenterDetail zoom={zoom}>
            <BoothDetail
              index={('0'+(selected+1)).slice(-2)}
              data={list[selected]}
              zoom={zoom}
              setZoom={setZoom} />
          </CenterDetail>
        }
      </WorldAliasCircle>

      <CatalogGenreList genre={genre} setMatchGenre={setMatchGenre} />
      <DetailList>
        {list
          .map((user, index)=> ({ ...user, index }))
          .filter(user => getMatchGenre(genre, user.place))
          .map((user) => (
            <DetailItem key={`detail-${user.twitterId}`}>
              <BoothDetail index={('0'+(user.index+1)).slice(-2)} data={user} />
            </DetailItem>
          )
        )}
      </DetailList>
    </WorldAliasArea>
  )
});
export default WorldAlias;

const getMatchGenre = (genre, place) => {
  if (genre.length === 0) return true;
  switch (true) {
    case 500000 < place: return genre.includes('world');
    case 400000 < place: return genre.includes('gimmick');
    case 300000 < place: return genre.includes('shader');
    case 200000 < place: return genre.includes('tool');
    case 100000 < place: return genre.includes('avater');
    default: return false;
  }
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
const UserIcon = React.memo(({ index, place, rotate, height, onHover }) => {
  return (
    <UserIconBar rotate={rotate} height={height}>
      <UserIconImg className={`icon-${index}`}  place={place} rotate={rotate} onMouseEnter={onHover} />
    </UserIconBar>
  );
});

const isMobile = window.outerWidth < 800;
const WorldAliasArea = styled.div`
  && {
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
    ${!isMobile ? '' : `
    zoom: ${window.outerWidth/900};
    `}
  }
`;
const DetailList = styled.div`
  && {
    flex: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    ${!isMobile ? '' : `
    zoom: ${window.outerWidth/640};
    `}
  }
`;
const DetailItem = styled.div`
  && {
    margin: 0.75rem 0.5rem;
  }
`;
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

const CenterDetail = styled.div`
  && {
    position: absolute;
    left: calc(50% - 16.7rem);
    top: ${p => p.zoom ? '1.5rem' : '15rem' };
    border-radius: 8px;
    box-shadow: 2px 2px 8px #999999;
    zoom: ${p => p.zoom ? 2 : 1 };
  }
`;
