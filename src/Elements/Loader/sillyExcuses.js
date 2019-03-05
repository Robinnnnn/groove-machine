const excuses = [
  'Plugging in the record player',
  'Charging the airpods',
  'Configuring eardrums',
  'Downloading 5G',
  'Untangling the cables',
  'Grabbing the aux cord',
  'Setting up the jukebox',
  'Blowing on the cartrige',
  'Dusting off the speakers',
  'Tuning the guitar',
  'Oiling up the piano',
  'Talking to Spotify',
  'Warming up the equipment',
  'Syncing beats',
  'Configuring studio monitors',
  'Processing musical notes',
  'Sifting through records',
  'Judging your musical taste',
  'Looking for the ON switch'
]

export default () => excuses[Math.floor(Math.random() * excuses.length)]
