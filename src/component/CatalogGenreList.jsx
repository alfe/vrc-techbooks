import React from 'react'
import styled from 'styled-components'

const CatalogGenreList = ({ genre, setMatchGenre }) => {
  return (
    <GenreList>
      <GenreItem color='#EA4235' selected={genre.includes('avater')} onClick={() => setMatchGenre('avater')}>AVATER</GenreItem>
      <GenreItem color='#FBBC06' selected={genre.includes('tool')} onClick={() => setMatchGenre('tool')}>TOOL</GenreItem>
      <GenreItem color='#34A752' selected={genre.includes('shader')} onClick={() => setMatchGenre('shader')}>SHADER</GenreItem>
      <GenreItem color='#46BDC6' selected={genre.includes('gimmick')} onClick={() => setMatchGenre('gimmick')}>GIMMICK</GenreItem>
      <GenreItem color='#7442F4' selected={genre.includes('world')} onClick={() => setMatchGenre('world')}>WORLD</GenreItem>
    </GenreList>
  );
};
export default CatalogGenreList;

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
    font-size: ${isMobile ? '.8rem' : '1.5rem'};
    padding: .5rem ${isMobile ? '.5rem' : '2rem'};
    margin: 0 ${isMobile ? '0.1rem' : '.5rem'};
  }
`;
