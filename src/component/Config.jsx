import React from 'react'
import { getUserList } from '../config';
import styled from 'styled-components'

const requestImg = (index, twitterId) => {
  const imgUrl = `https://firebasestorage.googleapis.com/v0/b/vrc-techbooks.appspot.com/o/${twitterId}%2F${twitterId}-${index}.png?alt=media`;
  console.log(imgUrl);

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.href = imgUrl;
  a.download = `${twitterId}-${index}.png`;
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(imgUrl);
  }, 500);
  if (index > 1) {
    setTimeout(() => {
      requestImg(index - 1, twitterId);
    }, 2000);
  } else {
    console.log(`${twitterId}: end`)
  }
}

const Config = React.memo(() => {
  const [list, setlist] = React.useState([]);
  const onClick = (twitterId, totalPages) => {
    const page = totalPages/2 < 8 ? Math.floor(totalPages/2) : 8;
    requestImg(page, twitterId);
  };
  if (list.length === 0) {
    getUserList(setlist)
  }
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
            <th>cover</th>
            <th>cover2</th>
            <th>cover3</th>
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
            <td>{!item.MenuSubmittedAt ? '' : item.MenuSubmittedAt.slice(5,9)}</td>
            <td>{!item.PosterSubmittedAt ? '' : item.PosterSubmittedAt.slice(5,9)}</td>
            <td>{!item.PDFSubmittedAt ? '' : item.PDFSubmittedAt.slice(5,9)}</td>
            <td>{!item.PDF2SubmittedAt ? '' : item.PDF2SubmittedAt.slice(5,9)}</td>
            <td>{!item.PDF3SubmittedAt ? '' : item.PDF3SubmittedAt.slice(5,9)}</td>
            <td><a href="#" onClick={() => onClick(item.twitterId, item.totalPages)}>{item.totalPages}</a></td>
            <td>{item.totalPages2}</td>
            <td>{item.totalPages3}</td>
            <td>{!item.totalPages ? '' : <a href={`${process.env.REACT_APP_FIREBASE_STORAGE_URL}${item.twitterId}%2F${item.twitterId}-cover.png?alt=media`} >img</a>}</td>
            <td>{!item.totalPages2 ? '' : <a href={`${process.env.REACT_APP_FIREBASE_STORAGE_URL}${item.twitterId}%2F${item.twitterId}-2-cover.png?alt=media`} >img</a>}</td>
            <td>{!item.totalPages3 ? '' : <a href={`${process.env.REACT_APP_FIREBASE_STORAGE_URL}${item.twitterId}%2F${item.twitterId}-3-cover.png?alt=media`} >img</a>}</td>
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
