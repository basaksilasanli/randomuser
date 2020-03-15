import React from 'react';
import { StyleSheet } from 'react-native';
import UserList from "./components/UserList";
import {Router, Scene, Stack } from "react-native-router-flux";
import FriendDetail from "./components/FriendDetail";

export default function App() {
  return (
          <Router>
              <Stack key="root">
                  <Scene key="userList" component={UserList} title="Users" initial />
                  <Scene key="friendDetail" component={FriendDetail} title=" Detail" />
              </Stack>
          </Router>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
