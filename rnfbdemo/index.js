/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import {firebase} from '@react-native-firebase/database';

setBackgroundMessageHandler(getMessaging(), async message => {
  setImmediate(() => {
    console.log(
      'This is running from setBackgroundMessageHandler::setImmediate',
    );
  });

  console.log(
    'setBackgroundMessageHandler JS executing. Received message: ' +
      JSON.stringify(message),
  );

  // // Display a notification
  // await notifee.displayNotification({
  //   title: 'Notification Title',
  //   body: 'Main body content of the notification',
  //   android: {
  //     channelId: 'misc',
  //     // pressAction is needed if you want the notification to open the app when pressed
  //     pressAction: {
  //       id: 'default',
  //     },
  //   },
  // });
});

// notifee.onBackgroundEvent(async event => {
//   setImmediate(() => {
//     console.log('This is running from notifee.onBacgroundEvent::setImmediate');
//   });

//   console.log('notifee.onBackgroundEvent with event: ' + JSON.stringify(event));
// });

const testFn = async () => {
  const testingData = {
    boolean: true,
    number: 12345,
    string: 'safsdf',
  };

  try {
    await firebase.database().ref('testing-null-removal').set(testingData);
    console.log('data set');

    const updates = {};

    updates['testing-null-removal/boolean'] = null;
    updates['testing-null-removal/number'] = null;
    updates['testing-null-removal/string'] = null;

    await firebase.database().ref().update(updates);

    console.log('data updated', updates);

    const dataLeft = await firebase
      .database()
      .ref('testing-null-removal')
      .once('value');

    console.log(dataLeft.val());
  } catch (error) {
    console.log(error);
  }
};

testFn();

AppRegistry.registerComponent(appName, () => App);
