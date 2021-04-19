import React from 'react';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from '../src/theme';

import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);
addDecorator(story => <ThemeProvider>{story()}</ThemeProvider>);

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUI = getStorybookUI({
  onDeviceUI: true,
  asyncStorage:
    require('@react-native-community/async-storage').default || null,
});

export function StorybookUIRoot() {
  return <StorybookUI />;
}
