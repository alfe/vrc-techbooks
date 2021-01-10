import React from 'react'
import styled from 'styled-components'
import media from "styled-media-query";

const CatalogGenreList = ({ genre, setMatchGenre }) => {
  return (
    <GenreList>
      <GenreItem color='#EA4235' selected={genre.includes('avatar')} onClick={() => setMatchGenre('avatar')}>AVATAR</GenreItem>
      <GenreItem color='#FBBC06' selected={genre.includes('effect')} onClick={() => setMatchGenre('effect')}>EFFECT</GenreItem>
      <GenreItem color='#34A752' selected={genre.includes('other')} onClick={() => setMatchGenre('other')}>OTHER</GenreItem>
      <GenreItem color='#46BDC6' selected={genre.includes('udon')} onClick={() => setMatchGenre('udon')}>UDON</GenreItem>
      <GenreItem color='#7442F4' selected={genre.includes('world')} onClick={() => setMatchGenre('world')}>WORLD</GenreItem>
    </GenreList>
  );
};
export default CatalogGenreList;

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
    ${media.lessThan("medium")`
      font-size: .8rem;
      padding: .5rem .5rem;
      margin: 0 0.1rem;
    `}
    ${media.greaterThan("medium")`
      font-size: 1.5rem;
      padding: .5rem 2rem;
      margin: 0 .5rem;
    `}
  }
`;
