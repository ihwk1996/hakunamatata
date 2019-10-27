import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Container } from 'semantic-ui-react';
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const options = {
  autoStart: false,
  continuous: false
}

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  startListening,
  stopListening,
  abortListening,
  finalTranscript
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      <Button onClick={resetTranscript}>Reset</Button>
      <Button onClick={startListening}>Start</Button>
      <Button onClick={abortListening}>Stop</Button>
      <span>{finalTranscript}</span>
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);
