// Caller.js
import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-undef
var Peer = require("simple-peer");
import io from "socket.io-client";

const Caller = () => {
  const [peer, setPeer] = useState(null);
  const [setStream] = useState(null);
  const videoRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:3001");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        setStream(userStream);

        const newPeer = new Peer({
          initiator: true,
          trickle: false,
          stream: userStream,
        });

        setPeer(newPeer);

        newPeer.on("signal", (data) => {
          socket.current.emit("sendSignalData", data);
        });

        newPeer.on("stream", (remoteStream) => {
          // Merge local and remote streams
          videoRef.current.srcObject = new MediaStream([
            ...userStream.getTracks(),
            ...remoteStream.getTracks(),
          ]);
        });
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const startCall = () => {
    // Call a specific user (modify the ID as needed)
    socket.current.emit("callUser", { userId: "user123" });
  };

  return (
    <div>
      <h2>Caller</h2>
      <video ref={videoRef} autoPlay />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default Caller;
