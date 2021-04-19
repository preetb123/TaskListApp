import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, CheckCircle, RadioButtonUnchecked } from '../';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({
  label,
  onChange,
  checked = false,
}: CheckboxProps) => {
  return (
    <TouchableOpacity onPress={onChange}>
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
    </TouchableOpacity>
  );
};
