import React from 'react';
import { View } from '../view';
import { ErrorHandler } from '../error-handler';
import { BoxProps } from '@shopify/restyle';
import { Theme } from '../../theme';
import { TextProps } from 'react-native';

type Props = {
  children: React.ReactNode;
} & BoxProps<Theme> &
  TextProps;

export const Screen = ({ children, ...rest }: Props) => (
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
);
