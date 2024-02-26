const playButton = document.getElementById('playButton');
const topDiff = document.getElementById('topDiff');
const audio = document.getElementById('myAudio');

playButton.addEventListener('click', () => {
    playButton.style.opacity = '0';
    playButton.style.transition = 'opacity 1s';
    audio.play();
    fadeAudio(audio, 1000, 0, 1);

    setTimeout(() => {
        playButton.style.display = 'none';
        topDiff.style.display = 'block';
        topDiff.style.opacity = '0';
        topDiff.style.transition = 'opacity 1s';

        setTimeout(() => {
            topDiff.style.opacity = '1';
        }, 100);
    }, 1000);
});

function fadeAudio(audio, duration, startVolume, endVolume) {
    const deltaVolume = (endVolume - startVolume) / duration;
    let currentVolume = startVolume;

    const fadeInterval = setInterval(() => {
        currentVolume += deltaVolume;
        audio.volume = currentVolume;

        if (currentVolume <= 0 || currentVolume >= 1) {
            clearInterval(fadeInterval);
        }
    }, 1);
}
