import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Screen, Input, View, Text } from '../../components';
import { MaterialIndicator } from 'react-native-indicators';
import { TaskListItem } from './task-list-item';
import { useStores } from '../../models';
import { useQuery, useMutation } from 'react-query';

export const TaskListScreen = observer(() => {
  const store = useStores();
  const { isLoading, error, data, refetch } = useQuery('taskList', () =>
    store.taskList.getTasks(),
  );
  const updateTaskMutation = useMutation(item => item.toggle());

  const renderTaskItem = useCallback(
    ({ item }) => (
      <TaskListItem
        key={item.uid}
        title={item.title}
        isChecked={item.isChecked}
        onPress={() => {
          updateTaskMutation.mutate(item, {
            onSuccess: () => {},
            onError: () => {},
            onSettled: () => {},
          });
        }}
      />
    ),
    [],
  );
  const keyExtractor = useCallback(item => item.uid, []);
  const onTextChange = useCallback(text => {
    store.setSearchString(text);
  }, []);

  const filteredTasks = store.filteredTasks;

  return (
    <Screen testID="taskListScreen" paddingTop="s">
      <Input
        testID="searchboxInput"
        name="searchBar"
        variant="searchbox"
        debounced={true}
        placeholder="Search tasks"
        onChangeText={onTextChange}
      />
      <FlatList
        style={styles.listContainer}
        data={filteredTasks}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        extraData={toJS(filteredTasks)}
        renderItem={renderTaskItem}
        keyExtractor={keyExtractor}
        onEndReached={({ distanceFromEnd }) => {
          console.log('onEndReached ', distanceFromEnd);
          if (distanceFromEnd < 65) {
            console.log('refetching');
            refetch();
          }
        }}
        ItemSeparatorComponent={() => (
          <View height={StyleSheet.hairlineWidth} backgroundColor="darkGrey" />
        )}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return filteredTasks.length > 0 && isLoading ? (
            <View>
              <MaterialIndicator size={40} color="grey" />
            </View>
          ) : null;
        }}
        ListFooterComponentStyle={styles.emptyListContainer}
        ListEmptyComponent={() => {
          return isLoading ? (
            <MaterialIndicator size={40} color="grey" />
          ) : (
            <View alignSelf="center" marginTop="xl">
              <Text>No tasks to show</Text>
            </View>
          );
        }}
      />
    </Screen>
  );
});

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
});
