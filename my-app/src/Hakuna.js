import { ReactMic } from '@cleandersonlobo/react-mic';
import React from 'react';
import { Loader, Icon, Segment, Image, Progress,Button, Container } from 'semantic-ui-react';
import download from 'downloadjs';
import logo from './logo.png';

export default class Hakuna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      url: '',
      polarity: null,
      para: null,
      loading: false,
    }
  }

  startRecording() {
    this.setState({
      record: true
    });
  }

  stopRecording() {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob, x) {
    console.log(window.self);
    window.self.setState({
      loading: true
    })
    // const self = this;
    // this.setState({
    //   polarity: data.polarity,
    //   para: data.para
    // })
    // this.setState({
    //   lol: 'ss'
    // })
    console.log('recordedBlob is: ', recordedBlob);
    // console.log(record)
    console.log(recordedBlob['blobURL'])
    download(recordedBlob['blob'],'hackhlth');
    fetch('http://127.0.0.1:5000/audio', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: recordedBlob['blobURL'],
      })
    }).then((response) => {
      return response.json();
    }).then(data => {
      console.log(data);
      window.self.setState({
        polarity: data.polarity,
        para: data.para,
        loading: false,
      })
    });
  }


  renderResult() {
    if (this.state.loading === false) {
      if (this.state.polarity !== null) {
        let p = ((this.state.polarity + 1) / 2) * 100;
        var feels = '';
        var color = 'grey'
        if (p < 20) {
          color = 'red'
          feels = 'Patient is in critical mental state. Urgent attention required.'
        } else if (p >= 20 && p < 40) {
          color = 'yellow'
          feels = 'Patient is not feeling too well. Analyse logs for further details.'
        } else if (p >= 40 && p < 60) {
          color = 'grey'
          feels = 'Patient is feeling neutral.'
        } else if (p >= 60 && p < 80) {
          color = 'olive'
          feels = 'Patient is feeling relatively good.'
        } else {
          color = 'green'
          feels = 'Patient is in a positive state.'
        }
        console.log(p);
        return (
          <Segment style={{ width: '640px'}}>
            <h4> Result </h4>
            <Progress style={{ justifyContent:'center', margin: 20, marginLeft: 0, width: '640px'}} color={color} percent={p} />
            <div style={{ position: 'relative', margin: 20, marginLeft: 0 }}>
              <Icon color='red' size='large' name='frown' />
              <Icon style={{ marginLeft: 251, right: 0 }} color='grey' size='large' name='meh' />
              <Icon style={{ marginLeft: 251, right: 0 }} color='green' size='large' name='smile' />
            </div>
            <div style={{ margin: 20, fontSize: 20 }}>
              <p><b>Summary:</b> {feels}</p>
              <p><b>Paragraph:</b> {this.state.para}</p>
            </div>
          </Segment>
        );
      }
      
    } else {
      return (<Loader style={{ margin: 30}} active inline />);
    }

  }

  renderExample() {
    return (
      <div>
        <Segment style={{ marginLeft: 30, marginTop: 50, marginBottom: 50, width: '640px'}}>
          <Progress style={{ justifyContent:'center', margin: 20, marginLeft: 0, width: '640px'}} color='red' percent={12} />
          <div style={{ position: 'relative', margin: 20, marginLeft: 0 }}>
            <Icon color='red' size='large' name='frown' />
            <Icon style={{ marginLeft: 251, right: 0 }} color='grey' size='large' name='meh' />
            <Icon style={{ marginLeft: 251, right: 0 }} color='green' size='large' name='smile' />


          </div>
          <div style={{ margin: 20, fontSize: 20 }}>
            <p><b>Summary:</b> Patient is not feeling too well. Analyse logs for further details.</p>
            <p><b>Paragraph:</b> My dog just died today, I am feeling really bad.</p>
          </div>
        </Segment>
      </div>

    );
  }

  render() {
    window.self = this;
    return (
      <Container>
        <Image style={{ marginTop: 30 }}src={logo} size='large' />
        <h2 style={{ margin: 30 }}>Sentiment analysis of patient's voiceover</h2>
        <div style={{ margin: 30 }}>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#aec6cf" />
        </div>
        <div style={{ margin: 30 }}>
        <Button loading={this.state.record} onClick={() => this.setState({ record: true })}>Start</Button>
        <Button disabled={!this.state.record} onClick={() => this.setState({ record: false })}>Stop</Button>
        </div>

        <div style={{ margin: 30 }}>
          {this.renderResult()}
        </div>


        {/*this.renderExample()*/}



      </Container>
    );
  }
}

// <button onTouchTap={this.startRecording} type="button">Start</button>
// <button onTouchTap={this.stopRecording} type="button">Stop</button>
