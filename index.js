let videosPlayState = false
const mainPlayButton = document.querySelector("#mainPlay");
const syncButton = document.querySelector("#syncButton");
let syncTimeInput = document.querySelector("#syncTime");
const videos = document.querySelectorAll(".video");
const playButtons = document.querySelectorAll(".toggleButton");
const progressBars = document.querySelectorAll(".progress");
const volume_sliders = document.querySelectorAll(".volume_slider");

const file1 = document.querySelector("#file1");
const file2 = document.querySelector("#file2");
const file3 = document.querySelector("#file3");

[file1, file2, file3].forEach((file, index) => {
  file.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const video = videos[index];
    const url = URL.createObjectURL(file);
  
    video.children[0].src = url;
    video.load();
  });
});

for (let volume_slider of volume_sliders) {
  volume_slider.addEventListener("change", () => {
    volume_slider.closest(".video-player").children[0].volume = volume_slider.value;
  });
};

for (let progressBar of progressBars) {
  progressBar.addEventListener("click", (e) => {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * progressBar.closest(".video-player").children[0].duration;
    progressBar.closest(".video-player").children[0].currentTime = scrubTime;
  });
}

for (let video of videos) {
  video.addEventListener("timeupdate", () => {
    const progressPercentage = (video.currentTime / video.duration) * 100;
    video.closest(".video-player").children[1].children[0].children[0].style.flexBasis = `${progressPercentage}%`;
  });
};

syncButton.addEventListener("click", () => {
  for (let video of videos) {
    let [hours, minutes, seconds] = syncTimeInput.value.split(":");

    video.currentTime = (+hours * 60 * 60) + (+minutes * 60) + (+seconds);
  };
});


async function toggelPlay(video) {
  videosPlayState ? video.play() : video.pause();
}

async function changePlayIcons() {
  for (let playButton of playButtons) {
    playButton.innerHTML = videosPlayState ? "❚❚" : "►";
  };
  mainPlayButton.innerHTML = videosPlayState ? "❚❚" : "►";
}

function toggleAllPlay() {
  videosPlayState = !videosPlayState;

  for (let video of videos) {
    toggelPlay(video);
    changePlayIcons();
  };
}

for (let playButton of playButtons) {
  playButton.addEventListener("click", toggleAllPlay);
  mainPlayButton.addEventListener("click", toggleAllPlay);
}

