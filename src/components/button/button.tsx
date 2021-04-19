import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
  useTheme,
} from '@shopify/restyle';

import { MaterialIndicator } from 'react-native-indicators';

import { Text } from '../text';
import { View } from '../view';
import { Theme } from '../../theme';

const buttonVariant = createVariant({ themeKey: 'buttonVariants' });
const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof View>,
  Theme
>([buttonVariant], View);

const restyleFunctions = [
  buttonVariant as any,
  spacing,
  border,
  backgroundColor,
];

type Props = SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    label?: string;
    outline?: boolean;
    loading?: boolean;
    loadingLabel?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
  } & TouchableOpacityProps;

export const Button = ({
  onPress,
  label,
  loading = false,
  loadingLabel,
  icon,
  children,
  variant = 'primary',
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, { ...rest, variant });
  const theme = useTheme<Theme>();

  const textVariant = 'button_' + variant;

  if (variant === 'imageButton') {
    return (
      <TouchableOpacity
        {...props}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 48,
          width: 48,
        }}
        onPress={onPress}>
        {icon}
      </TouchableOpacity>
    );
  }

  if (variant === 'containerButton') {
    return (
      <TouchableOpacity onPress={onPress}>
        <ButtonContainer {...props} flex={1}>
          {children}
        </ButtonContainer>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity disabled={rest.disabled} onPress={onPress}>
      <ButtonContainer
        borderRadius={24}
        flexDirection="row"
        opacity={rest.disabled ? 0.7 : 1}
        paddingVertical="m"
        paddingHorizontal="xl"
        justifyContent="center"
        alignItems="center"
        {...props}>
        {loading ? (
          <View flexDirection="row" alignItems="center">
            <View marginRight="m">
              <MaterialIndicator
                size={24}
                color={theme.colors.buttonTextPrimary}
              />
            </View>
            <Text variant={textVariant as Partial<keyof Theme['textVariants']>}>
              {loadingLabel}
            </Text>
          </View>
        ) : (
          <Text variant={textVariant as Partial<keyof Theme['textVariants']>}>
            {label}
          </Text>
        )}
      </ButtonContainer>
    </TouchableOpacity>
  );
};
