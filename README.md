# Spotify Playlist Viewer

A pretty skin for your Spotify playlist.

![Screenshot](/screenshot.png)

## Getting Started

### 1) Clone & Install Dependencies

```
$ git clone https://github.com/Robinnnnn/spotify-playlist-viewer
$ cd spotify-playlist-viewer
$ yarn
```

### 2) Set up your Spotify Developer account

Head over to the [dashboard](https://developer.spotify.com/dashboard), log in with your Spotify account, and create a Client ID. You will also need to add a `Redirect URI` set to http://localhost:4000/api/oauth. 

### 3) Configure your environment

Create a `.env` file in your root directory, with the Client ID and Client Secret generated from your Spotify developer dashboard:

```
CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET
BASE_URL=http://localhost:4000
```

Your app will use the `BASE_URL` to handle OAuth redirects. You'll need to update this field in a production environment.


### Run the app locally

```
$ yarn start
```

This will run the following commands concurrenty:
- `react-scripts start`: runs the frontend on http://localhost:3000 with hot reload enabled
- `yarn serve`: runs a server on http://localhost:4000, which is required for Spotify OAuth

The proxy setup in `/src/setupProxy.js` will forward requests made from the app to the server, as long as it's prefixed with `/api`. 

### Generate a client build for production

```
$ yarn build
```

### Run a production build on port 4000

```
$ yarn serve-prod
```

## Deployment

The app is hosted on [heroku](https://www.heroku.com/), and set to auto-deploy on merging to `master`. Herkou will use the command listed in the `Procfile` upon successful deployment.