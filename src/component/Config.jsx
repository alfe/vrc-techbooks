import React from 'react'
import { getUserList } from '../config';
import styled from 'styled-components'

const Config = React.memo(() => {
  const [list, setlist] = React.useState([]);
  if (list.length === 0) {
    getUserList(setlist)
  }
  console.log(list)
  return (
    <ConfigArea>
      <table>
        <thead>
          <tr>
            <th>photoURL</th>
            <th>displayName</th>
            <th>twitterId</th>
            <th>Menu</th>
            <th>Poster</th>
            <th>PDF</th>
            <th>PDF2</th>
            <th>PDF3</th>
            <th>totalPages</th>
            <th>totalPages2</th>
            <th>totalPages3</th>
            <th>boothNo</th>
            <th>boothURL</th>
            <th>place</th>
          </tr>
        </thead>
        <tbody>
        {list.map(item => (
          <tr key={`${item.uid}_${item.twitterId}`}>
            <td><img src={item.photoURL} alt=""/></td>
            <td>{item.displayName}</td>
            <td><a href={`https://twitter.com/${item.twitterId}`}>{item.twitterId}</a></td>
            <td>{!item.MenuSubmittedAt ? '' : '✓'}</td>
            <td>{!item.PosterSubmittedAt ? '' : '✓'}</td>
            <td>{!item.PDFSubmittedAt ? '' : '✓'}</td>
            <td>{!item.PDF2SubmittedAt ? '' : '✓'}</td>
            <td>{!item.PDF3SubmittedAt ? '' : '✓'}</td>
            <td>{item.totalPages}</td>
            <td>{item.totalPages2}</td>
            <td>{item.totalPages3}</td>
            <td>{item.boothNo}</td>
            <td>{!item.boothURL ? '' : <a href={item.boothURL}>url</a>}</td>
            <td>{item.place}</td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{list.filter(i => !!i.MenuSubmittedAt).length}/{list.length}</td>
          <td>{list.filter(i => !!i.PosterSubmittedAt).length}/{list.length}</td>
          <td>{list.filter(i => !!i.PDFSubmittedAt).length}/{list.length}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </ConfigArea>
  )
});
export default Config;

const ConfigArea = styled.div`
  && {
    color: white;
  }
  a {
    color: aqua;
    font-weight: bold;
  }
`;
