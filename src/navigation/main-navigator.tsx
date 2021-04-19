/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from 'react';
import {
  createStackNavigator,
  HeaderBackButton,
  TransitionSpecs,
} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { LoginScreen, TaskListScreen, CreateTaskScreen } from '../screens';
import { observer } from 'mobx-react-lite';
import { useStores } from '../models';
import { Text, View, AddTaskIcon, Toast, LogoutIcon } from '../components';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useMutation } from 'react-query';
import { MaterialIndicator } from 'react-native-indicators';
import { useTheme } from '@shopify/restyle';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type AuthStackParamList = {
  login: undefined;
};

export type CreateTaskStackParamList = {
  drawer: undefined;
  createTask: undefined;
};

const Drawer = createDrawerNavigator();

const AuthStack = createStackNavigator<AuthStackParamList>();
const CreateTaskStack = createStackNavigator<CreateTaskStackParamList>();

const DrawerContent = observer(props => {
  const store = useStores();
  const theme = useTheme();
  const mutation = useMutation(() => store.signOut());
  return (
    <DrawerContentScrollView {...props}>
      <View
        backgroundColor="buttonBackgroundPrimary"
        height={100}
        justifyContent="center"
        alignItems="center">
        <Text variant="body">{store.user?.email}</Text>
      </View>
      <DrawerItem
        testID="signoutButton"
        label="Log Out"
        labelStyle={{ fontSize: 18, color: theme.colors['textPrimary'] }}
        icon={() => {
          return mutation.isLoading ? (
            <MaterialIndicator size={24} color={theme.colors['textPrimary']} />
          ) : (
            <LogoutIcon
              width={24}
              height={24}
              fill={theme.colors['textPrimary']}
            />
          );
        }}
        onPress={() => {
          mutation.mutate('', {
            onSuccess: () => {},
            onError: error => {
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error logging out',
                text2: String(error),
                visibilityTime: 5000,
                autoHide: true,
                onPress: () => {
                  store.forceLogout();
                },
              });
            },
            onSettled: () => {
              console.log('settled');
            },
          });
        }}
      />
    </DrawerContentScrollView>
  );
});

export const HomeNavigator = observer(() => {
  return (
    <CreateTaskStack.Navigator
      initialRouteName="drawer"
      screenOptions={{
        headerShown: false,
      }}>
      <CreateTaskStack.Screen name="drawer" component={DrawerNavigator} />
      <CreateTaskStack.Screen name="createTask" component={CreateTaskScreen} />
    </CreateTaskStack.Navigator>
  );
});

export const DrawerNavigator = observer(() => {
  const navigation = useNavigation();
  const theme = useTheme();
  const goToCreateTask = () => navigation.navigate('createTask');

  return (
    <Drawer.Navigator
      initialRouteName="tasks"
      openByDefault={false}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors['primaryBackground'],
        },
        headerTintColor: theme.colors['textPrimary'],
        headerTitle: () => {
          return (
            <View
              flexDirection="row"
              paddingVertical="xl"
              justifyContent="space-between"
              alignItems="center">
              <Text variant="header" color="textPrimary">
                Tasks
              </Text>
              <TouchableOpacity
                testID="addTaskButton"
                onPress={goToCreateTask}
                style={styles.addTaskButton}>
                <AddTaskIcon
                  width={24}
                  height={24}
                  fill={theme.colors['textPrimary']}
                />
                <Text
                  variant="body"
                  color="textPrimary"
                  marginHorizontal="es"
                  mt="es">
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          );
        },
        headerTitleAlign: 'left',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="tasks" component={TaskListScreen} />
    </Drawer.Navigator>
  );
});

const styles = StyleSheet.create({
  addTaskButton: {
    height: 48,
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
});

export function AuthNavigator(props) {
  return (
    <AuthStack.Navigator
      initialRouteName={props.initialRouteName}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['home', 'login'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
