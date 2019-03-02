// Returns the relevant login endpoint, appending a playlistId if necessary
export const getLoginEndpoint = pathname => {
  const rx = /^\/?playlist\/([a-zA-Z0-9]+)\/?$/
  const match = rx.exec(pathname)
  const playlistId = match && match[1]
  const query = playlistId ? `?playlistId=${playlistId}` : ''
  const endpoint = `/api/login${query}`
  return endpoint
}
