const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
  let url = 'https://www.apitutor.org/spotify/simple/v1/search?type=track&q=' + term;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    document.querySelector("#tracks").innerHTML = "";
    if(data.length == 0) {
      document.querySelector("#tracks").innerHTML = "No tracks found that match your search criteria.";
    }
    const firstfive = data.slice(0,5);
    for(track of firstfive)
    {
      if(!track.preview_url) {
        const template = `<section id="tracks">
            <section class="track-item preview">
                <img src="${track.album.image_url}">
                <i class="fas play-track fa-play" aria-hidden="true"></i>
                <div class="label">
                    <h3>${track.name}</h3>
                    <p>
                        ${track.artist.name} (no preview track available)
                    </p>
                </div>
            </section>`;
            document.querySelector("#tracks").innerHTML += template;
      } else {
          const template = `<section id="tracks">
              <section class="track-item preview" data-preview-track="${track.preview_url}">
                  <img src="${track.album.image_url}">
                  <i class="fas play-track fa-play" aria-hidden="true"></i>
                  <div class="label">
                      <h3>${track.name}</h3>
                      <p>
                          ${track.artist.name}
                      </p>
                  </div>
              </section>`;
          document.querySelector("#tracks").innerHTML += template;
        }
    }
  })
  .then(() => attachEventListener());
};

const getAlbums = (term) => {
  let url = 'https://www.apitutor.org/spotify/simple/v1/search?type=album&q='+ term;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    document.querySelector("#albums").innerHTML = "";
    if(data.length == 0) {
      document.querySelector("#albums").innerHTML = "No No albums were returned.";
    }
    for(album of data)
    {
      const template = `<section class="album-card" id="${album.id}">
      <div>
          <img src="${album.image_url}">
          <h3>${album.name}</h3>
          <div class="footer">
              <a href="${album.spotify_url}" target="_blank">
                  view on spotify
              </a>
          </div>
      </div>
    </section>`;
  document.querySelector("#albums").innerHTML += template;
    }
  });
};

const getArtist = (term) => {
  let url = 'https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=' + term;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.length == 0) {
      document.querySelector("#artist").innerHTML = "No artists found that match your search criteria.";
    }
    console.log(data[0]);
    const artist = data[0];
    const template = `<section class="artist-card" id="${artist.id}">
    <div>
        <img src="${artist.image_url}">
        <h3>${artist.name}</h3>
        <div class="footer">
            <a href="${artist.spotify_url}">
                view on spotify
            </a>
        </div>
    </div>
</section>`;
document.querySelector('#artist').innerHTML = template;
  });
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};

const attachEventListener = () => {
  const tracks = document.querySelectorAll(".track-item.preview");
  for(track of tracks) {
    track.onclick = handleClick;
  }
}

const handleClick = (ev)  => {
  document.querySelector("footer .track-item").innerHTML = ev.currentTarget.innerHTML;
  audioPlayer.setAudioFile(ev.currentTarget.getAttribute('data-preview-track'));
  audioPlayer.play();
}
