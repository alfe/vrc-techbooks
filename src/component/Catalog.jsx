import React from 'react'
import { getUserList } from '../config';
import styled from 'styled-components'
import BoothDetail from './BoothDetail';

const WorldAlias = React.memo(() => {
  const [list, setlist] = React.useState([]);
  const [rotate, setRotate] = React.useState(360/43);
  const [height, setHeight] = React.useState(42);
  const [selected, setSelect] = React.useState(0);
  const [genre, setGenre] = React.useState([]);
  const [zoom, setZoom] = React.useState(false);
  const setMatchGenre = (gen) => {
    if (genre.includes(gen)) {
      const newGenre = genre.filter(n => n !== gen);
      setGenre(newGenre)
    } else {
      setGenre([...genre, gen])
    }
  };
  const getlist = () => {
    const twiIds = list.map(i=>i.twitterId)
    const a = document.createElement('a');
    a.href = 'data:text/plain,' + encodeURIComponent(twiIds.map(i=>
      `https://firebasestorage.googleapis.com/v0/b/vrc-techbooks.appspot.com/o/${i}%2F${i}-menu.png?alt=media`
      ).join("\r\n"));
    a.download = 'menu-list.txt';
    a.click();
    a.href = 'data:text/plain,' + encodeURIComponent(twiIds.map(i=>
      `https://firebasestorage.googleapis.com/v0/b/vrc-techbooks.appspot.com/o/${i}%2F${i}-poster.png?alt=media`
      ).join("\r\n"));
    a.download = 'poster-list.txt';
    a.click();
  }
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
            <button onClick={getlist}>getlist</button>
          </React.Fragment>
        )}
        {list.length !== 0 &&
          <CenterDetail zoom={zoom}>
            <BoothDetail data={list[selected]} zoom={zoom} setZoom={setZoom} />
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
const UserIcon = ({ src, place, rotate, height, onHover }) => {
  return (
    <UserIconBar rotate={rotate} height={height}>
      <UserIconImg place={place} rotate={rotate} src={src} onMouseEnter={onHover} />
    </UserIconBar>
  );
}

const isMobile = window.outerWidth < 800;
const GenreList = styled.div`
  && {
    flex: 100%;
    display: block;
    align-item: center;
    justify-content: center;
    flex-wrap: wrap;
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
