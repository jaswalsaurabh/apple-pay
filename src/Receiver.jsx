// Receiver.js
import { useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";

const Receiver = () => {
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:3001");

    const newPeer = new Peer({ trickle: false });

    setPeer(newPeer);

    newPeer.on("signal", (data) => {
      socket.current.emit("sendSignalData", data);
    });

    newPeer.on("stream", (remoteStream) => {
      videoRef.current.srcObject = new MediaStream([
        ...stream.getTracks(),
        ...remoteStream.getTracks(),
      ]);
    });

    // Handle call initiation
    socket.current.on("callUser", ({ userId }) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((userStream) => {
          setStream(userStream);
          newPeer.addStream(userStream);

          newPeer.signal({ userId }); // Respond to the call
        })
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );
    });

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h2>Receiver</h2>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default Receiver;
