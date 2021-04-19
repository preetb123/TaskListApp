/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationContainerRef,
} from '@react-navigation/native';
import { AuthNavigator, HomeNavigator } from './main-navigator';
import { observer } from 'mobx-react-lite';
import { useStores } from '../models';
import { useColorScheme } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const RootStack = observer(() => {
  const store = useStores();
  return store.isLoggedIn ? <HomeNavigator /> : <AuthNavigator />;
});

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      {...props}
      ref={ref}
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
      onReady={() => RNBootSplash.hide()}>
      <RootStack />
    </NavigationContainer>
  );
});

RootNavigator.displayName = 'RootNavigator';
