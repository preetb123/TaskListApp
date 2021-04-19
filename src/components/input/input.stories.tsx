import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';

import { Input } from './input';

storiesOf('input', module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add('default', () => (
    <Story>
      <UseCase
        text="default input with placeholder"
        usage="default input field without any props">
        <Input name="sampleInput" placeholder="Sample input" />
      </UseCase>
      <UseCase text="input with label">
        <Input
          name="withLabel"
          placeholder="Sample input with label"
          label="Sample input"
        />
      </UseCase>
    </Story>
  ))
  .add('searchbox', () => (
    <Story>
      <UseCase
        text="default search input with placeholder"
        usage="default search input">
        <Input
          name="sampleInput"
          variant="searchbox"
          placeholder="Sample input"
        />
      </UseCase>
      <UseCase text="search input with text entered">
        <Input
          name="withLabel"
          variant="searchbox"
          placeholder="Sample input with label"
          value="task to search"
        />
      </UseCase>
    </Story>
  ))
  .add('text area', () => (
    <Story>
      <UseCase
        text="default text area"
        usage="text area input for entering tasks">
        <Input
          name="sampleInput"
          variant="textArea"
          placeholder="Enter task description"
        />
      </UseCase>
      <UseCase text="text area input with text">
        <Input
          name="withLabel"
          variant="textArea"
          placeholder="enter description for tak"
          value="Sample task"
        />
      </UseCase>
    </Story>
  ));
