import React from 'react'
import { getUserList, providerTwitter, createUserData } from '../config';
import styled from 'styled-components'
import LoginGate from './LoginGate'

window.createUserData = createUserData;
// const requestImg = (index, twitterId) => {
//   const imgUrl = `https://firebasestorage.googleapis.com/v0/b/vrc-techbooks.appspot.com/o/${twitterId}%2F${twitterId}-${index}.png?alt=media`;
//   console.log(imgUrl);

//   const a = document.createElement("a");
//   document.body.appendChild(a);
//   a.href = imgUrl;
//   a.download = `${twitterId}-${index}.png`;
//   a.click();
//   setTimeout(() => {

//     a.remove();
//     URL.revokeObjectURL(imgUrl);
//   }, 500);
//   if (index > 1) {
//     setTimeout(() => {
//       requestImg(index - 1, twitterId);
//     }, 2000);
//   } else {
//     console.log(`${twitterId}: end`)
//   }
// }

const Config = React.memo(() => {
  const [list, setlist] = React.useState([]);
  React.useEffect(() => {
    if (sessionStorage.getItem('username')) {
      getUserList(setlist)
    }
  }, []);
  // const onClick = (twitterId, totalPages) => {
  //   const page = totalPages/2 < 8 ? Math.floor(totalPages/2) : 8;
  //   requestImg(page, twitterId);
  // };
  
  if (!sessionStorage.getItem('username')) {
    return (<LoginGate onClick={() => providerTwitter(() => {window.location.reload()})} />);
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
            <th>totalPages</th>
            <th>cover</th>
            <th>boothURL</th>
            <th>boothNo</th>
            <th>place</th>
          </tr>
        </thead>
        <tbody>
        {list.map(item => (
          <tr key={`${item.uid}_${item.twitterId}`}>
            <td><img src={item.photoURL} alt=""/></td>
            <td>{item.displayName}</td>
            <td><a href={`https://twitter.com/${item.twitterId}`}>{item.twitterId}</a></td>
            <td>{!item.MenuSubmittedAt ? '' : item.MenuSubmittedAt.slice(5,15)}</td>
            <td>{!item.PosterSubmittedAt ? '' : item.PosterSubmittedAt.slice(5,15)}</td>
            <td>{!item.PDFSubmittedAt ? '' : item.PDFSubmittedAt.slice(5,15)}</td>
            <td>{item.totalPages}</td>
            <td>{!item.totalPages ? '' : <a href={`${process.env.REACT_APP_FIREBASE_STORAGE_URL}${item.twitterId}%2F${item.twitterId}-cover.png?alt=media`} >img</a>}</td>
            <td>{!item.boothURL ? '' : <a href={item.boothURL}>url</a>}</td>
            <td>{item.boothNo}</td>
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
