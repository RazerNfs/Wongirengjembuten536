// ---------------------------
// DOM Elements
// ---------------------------
const homePage = document.getElementById('homePage');
const songDetailPage = document.getElementById('songDetailPage');
const playerPage = document.getElementById('playerPage');
const songListElement = document.getElementById('songList');

// 🔍 Elemen pencarian
const searchInput = document.getElementById('searchInput');

const backToHomeFromDetailBtn = document.getElementById('backToHomeFromDetailBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn'); // Tombol kembali dari player ke home
const bodyElement = document.body;

const backgroundVideoContainer = document.querySelector('.video-background-container');
const backgroundVideo = document.getElementById('backgroundVideo');

// Elemen untuk Halaman Detail Lagu
const detailAlbumArt = document.getElementById('detailAlbumArt');
const detailTrackTitle = document.getElementById('detailTrackTitle');
const detailTrackArtist = document.getElementById('detailTrackArtist');
const detailAlbumName = document.getElementById('detailAlbumName');
const playFromDetailBtn = document.getElementById('playFromDetailBtn'); // Tombol play di halaman detail

const audioPlayer = document.getElementById('audioPlayer');
const albumArtPlayer = document.getElementById('albumArt');
const playerTrackTitle = document.getElementById('playerTrackTitle');
const playerTrackArtist = document.getElementById('playerTrackArtist');
const lyricsContainer = document.getElementById('lyricsContainer');

const playerProgressBarContainer = document.getElementById('playerProgressBarContainer');
const playerProgressBar = document.getElementById('playerProgressBar');
const playerCurrentTime = document.getElementById('playerCurrentTime');
const playerTotalDuration = document.getElementById('playerTotalDuration');

const playerPrevBtn = document.getElementById('playerPrevBtn');
const playerPlayPauseBtn = document.getElementById('playerPlayPauseBtn');
const playerNextBtn = document.getElementById('playerNextBtn');
const playerRepeatBtn = document.getElementById('playerRepeatBtn');
const playerShuffleBtn = document.getElementById('playerShuffleBtn');
const playerVolumeSlider = document.getElementById('playerVolumeSlider');
const playerSpeedSlider = document.getElementById('playerSpeedSlider');
const currentSpeedDisplay = document.getElementById('currentSpeedDisplay');

