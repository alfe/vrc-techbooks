import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { getUserList } from '../config';

const JoinButton = React.memo(() => {
  const [open, setOpen] = React.useState(false);
  const [list, setlist] = React.useState([]);
  return (
    <React.Fragment>
      <Button onClick={() => {setOpen(true); getUserList(setlist)}}>
        出展者一覧<span className="small">  (12/08現在)</span>
      </Button>
      <Dialog fullWidth maxWidth="sm" onClose={() => setOpen(false)} aria-labelledby="participant-list" open={open}>
        <DialogTitle id="participant-list">出展者一覧 (12/08現在)</DialogTitle>
        <List>
          {list.map((user, i) => (
            <ListItem key={`user-${i}`}>
              <a href={`https://twitter.com/${user.twitterId}`} target="_blank" rel="external noopener noreferrer">
                <ListItemAvatar>
                  <Avatar alt={user.displayName} src={user.photoURL || ''} />
                </ListItemAvatar>
              </a>
              <ListItemText primary={user.displayName} secondary={`@${user.twitterId}`} />
              <ListItemSecondaryAction>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </React.Fragment>
  );
});
export default JoinButton;

const Button =styled.a`
  && {
    color: #FFFFFF;
    font-size: 2rem;
    background: #26B6FF;
    text-align: center;
    display: block;
    padding: 1rem;
    border-radius: 2rem;
    box-shadow: 4px 4px 16px #333;
    text-decoration: solid;
    text-shadow: 0 0 8px #022442;
    transition: 0.1s;
  }
  &&:hover {
    box-shadow: 1px 1px 4px #333;
    transform: translate(1px, 4px);
    transition: 0.1s;
  }
  &&:active {
    background: #022442;
    transition: 0.1s;
  }
  && .small {
    font-size: 0.65em;
  }
`;
