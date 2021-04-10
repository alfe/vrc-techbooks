import React from 'react'
import styled from 'styled-components'
// import { getUserList } from '../config';
import BoothDetail from '../component/BoothDetail';
import CatalogGenreList from '../component/CatalogGenreListv2';
import UserIcon from '../component/UserIcon';
import { getV2Data } from '../assets/v2data';
import '../css/v2-icons.css';

const V2Catalog = React.memo(() => {
  const [list, setList] = React.useState([{
    'boothNo': "OFFICIAL",
    'twitterId': "mmnk_vt",
    'displayName': "みみんく",
    'boothURL': "https://mmnk-vt.booth.pm/",
    'hasCover': true,
    'hasMenu': true,
    'hasPoster': true,
    'place': 0,
    'MenuSubmittedAt': "2021/1/9 16:50:39",
    'PDFSubmittedAt': "2021/1/9 16:45:36",
    'PosterSubmittedAt': "2021/1/9 16:46:26",
  }]);
  const [rotate, setRotate] = React.useState(0);
  const [height] = React.useState(40);
  const [selected, setSelect] = React.useState("mmnk_vt");
  const [genre, setGenre] = React.useState<string[]>([]);
  const [zoom, setZoom] = React.useState(false);
  React.useEffect(() => {
    setList(getV2Data());
    // getUserList(setList);
  }, []);
  React.useEffect(() => {
    setRotate(360/list.length);
  }, [list]);

  const setMatchGenre = (gen: string) => {
    if (genre.includes(gen)) {
      const newGenre = genre.filter(n => n !== gen);
      setGenre(newGenre)
    } else {
      setGenre([gen])
    }
  };
  return (
    <WorldAliasArea>
      <WorldAliasCircle>
        <div>
          {list.map((user, i) => (
            <UserIcon
              key={`i-${user.twitterId}`}
              imgClass={`i-${user.twitterId}`}
              place={user.place}
              rotate={i * rotate}
              height={height}
              onHover={() => setSelect(user.twitterId)} />
          ))}
        </div>
        {list.length !== 0 &&
          <CenterDetail zoom={zoom}>
            <BoothDetail
              version={2}
              index={('0'+(selected+1)).slice(-2)}
              iconClass={`i-${selected}`}
              data={list.filter(u => u.twitterId === selected)[0]}
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
              <BoothDetail
                version={2}
                index={('0'+(user.index+1)).slice(-2)}
                iconClass={`i-${user.twitterId}`}
                data={user} />
            </DetailItem>
          )
        )}
      </DetailList>
    </WorldAliasArea>
  )
});
export default V2Catalog;

const getMatchGenre = (genre: string[], place: number) => {
  if (genre.length === 0) return true;
  switch (true) {
    case 1000000 < place: return genre.includes('world');
    case 900000 < place: return genre.includes('udon');
    case 800000 < place: return genre.includes('other');
    case 700000 < place: return genre.includes('effect');
    case 600000 < place: return genre.includes('avatar');
    default: return false;
  }
}

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
    width: 48rem;
    height: 48rem;
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
const CenterDetail = styled.div`
  && {
    position: absolute;
    left: calc(50% - 16.7rem);
    top: ${p => p.zoom ? '1.4rem' : '14rem' };
    border-radius: 8px;
    box-shadow: 2px 2px 8px #999999;
    zoom: ${p => p.zoom ? 2 : 1 };
  }
`;