// ---------------------------
// App State + Data (songs)
// ---------------------------
let songs = [
    {
        id: 1,
        title: "Consume",
        artist: "Chase Atlantic",
        album: "Beauty in Death",
        albumArtUrl: "https://tse3.mm.bing.net/th?id=OIP.VwivM--7Xx_SmgsqXBLi8AAAAA&pid=Api&P=0&h=220",
        audioSrc: "audio/consume.mp3",
        videoBgSrc: "videos/consume.mp4",
        lyrics: [
            { time: 0.8, text: "She said, Careful, or you'll lose it" },
            { time: 4, text: "But, girl, I'm only human," },
            { time: 7, text: "And I know there's a blade where your heart is" },
            { time: 10, text: "And you know how to use it" }
        ]
    },
    {
        id: 2,
        title: "Perfect",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        albumArtUrl: "https://tse4.mm.bing.net/th?id=OIP.TjS4z1jJTsl6K3-ADIXFywHaEK&pid=Api&P=0&h=220",
        audioSrc: "audio/Ed Sheeran - Perfect.mp3",
        videoBgSrc: "videos/perfect_bg.mp4",
        lyrics: [
            { time: 2.9 , text: "I found a love for me" },
            { time: 10.6, text: "Oh, darlin, just dive right in and follow my lead" },
            { time: 18, text: "I found a girl, beautiful and sweet" }
        ]
    },
    {
        id: 3,
        title: "Unconditionally",
        artist: "Katy Perry",
        album: "Prism",
        albumArtUrl: "https://i.ytimg.com/vi/4NGVxU0qhZ8/maxresdefault.jpg",
        audioSrc: "audio/Katy Perry - Unconditionally.mp3",
        videoBgSrc: "videos/unconditionally_bg.mp4",
        lyrics: [
            { time: 7.1, text: "Oh no, did I get too close?" },
            { time: 12, text: "Oh, did I almost see what's really on the inside?" },
            { time: 36.5, text: "Unconditional, unconditionally" }
        ]
    },
    // contoh tambahan (lakukan penyesuaian / tambahkan lagu sesuai filemu)
    {
        id: 13,
        title: "Melting",
        artist: "Kali Uchis",
        album: "Por Vida",
        albumArtUrl: "images/melting.jpg",
        audioSrc: "audio/melting.mp3",
        videoBgSrc: "videos/melting.mp4",
        lyrics: [
            { time: 2, text: "You are my church, you are my place of worship" },
            { time: 7, text: "I heard you're the plug, can I be the circuit?" }
        ]
    },
    {
        id: 14,
        title: "Linger",
        artist: "The Cranberries",
        album: "Everybody Else Is Doing It, So Why Can't We?",
        albumArtUrl: "images/linger.jpg",
        audioSrc: "audio/linger.mp3",
        videoBgSrc: "videos/linger.mp4",
        lyrics: [
            { time: 12, text: "If you, if you could return" },
            { time: 17, text: "Don't let it burn, don't let it fade" }
        ]
    },
    {
        id: 15,
        title: "Kasih Aba-Aba",
        artist: "Tenxi",
        album: "Single",
        albumArtUrl: "images/kasih_aba_aba.jpg",
        audioSrc: "audio/kasih_aba_aba.mp3",
        videoBgSrc: "videos/kasih_aba_aba.mp4",
        lyrics: [ // placeholder timestamps — isi teks sendiri sesuai hak cipta jika perlu
            { time: 5, text: "Malas" },
            { time: 10, text: "gwe" }
        ]
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0 none, 1 repeat one, 2 repeat all

// ---------------------------
// Page Navigation
// ---------------------------
function showHomePage() {
    playerPage.classList.remove('active');
    songDetailPage.classList.remove('active');
    homePage.classList.add('active');

    bodyElement.classList.remove('player-active-bg', 'detail-active-bg');
    backgroundVideoContainer.classList.remove('active');
    backgroundVideo.pause();
    backgroundVideo.src = "";
    backgroundVideo.load();
    pauseTrack(); // pause audio when back to home
}

function showSongDetailPage(song) {
    homePage.classList.remove('active');
    playerPage.classList.remove('active');
    songDetailPage.classList.add('active');

    detailAlbumArt.src = song.albumArtUrl || "";
    detailTrackTitle.textContent = song.title || "Judul Lagu";
    detailTrackArtist.textContent = song.artist || "Nama Artis";
    detailAlbumName.textContent = song.album || "Unknown Album";

    bodyElement.classList.remove('player-active-bg');
    bodyElement.classList.add('detail-active-bg');

    backgroundVideoContainer.classList.remove('active');
    backgroundVideo.pause();
    backgroundVideo.src = "";
    backgroundVideo.load();
}

function showPlayerPage() {
    homePage.classList.remove('active');
    songDetailPage.classList.remove('active');
    playerPage.classList.add('active');

    bodyElement.classList.remove('detail-active-bg');
    bodyElement.classList.add('player-active-bg');

    backgroundVideoContainer.classList.add('active');

    const currentSong = songs[currentSongIndex];
    if (currentSong && currentSong.videoBgSrc) {
        backgroundVideo.src = currentSong.videoBgSrc;
        backgroundVideo.load();
        backgroundVideo.play().catch(e => {/* ignore */});
    } else {
        backgroundVideo.src = "";
        backgroundVideo.load();
    }
}

// ---------------------------
// Render song list (supports filter + highlight)
// ---------------------------
function renderSongList(filter = "") {
    songListElement.innerHTML = '';

    if (!songs || songs.length === 0) {
        songListElement.innerHTML = '<li class="loading-songs">Tidak ada lagu tersedia.</li>';
        return;
    }

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(filter.toLowerCase()) ||
        song.artist.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredSongs.length === 0) {
        songListElement.innerHTML = '<li class="loading-songs">Tidak ada lagu ditemukan.</li>';
        return;
    }

    filteredSongs.forEach((song) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', song.id);

        // Jika tidak ada filter, hindari regex error (kosong string)
        let highlightedTitle = song.title;
        let highlightedArtist = song.artist;
        if (filter && filter.trim() !== "") {
            try {
                const regex = new RegExp(`(${escapeRegExp(filter)})`, 'gi');
                highlightedTitle = song.title.replace(regex, '<mark>$1</mark>');
                highlightedArtist = song.artist.replace(regex, '<mark>$1</mark>');
            } catch (err) {
                // jika filter mengandung karakter regex, fallback
                highlightedTitle = song.title;
                highlightedArtist = song.artist;
            }
        }

        listItem.innerHTML = `
            <img src="${song.albumArtUrl || ''}" alt="${song.title}" class="song-art-list">
            <div class="song-info-list">
                <h3>${highlightedTitle}</h3>
                <p>${highlightedArtist}</p>
            </div>
        `;

        listItem.addEventListener('click', () => {
            // set index to the actual index in songs (not filtered array)
            const realIndex = songs.findIndex(s => s.id === song.id);
            if (realIndex >= 0) currentSongIndex = realIndex;
            loadSong(songs[currentSongIndex]);
            playTrack();
            showPlayerPage();
        });

        // optional: hover preview video on desktop
        listItem.addEventListener('mouseenter', () => {
            if (homePage.classList.contains('active') && song.videoBgSrc) {
                backgroundVideo.src = song.videoBgSrc;
                backgroundVideo.load();
                backgroundVideoContainer.classList.add('active');
                backgroundVideo.play().catch(e => {/* ignore */});
                bodyElement.classList.add('player-active-bg');
            }
        });
        listItem.addEventListener('mouseleave', () => {
            if (homePage.classList.contains('active')) {
                backgroundVideoContainer.classList.remove('active');
                backgroundVideo.pause();
                backgroundVideo.src = "";
                backgroundVideo.load();
                bodyElement.classList.remove('player-active-bg');
            }
        });

        songListElement.appendChild(listItem);
    });
}

