document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            window.location.href = "upload.html";
        });
    }

    if (document.getElementById("signupForm")) {
        document.getElementById("signupForm").addEventListener("submit", function(event) {
            event.preventDefault();
            window.location.href = "login.html";
        });
    }
});

function uploadImage() {
    document.getElementById("responseText").innerText = "Analyzing image...";

    setTimeout(() => {
        document.getElementById("responseText").innerText = "Disease Detected: Early Blight. Treatment: Fungicide Application.";
    }, 2000);
}

function nextPage() {
    window.location.href = "video.html";
}

function startCall() {
    alert("Starting video consultation...");
}

function startVideo() {
    const video = document.getElementById("localVideo");

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing camera: ", error);
            alert("Could not access camera. Please allow camera permissions.");
        });
}

function startVideo() {
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
            localVideo.srcObject = stream;

            // Simulating remote video (for actual use, implement WebRTC)
            const remoteStream = new MediaStream(stream.getTracks());
            remoteVideo.srcObject = remoteStream;
        })
        .catch((error) => {
            console.error("Error accessing camera: ", error);
            alert("Could not access camera. Please allow camera permissions.");
        });
}


