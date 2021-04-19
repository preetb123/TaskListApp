import * as React from 'react';

import { Text } from '../text';
import { View } from '../view';
import { Button } from '../button';
import { Screen } from '../screen';

export function ErrorFallback({ resetErrorBoundary }: any) {
  return (
    <Screen>
      <View>
        <Text> Something went wrong: </Text>
        <Button label="try Again" onPress={resetErrorBoundary} />
      </View>
    </Screen>
  );
}