// helper escape regex special chars
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ---------------------------
// Player logic
// ---------------------------
function loadSong(song) {
    if (!song) return;
    albumArtPlayer.src = song.albumArtUrl || "https://placehold.co/100x100/3a3a4e/e0e0e0?text=Art";
    playerTrackTitle.textContent = song.title || "Unknown";
    playerTrackArtist.textContent = song.artist || "-";

    renderLyrics(song.lyrics || []);
    audioPlayer.src = song.audioSrc || "";
    audioPlayer.onloadedmetadata = () => {
        playerTotalDuration.textContent = formatTime(audioPlayer.duration || 0);
    };
    audioPlayer.load();
    updatePlayPauseIcon();
}

function renderLyrics(lyrics) {
    lyricsContainer.innerHTML = '';
    if (!lyrics || lyrics.length === 0) {
        lyricsContainer.innerHTML = "<p>Lirik tidak tersedia untuk lagu ini.</p>";
        return;
    }

    lyrics.forEach(line => {
        const span = document.createElement('span');
        span.textContent = line.text;
        span.setAttribute('data-time', line.time);
        span.classList.add('lyric-line');
        lyricsContainer.appendChild(span);
    });
}

function playTrack() {
    if (!audioPlayer.src || audioPlayer.src.trim() === "") {
        if (songs.length > 0) loadSong(songs[currentSongIndex]);
        else return;
    }
    audioPlayer.play().catch(e => console.error("play error", e));
    isPlaying = true;
    updatePlayPauseIcon();
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    if (isPlaying) playerPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    else playerPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function prevTrack() {
    if (songs.length === 0) return;
    if (isShuffle) {
        playRandomTrack();
    } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    loadSong(songs[currentSongIndex]);
    playTrack();
    showPlayerPage();
}

function nextTrackLogic() {
    if (songs.length === 0) return;
    if (isShuffle) {
        playRandomTrack();
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(songs[currentSongIndex]);
    playTrack();
    showPlayerPage();
}

function nextTrack() {
    if (songs.length === 0) return;
    if (repeatMode === 1) {
        // handled by audio.loop
    } else if (isShuffle) playRandomTrack();
    else {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            if (repeatMode === 2) currentSongIndex = 0;
            else {
                currentSongIndex = songs.length - 1;
                loadSong(songs[currentSongIndex]);
                pauseTrack();
                audioPlayer.currentTime = audioPlayer.duration || 0;
                return;
            }
        }
        loadSong(songs[currentSongIndex]);
        playTrack();
    }
    showPlayerPage();
}

function playRandomTrack() {
    if (songs.length <= 1) { currentSongIndex = 0; }
    else {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex);
        currentSongIndex = randomIndex;
    }
    loadSong(songs[currentSongIndex]);
    playTrack();
    showPlayerPage();
}

