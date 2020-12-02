/**
 * Collaborate Teams
 * @author Gavin Brown
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import {
  NavigationActions,
} from "react-navigation";

import Routes from './components/routes/index';

/**
 * Firebase config setup
 */
const config = {
  apiKey: '<API Key>',
  authDomain: '<Auth project domain>',
  projectId: '<Project ID>',
  messageSenderId: '<Sender ID>',
}
/** 
 * Initialise app with Firebase
*/
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.createNotificationListeners = this.createNotificationListeners.bind(this);
      this.onPressNotification = this.onPressNotification.bind(this);
  }

  async componentDidMount() {
      this.checkPermission();
      this.createNotificationListeners();
  }

  /** 
   * Check device Push Notifications enabled
   * If enabled request FCM token
   * else request user to enable Push Notification services
  */
  async checkPermission() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
          this.getToken();
      } else {
          this.requestPermission();
      }
  }

  /** 
   * Get FCM token from Firebase
  */
  async getToken() {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
          fcmToken = await firebase.messaging().getToken();
          if (fcmToken) {
              // user has a device token
              await AsyncStorage.setItem('fcmToken', fcmToken);
          }
      }
  }

  /** 
   * Request user to enable Push Notification services
  */
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }  


  /** 
   * Listen for incoming notifications via Firebase
  */
  async createNotificationListeners() {
      const notificationOpen: NotificationOpen = await firebase
      .notifications()
      .getInitialNotification();
      if (notificationOpen) {
          const data = notificationOpen.notification.data;
          this.setState({
              notificationValue: data,
          });
          console.log('Notification Data', this.state.notificationValue);
          this.onPressNotification();
      }
      const channel = new firebase.notifications.Android.Channel(
          "test-channel",
          "Test Channel",
          firebase.notifications.Android.Importance.Max
      ).setDescription("Task Manager test channel");
      // Create the channel
      firebase.notifications().android.createChannel(channel);
      this.notificationDisplayedListener = firebase
      .notifications()

      this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
          // Process notification as required
          if (Platform.OS === 'ios') {
              notification.setNotificationId(new Date().valueOf().toString())
              .setTitle(notification.data.title)
              .setBody(notification.data.body)
              .setSound("default")
              notification.ios.badge = 1
          } else {
              notification.android
              .setChannelId("test-channel")
              .android.setSmallIcon("ic_launcher");
          }
          firebase.notifications().displayNotification(notification);
      });
      this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
          const data = notificationOpen.notification.data;
          this.setState({
              notificationValue: data,
          });
          console.log('Notification Data', this.state.notificationValue);
          this.onPressNotification();
          firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      });
  }

  componentWillUnmount() {
      this.notificationListener();
      this.notificationOpenedListener();
      this.notificationDisplayedListener();
  }

  /** 
   * Navigate user to required push notification task
  */
  onPressNotification() {
    this.navigator.dispatch(NavigationActions.navigate({ routeName: 'Dashboard', params: { notification: this.state.notificationValue} }));
  }

  render() {
      return (
        <Routes ref={nav => { this.navigator = nav; }} />
      );
  }
}
