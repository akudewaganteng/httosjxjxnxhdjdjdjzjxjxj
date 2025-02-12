const axios = require('axios');

async function spotifyDownload(url) {
  try {
    console.log('Fetching Spotify track details for URL:', url);

    let response = await axios.get(`https://api.fabdl.com/spotify/get?url=${url}`);
    console.log('API Response:', response.data);

    if (!response.data.result) {
      return { status: false, message: "Music not found" };
    }

    let { id, name, artists, image, duration_ms, gid } = response.data.result;
    let curl = await axios.get(`https://api.fabdl.com/spotify/mp3-convert-task/${gid}/${id}`);
    let { download_url } = curl.data.result;

    return {
      status: true,
      creator: 'Yumeee',
      title: name,
      artist: artists,
      duration: convertDuration(duration_ms),
      thumbnail: image,
      download_url: `https://api.fabdl.com${download_url}`
    };
  } catch (error) {
    console.error('Error fetching or downloading track:', error);
    return { status: false, message: "Internal server error" };
  }
}

function convertDuration(durationMs) {
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);

  let result = '';
  if (hours > 0) result += hours + 'h ';
  if (minutes > 0) result += minutes + 'm ';
  if (seconds > 0) result += seconds + 's';

  return result.trim();
}

module.exports = { spotifyDownload };