// ---------------------------
// Events: timeupdate, progress click, volume, speed
// ---------------------------
audioPlayer.addEventListener('timeupdate', () => {
    if (!audioPlayer.duration) return;
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    playerProgressBar.style.width = `${progressPercent}%`;
    playerCurrentTime.textContent = formatTime(audioPlayer.currentTime);

    // highlight current lyric
    const currentTime = audioPlayer.currentTime;
    const lyricLines = lyricsContainer.querySelectorAll('.lyric-line');
    let highlightedLine = null;

    lyricLines.forEach((line, index) => {
        const lineTime = parseFloat(line.getAttribute('data-time')) || 0;
        let nextLineTime = Infinity;
        if (index + 1 < lyricLines.length) {
            nextLineTime = parseFloat(lyricLines[index + 1].getAttribute('data-time')) || Infinity;
        }
        if (currentTime >= lineTime && currentTime < nextLineTime) {
            line.classList.add('highlight');
            highlightedLine = line;
        } else {
            line.classList.remove('highlight');
        }
    });

    // auto scroll highlighted lyric into view
    if (highlightedLine) {
        const containerRect = lyricsContainer.getBoundingClientRect();
        const lineRect = highlightedLine.getBoundingClientRect();
        const isOutsideTop = lineRect.top < containerRect.top;
        const isOutsideBottom = lineRect.bottom > containerRect.bottom;
        if (isOutsideTop || isOutsideBottom) {
            highlightedLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
});

playerProgressBarContainer.addEventListener('click', (e) => {
    if (!audioPlayer.duration) return;
    const width = playerProgressBarContainer.clientWidth;
    const clickX = e.offsetX;
    audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
});

playerVolumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = parseFloat(e.target.value);
});

playerSpeedSlider.addEventListener('input', (e) => {
    audioPlayer.playbackRate = parseFloat(e.target.value);
    currentSpeedDisplay.textContent = `${audioPlayer.playbackRate.toFixed(2)}x`;
});

// ---------------------------
// Shuffle & Repeat UI
// ---------------------------
playerShuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    playerShuffleBtn.classList.toggle('active-feature', isShuffle);
});

playerRepeatBtn.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    updateRepeatButtonUI();
});

function updateRepeatButtonUI() {
    playerRepeatBtn.classList.remove('active-feature');
    audioPlayer.loop = false;
    if (repeatMode === 0) {
        playerRepeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    } else if (repeatMode === 1) {
        playerRepeatBtn.innerHTML = '<i class="fas fa-repeat-1"></i>';
        playerRepeatBtn.classList.add('active-feature');
        audioPlayer.loop = true;
    } else if (repeatMode === 2) {
        playerRepeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
        playerRepeatBtn.classList.add('active-feature');
    }
}

// ---------------------------
// Buttons: play/pause, prev, next
// ---------------------------
playerPlayPauseBtn.addEventListener('click', () => {
    if (isPlaying) pauseTrack(); else playTrack();
});
playerPrevBtn.addEventListener('click', prevTrack);
playerNextBtn.addEventListener('click', nextTrackLogic);

audioPlayer.addEventListener('ended', () => {
    if (repeatMode === 1) {
        // handled by loop
    } else {
        nextTrack();
    }
});

// ---------------------------
// Navigation buttons
// ---------------------------
backToHomeFromDetailBtn.addEventListener('click', showHomePage);
backToHomeBtn.addEventListener('click', showHomePage);

playFromDetailBtn.addEventListener('click', () => {
    loadSong(songs[currentSongIndex]);
    playTrack();
    showPlayerPage();
});

// ---------------------------
// Utilities
// ---------------------------
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// ---------------------------
// Search input realtime
// ---------------------------
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderSongList(e.target.value || "");
    });
}

// ---------------------------
// Initialization
// ---------------------------
function init() {
    console.log("Initializing...");
    renderSongList(); // show all songs initially
    if (songs.length > 0) loadSong(songs[currentSongIndex]);
    audioPlayer.volume = playerVolumeSlider ? playerVolumeSlider.value : 0.8;
    audioPlayer.playbackRate = playerSpeedSlider ? playerSpeedSlider.value : 1;
    currentSpeedDisplay.textContent = `${audioPlayer.playbackRate.toFixed(2)}x`;
    updatePlayPauseIcon();
    updateRepeatButtonUI();
    showHomePage();
    console.log("Initialization complete.");
}

init();