
const music = document.querySelector("audio");
const play = document.getElementById('play');
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const next = document.getElementById('next');
const previous = document.getElementById('prev');

let current_time = document.getElementById("current_time");
let total_duration = document.getElementById("duration");

const progress_div = document.getElementById('progress_div');
const progress = document.getElementById("progress");

let songs = [
    {
    name : "1",
    title : "lotus lane",
    artist : "loylist",
    photo : "11"
   },
   {
    name : "2",
    title : "Ral lala",
    artist : "dashrath",
    photo : "22"
   },
   {
    name : "3",
    title : "arjun valy",
    artist : "ranbir",
    photo : "33"
   },
]


let isPlaying = false;

const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause')
    img.classList.add('anime')
}

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play')
    img.classList.remove('anime')
}

play.addEventListener('click', () => {
    // if(isPlaying){
    //     pauseMusic();
    // }
    // else{
    //     playMusic();
    // }

    isPlaying ? pauseMusic() : playMusic();
})

const loadSongs = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "song/" + songs.name + ".mp3";
    img.src = "image/" + songs.photo + ".jpg";
}

// loadSongs(songs[1]);
songIndex = 0;  
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
}

// progress js work 
music.addEventListener('timeupdate', (event) => {
    // console.log(event);
    const {currentTime, duration} = event.srcElement;
   
    let progress_time = (currentTime / duration ) * 100;
    progress.style.width = `${progress_time}%`;

    // music updation duration 
    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60)
    
    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){
        total_duration.textContent = `${tot_duration}`;
    }

     // music updation duration 
     let min_currentTime = Math.floor(currentTime / 60);
     let sec_currentTime = Math.floor(currentTime % 60)

     if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`;
     }
     
     let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
     if(duration){
        current_time.textContent = `${tot_currentTime}`;
     }

})

// progress bar song stop functionality

progress_div.addEventListener('click', (event) => {
    console.log(event);
    const { duration } = music;

    let move_progress = 
    (event.offsetX / event.srcElement.clientWidth) * duration;
    // console.log(duration);
    // console.log(move_progress);

    music.currentTime = move_progress;
})


// if music ended then next song will call
music.addEventListener('ended', nextSong)


next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);