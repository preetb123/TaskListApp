import React from 'react';
import { ViewStyle } from 'react-native';
import { Checkbox } from '../../components';

interface TaskListItemProps {
  title: string;
  isChecked: boolean;
  onPress: () => void;
}

export const TaskListItem = React.memo(
  ({ title, isChecked, onPress }: TaskListItemProps) => {
    return <Checkbox checked={isChecked} label={title} onChange={onPress} />;
  },
  (prevProps, nextProps) => {
    const isCheckedEqual = nextProps.isChecked === prevProps.isChecked;
    return isCheckedEqual;
  },
);
