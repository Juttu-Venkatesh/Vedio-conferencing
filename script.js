const videoGrid = document.getElementById('video-grid');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const muteButton = document.getElementById('muteButton');
const unmuteButton = document.getElementById('unmuteButton');
const joinButton = document.getElementById('joinButton');
const roomNameInput = document.getElementById('roomName');

let localStream;

startButton.addEventListener('click', async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const localVideo = document.createElement('video');
        localVideo.srcObject = localStream;
        localVideo.muted = true;
        localVideo.play();
        videoGrid.appendChild(localVideo);
    } catch (error) {
        console.error('Error accessing user media:', error);
    }
});

stopButton.addEventListener('click', () => {
    localStream.getTracks().forEach((track) => {
        track.stop();
    });
    videoGrid.innerHTML = '';
});

muteButton.addEventListener('click', () => {
    localStream.getAudioTracks().forEach((track) => {
        track.enabled = false;
    });
});

unmuteButton.addEventListener('click', () => {
    localStream.getAudioTracks().forEach((track) => {
        track.enabled = true;
    });
});

joinButton.addEventListener('click', async () => {
    const roomName = roomNameInput.value;
    if (roomName.trim() !== '') {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const localVideo = document.createElement('video');
            localVideo.srcObject = localStream;
            localVideo.muted = true;
            localVideo.play();
            videoGrid.appendChild(localVideo);
            // Here, you would connect to the WebSocket server and send the roomName for room-based communication.
        } catch (error) {
            console.error('Error accessing user media:', error);
        }
    } else {
        alert('Please enter a valid room code or name.');
    }
});
