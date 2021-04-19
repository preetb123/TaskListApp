import * as React from 'react';
import { TextInput, TextStyle, TextInputProps, StyleSheet } from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
  useTheme,
} from '@shopify/restyle';

import debounce from 'lodash.debounce';

import { Theme } from '../../theme';
import { RoundedIcon } from './rounded-icon';

import {
  Text,
  View,
  TextAreaIcon,
  SearchIcon,
  CancelIcon,
  Button,
  ErrorIcon,
  EmailIcon,
  LockIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from '../';

type Props = {
  name: string;
  disabled?: boolean;
  label?: string;
  labelStyle?: TextStyle;
  error?: string | null;
  debounced?: boolean;
  inputType?: string;
  touched?: boolean;
} & TextInputProps &
  SpacingProps<Theme> &
  VariantProps<Theme, 'inputVariants'>;

function useDebounce(callback, delay) {
  const debouncedFn = React.useCallback(
    debounce((...args) => callback(...args), delay),
    [delay], // will recreate if delay changes
  );
  return debouncedFn;
}

const getIcon = (inputType, color) => {
  switch (inputType) {
    case 'email':
      return <EmailIcon width={16} height={16} fill={color} />;
    case 'password':
      return <LockIcon width={16} height={16} fill={color} />;
  }
};

export const Input = React.forwardRef<TextInput, Props>(
  (
    {
      label,
      error,
      disabled,
      name,
      debounced,
      inputType,
      touched,
      ...inputProps
    }: Props,
    ref,
  ): React.ReactElement => {
    const [value, setValue] = React.useState('');
    const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);
    const theme = useTheme();
    const props = useRestyle([spacing, border, backgroundColor], inputProps);
    const debouncedSave = useDebounce(nextValue => {
      props.onChangeText(nextValue);
    }, 500);

    const isMultiline = props.variant === 'textArea';
    const isSearchBox = props.variant === 'searchbox';

    const validationColor = error ? 'error' : 'buttonBackgroundPrimary';
    const color = !touched ? 'body' : validationColor;
    const colorCode = theme.colors[color];

    return (
      <View marginBottom="s" key={`input-${name}`}>
        {label && <Text variant="label">{label}</Text>}
        <View
          borderColor={color}
          borderRadius={4}
          flexDirection="row"
          alignItems="center"
          paddingRight="s"
          borderWidth={StyleSheet.hairlineWidth}
          style={styles.inputContainer}>
          {isSearchBox && (
            <SearchIcon
              style={styles.searchIcon}
              width={24}
              height={24}
              fill="grey"
            />
          )}
          <View padding="s">{getIcon(inputType, colorCode)}</View>
          <TextInput
            value={value}
            style={styles.input}
            autoCapitalize="none"
            ref={ref}
            multiline={isMultiline}
            editable={!disabled}
            onChange={e => {
              setValue(e.nativeEvent.text);
            }}
            {...inputProps}
            secureTextEntry={inputType === 'password' && isPasswordHidden}
            onChangeText={text => {
              if (debounced) {
                debouncedSave(text);
              } else {
                props.onChangeText(text);
              }
            }}
          />
          {inputType === 'password' && (
            <Button
              variant="imageButton"
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              padding="s"
              icon={
                isPasswordHidden ? (
                  <VisibilityIcon
                    width="24"
                    height="24"
                    fill="rgba(12, 13, 52, 0.7)"
                  />
                ) : (
                  <VisibilityOffIcon
                    width="24"
                    height="24"
                    fill="rgba(12, 13, 52, 0.7)"
                  />
                )
              }
            />
          )}
          {touched && (
            <RoundedIcon
              name={!error ? 'check' : 'x'}
              size={20}
              backgroundColor={!error ? 'buttonBackgroundPrimary' : 'error'}
              color="primaryBackground"
            />
          )}
          {isSearchBox && value.length > 0 ? (
            <Button
              onPress={() => {
                setValue('');
                props.onChangeText('');
              }}
              style={styles.cancelIconContainer}
              variant="imageButton"
              icon={<CancelIcon width={24} height={24} fill="grey" />}
            />
          ) : null}
          {isMultiline && (
            <View style={styles.textAreaIconContainer}>
              <TextAreaIcon width={16} height={16} fill="grey" />
            </View>
          )}
        </View>
        {error && (
          <View flexDirection="row" alignItems="center">
            <ErrorIcon width={16} height={16} fill={colorCode} />
            <Text ml="es" color="error">
              {error}
            </Text>
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {},
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  textAreaIconContainer: {
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
  searchIcon: {
    marginLeft: 8,
  },
  cancelIconContainer: {
    position: 'absolute',
    right: 0,
    paddingRight: 8,
  },
});
