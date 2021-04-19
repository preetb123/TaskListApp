import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { StoryScreen, Story, UseCase } from '../../../storybook/views';
import { Button } from './button';
import { AddTaskIcon } from '../icons';
import { Text, View } from '../';

const buttonStories = storiesOf('Buttons', module).addDecorator(fn => (
  <StoryScreen>{fn()}</StoryScreen>
));

// then I add a story with the name default view, I can add multiple stories to button stories
buttonStories
  .add('default', () => (
    <Story>
      <UseCase
        text="primary"
        usage="Button with primary variant. Button will look like this by default">
        <Button
          label={text('Button text', 'Sign in')}
          onPress={action('clicked button')}
        />
      </UseCase>
      <UseCase
        text="primary with loading=true"
        usage="Primary button with loading indicaor and loadingLabel">
        <Button
          label="Test"
          loading={true}
          loadingLabel="Signing in"
          onPress={() => null}
        />
      </UseCase>
      <UseCase text="primary disabled" usage="disabled button">
        <Button label="Sign in" disabled={true} onPress={() => null} />
      </UseCase>
    </Story>
  ))
  .add('image button', () => (
    <Story>
      <UseCase text="image button" usage="A button that only displays an icon">
        <View>
          <Button
            variant="imageButton"
            icon={<AddTaskIcon height={36} width={36} fill="black" />}
            onPress={action('image button clicked')}
          />
        </View>
      </UseCase>
    </Story>
  ))
  .add('button container', () => (
    <Story>
      <UseCase
        text="button container"
        usage="creates a clickable container that can have many children">
        <View>
          <Button
            variant="containerButton"
            padding="s"
            onPress={action('item clicked')}>
            <Text>Sample item</Text>
            <Text>Sample item2</Text>
            <Text>Sample item2</Text>
            <Text>Sample item</Text>
            <Text>Sample item2</Text>
            <Text>Sample item2</Text>
            <Button
              variant="imageButton"
              icon={<AddTaskIcon height={36} width={36} fill="black" />}
              onPress={action('image button clicked')}
            />
          </Button>
        </View>
      </UseCase>
    </Story>
  ));
