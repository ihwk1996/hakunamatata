import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import AudioRecorder from 'react-audio-recorder';

export default class Hakuna extends React.Component {
  render() {
    return (
      <Container>

        <h1>Welcome to Hakuna!</h1>
        <p> Click below to record voice </p>
        <Button>Record</Button>
        

      </Container>
    );
  }
}
