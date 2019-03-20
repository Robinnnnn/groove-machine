// Returns the relevant login endpoint, appending a playlistID if necessary
export const getLoginEndpoint = pathname => {
  const rx = /^\/?playlist\/([a-zA-Z0-9]+)\/?$/
  const match = rx.exec(pathname)
  const playlistID = match && match[1]
  const query = playlistID ? `?playlist_id=${playlistID}` : ''
  const endpoint = `/api/login${query}`
  return endpoint
}
