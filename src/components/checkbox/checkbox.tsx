import React from 'react';
import { TouchableOpacity, Pressable, PressableProps } from 'react-native';
import { Text, View, CheckCircle, RadioButtonUnchecked } from '../';
import { View as Motiview, useAnimationState } from 'moti';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: () => void;
  value?: number;
}

export const Checkbox = ({
  label,
  onChange,
  checked = false,
  value = 0.9,
  ...other
}: CheckboxProps) => {
  const animationState = useAnimationState({
    from: {
      scale: 1,
    },
    bigger: {
      scale: value ? [value + 0.05, value] : [1.15, 1.1],
    },
  });

  const pressedIn = () => {
    animationState.transitionTo('bigger');
  };
  const pressedOut = () => {
    animationState.transitionTo('from');
  };

  return (
    <Pressable
      onPress={onChange}
      {...other}
      onPressIn={pressedIn}
      onPressOut={pressedOut}>
      <Motiview
        state={animationState}
        transition={{
          type: 'timing',
        }}>
        <View flexDirection="row" alignItems="center" paddingVertical="m">
          {checked ? (
            <CheckCircle width={24} height={24} fill="green" />
          ) : (
            <RadioButtonUnchecked width={24} height={24} fill="grey" />
          )}
          <Text variant="subheader" ml="es" paddingHorizontal="es">
            {label}
          </Text>
        </View>
      </Motiview>
    </Pressable>
  );
};
