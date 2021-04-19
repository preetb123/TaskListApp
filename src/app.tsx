/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useRef } from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { NavigationContainerRef } from '@react-navigation/native';
import * as storage from './utils/storage';
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from './navigation';
import { RootStore, RootStoreProvider, setupRootStore } from './models';
import { ThemeProvider } from './theme';
import { ToggleStorybook } from '../storybook/toggle-storybook';
import { APIProvider } from '../src/services/api/api-provider';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
import { Toast } from './components';

const App = () => {
  const navigationRef = useRef<NavigationContainerRef>();
  const [rootStore, setRootStore] = React.useState<RootStore | undefined>(
    undefined,
  );

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  React.useEffect(() => {
    (async () => {
      //await initFonts() // expo
      setupRootStore().then(setRootStore);
    })();
  }, []);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null;

  return (
    <APIProvider>
      <ThemeProvider>
        <ToggleStorybook>
          <RootStoreProvider value={rootStore}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <RootNavigator
                ref={navigationRef}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
              <Toast ref={(ref: any) => Toast.setRef(ref)} />
            </SafeAreaProvider>
          </RootStoreProvider>
        </ToggleStorybook>
      </ThemeProvider>
    </APIProvider>
  );
};

export default App;
