import { observer } from 'mobx-react-lite';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View as Motiview } from 'moti';
import {
  Text,
  Input,
  Button,
  Screen,
  Toast,
  TaskListIcon,
  View,
} from '../../components';
import { useStores } from '../../models';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from 'react-query';

const PASSWORD_FORMAT = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const validationSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z
    .string()
    .regex(PASSWORD_FORMAT, {
      message: 'Password must be alphanumeric',
    })
    .min(5, { message: 'Must be atleast 5 characters long' }),
});

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = observer(() => {
  const store = useStores();

  const { isLoading, error, mutate } = useMutation(data =>
    store.signIn(data.email, data.password),
  );

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: FormData) => {
    Keyboard.dismiss();
    mutate(data, {
      onError: error => {
        console.log('signin error');
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error signing in',
          text2: String(error),
          visibilityTime: 5000,
          autoHide: false,
        });
      },
      onSettled: () => {
        console.log('signin onSettled');
      },
    });
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.scrollContainer}>
      <Screen testID="loginScreen">
        <Motiview
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 1000 }}>
          <View alignSelf="center" alignItems="center">
            <TaskListIcon width={124} height={124} />
            <Text variant="subheader">TaskList</Text>
          </View>
        </Motiview>
        <Text variant="header" marginBottom="m">
          Login
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              testID="email"
              name="email"
              label="Email"
              placeholder="Email"
              onBlur={onBlur}
              keyboardType="email-address"
              inputType="email"
              value={value}
              touched={touchedFields.email}
              onChangeText={text => onChange(text)}
              error={errors.email ? errors.email.message : null}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              testID="password"
              name="password"
              label="Password"
              placeholder="Password"
              onBlur={onBlur}
              value={value}
              onChangeText={text => onChange(text)}
              inputType="password"
              touched={touchedFields.password}
              error={errors.password ? errors.password.message : null}
            />
          )}
          name="password"
        />
        <Button
          testID="loginButton"
          marginTop="xl"
          marginHorizontal="xl"
          label="Sign-in"
          loadingLabel="Signing in"
          disabled={isLoading}
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </Screen>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
