import React from 'react';
import { View } from '../view';
import { ErrorHandler } from '../error-handler';
import { BoxProps, SpacingProps } from '@shopify/restyle';
import { Theme } from '../../theme';
import { Platform, TextProps, SafeAreaView } from 'react-native';

type Props = {
  children: React.ReactNode;
} & SpacingProps<Theme> &
  BoxProps<Theme> &
  TextProps;

export const Screen = ({ children, ...rest }: Props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <ErrorHandler>
      <View
        justifyContent="center"
        flexDirection="column"
        paddingHorizontal="m"
        flex={1}
        bg="primaryBackground"
        {...rest}>
        {children}
      </View>
    </ErrorHandler>
  </SafeAreaView>
);
