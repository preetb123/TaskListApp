import React from 'react';
import { View, Text, CancelIcon, CheckCircle } from '../';
import { Theme } from '../../theme';
import { useTheme } from '@shopify/restyle';

export interface RoundedIconProps {
  name: string;
  size: number;
  color: keyof Theme['colors'];
  backgroundColor?: keyof Theme['colors'];
  iconRatio: number;
  align: 'center' | 'flex-start' | 'flex-end';
}

const getIcon = (name: string, color: string, size) => {
  switch (name) {
    case 'check':
      return <CheckCircle width={size} height={size} fill={color} />;
    case 'x':
      return <CancelIcon width={size} height={size} fill={color} />;
  }
};

export const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio,
  align,
}: RoundedIconProps) => {
  const theme = useTheme();
  const iconSize = size * iconRatio;
  return (
    <View height={size} width={size} justifyContent="center" alignItems={align}>
      {getIcon(name, theme.colors[backgroundColor], size)}
    </View>
  );
};
