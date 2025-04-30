import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const Camera = ({ onInvalidDetection }) => {
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [invalidDetectionCount, setInvalidDetectionCount] = useState(0);
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const lastInvalidUpdateRef = useRef(Date.now());

  useEffect(() => {
    cocoSsd.load()
      .then((loadedModel) => {
        setModel(loadedModel);
        console.log('COCO-SSD model loaded');
      })
      .catch((error) => console.error('Error loading model:', error));
  }, []);

  useEffect(() => {
    if (!model || !webcamRef.current) return;
    const interval = setInterval(() => {
      detectObjects();
    }, 500);
    return () => clearInterval(interval);
  }, [model]);

  const detectObjects = async () => {
    if (webcamRef.current && model) {
      const video = webcamRef.current.video;
      if (!video || video.readyState !== 4) return;
      try {
        const predictions = await model.detect(video);
        const persons = predictions.filter(prediction => prediction.class === 'person');
        const currentCount = persons.length;

        if (currentCount !== 1) {
          const now = Date.now();
          if (now - lastInvalidUpdateRef.current >= 1000) {
            setInvalidDetectionCount(prev => {
              const newCount = prev + 1;
              if (onInvalidDetection) {
                onInvalidDetection(newCount);
              }
              return newCount;
            });
            lastInvalidUpdateRef.current = now;
          }
        }
      } catch (error) {
        console.error("Detection error:", error);
      }
    }
  };

  const handleWebcamReady = () => {
    setIsWebcamReady(true);
  };

  return (
    <div className='bg-red-400'>
      <div className="fixed top-4 right-4">
        {isWebcamReady ? (
          <div className="bg-gray-800 text-white px-4 py-2 rounded shadow-md">
            Invalid detections: {invalidDetectionCount}
          </div>
        ) : (
          <p className="bg-gray-800 text-white px-4 py-2 rounded shadow-md">
            Loading webcam...
          </p>
        )}
      </div>

      <div className="fixed top-16 right-4 w-[150px] h-[150px] rounded-md shadow-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: 'user' }}
          onUserMedia={handleWebcamReady}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Camera;
