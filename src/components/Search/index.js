import {
  Typography, List, ListSubheader,
} from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import AuthContext from '../../AuthContext';
import Message from '../Message';

function Search({ queryStr, ...props }) {

  const [loading, setLoading] = React.useState(true);
  const [messages, setMessages] = React.useState([]);

  const token = React.useContext(AuthContext);

  function performSearch() {
    axios
      .get('/search/v1', {
        params: {
          token,
          queryStr,
        },
      })
      .then(({ data }) => {
        const { messages } = data;
        if (typeof messages !== "undefined" && !Array.isArray(messages)) return;
        setMessages(messages);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  // Only perform search if there is a query
  React.useEffect(() => {
    if (queryStr !== "") performSearch();
  }, [token, queryStr])

  // If there is no query
  if (queryStr === "") {
    return <>
      <Typography variant="h4" style={{ marginBottom: 10 }}>Search</Typography>
      <Typography variant="h6">Enter a query in the search bar above</Typography>
    </>
  }

  // If there is a query
  return <>
    <Typography variant="h4" style={{ marginBottom: 10 }}>Search Results</Typography>
    {(loading) ?
      <LinearProgress />
      :
      (messages.length == 0) ?
        <Typography variant="h6">Your search did not return any results</Typography>
        :
        <List
          subheader={<ListSubheader>Messages</ListSubheader>}
          style={{ width: '100%' }}
        >
          {messages.slice().reverse().map((message) => (
            <Message key={message.messageId} {...message} />
          ))}
        </List>
    }
  </>
}

export default Search;
