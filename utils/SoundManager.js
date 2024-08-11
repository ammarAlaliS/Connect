import Sound from 'react-native-sound';

// Asegúrate de que los archivos de sonido estén en el bundle principal
const messageSentSound = new Sound('sound/receiverMsg.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Failed to load message sent sound', error);
    return;
  }
  console.log('Message sent sound loaded successfully');
});

const messageReceivedSound = new Sound('sound/senderMsg.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Failed to load message received sound', error);
    return;
  }
  console.log('Message received sound loaded successfully');
});

const playMessageSentSound = () => {
  messageSentSound.play((success) => {
    if (!success) {
      console.log('Message sent sound playback failed');
    }
  });
};

const playMessageReceivedSound = () => {
  messageReceivedSound.play((success) => {
    if (!success) {
      console.log('Message received sound playback failed');
    }
  });
};

export { playMessageSentSound, playMessageReceivedSound };
