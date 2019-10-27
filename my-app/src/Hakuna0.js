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
// 
// else {
//   return (
//     <Segment style={{ width: '640px'}}>
//
//       <h4> Result </h4>
//       <Progress style={{ justifyContent:'center', margin: 20, marginLeft: 0, width: '640px'}} color='grey' percent={1} />
//       <div style={{ position: 'relative', margin: 20, marginLeft: 0 }}>
//         <Icon color='red' size='large' name='frown' />
//         <Icon style={{ marginLeft: 251, right: 0 }} color='grey' size='large' name='meh' />
//         <Icon style={{ marginLeft: 251, right: 0 }} color='green' size='large' name='smile' />
//       </div>
//     </Segment>
//   );
// }
