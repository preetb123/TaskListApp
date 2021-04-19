import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { observer } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import React from 'react';
import {
  Button,
  Input,
  Screen,
  Text,
  BackArrowIcon,
  View,
  Toast,
} from '../../components';
import { useStores } from '../../models';

export const CreateTaskScreen = observer(() => {
  const store = useStores();
  const theme = useTheme();
  const navigation = useNavigation();
  const [text, setText] = React.useState('');

  const mutation = useMutation(data => store.taskList.createTask(data));

  const goBack = () => navigation.goBack();
  const createTask = () => {
    mutation.mutate(text, {
      onSuccess: () => {
        goBack();
      },
      onError: error => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error creating task',
          text2: String(error),
          visibilityTime: 5000,
          autoHide: true,
        });
      },
      onSettled: () => {},
    });
  };

  return (
    <Screen testID="createTaskScreen" justifyContent="flex-start">
      <View flexDirection="row" alignItems="center" marginBottom="m">
        <Button
          testID="backButton"
          variant="imageButton"
          disabled={mutation.isLoading}
          icon={
            <BackArrowIcon
              width={36}
              height={36}
              fill={theme.colors['textPrimary']}
            />
          }
          onPress={goBack}
        />
        <Text variant="header" color="textPrimary" marginVertical="m" ml="m">
          Create task
        </Text>
      </View>
      <Input
        testID="taskInput"
        value={text}
        name="taskInput"
        variant="textArea"
        autoFocus={true}
        placeholder="Enter the task"
        onChangeText={setText}
      />
      <Button
        testID="createTaskButton"
        label="Create task"
        marginTop="m"
        loading={mutation.isLoading}
        loadingLabel="Creating task"
        marginHorizontal="xl"
        disabled={text.length === 0}
        onPress={createTask}
      />
    </Screen>
  );
});
