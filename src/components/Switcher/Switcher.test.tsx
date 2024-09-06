import { screen, fireEvent, RenderResult } from '@testing-library/react';
import React from 'react';
import { render } from '__test__/test-utils-new';
import Switcher from './index';

// Switcher component has few things inside:
// - optional IconComponent - we can tests if it render correctly
// - optional title - same as above
// - action which should be called after click on option
// - active and isPrimary flags - we have to test their effect on component

// we can use global handlers for each test, to make them simplest
let utils: undefined | RenderResult;
const handleAction = jest.fn();

// run this action before each test
beforeEach(() => {
  utils = render(
    // rerender component with base options
    <Switcher<string>
      action={handleAction}
      options={['First option', 'Second option']}
    />,
  );
});

afterEach(() => {
  // any cleanup here
  handleAction.mockReset(); // rest fake function statistics
});

// #########################################################################################
// first we want to show which props are required for this component
test('Switcher - rendering with minimum configuration', () => {
  // we can use debug to see what's rendered:
  // screen.debug();

  expect(screen.getByText('First option')).toBeInTheDocument();
  expect(screen.getByText('Second option')).toBeInTheDocument();
});

// #########################################################################################
// here we are going to test action callback after clicking option
test('Switcher - should call action callback on click option', () => {
  fireEvent.click(screen.getByText('First option'));
  expect(handleAction).toHaveBeenCalledWith('First option');

  fireEvent.click(screen.getByText('Second option'));
  expect(handleAction).toHaveBeenCalledWith('Second option');
});

// #########################################################################################
// here we are going to test what's going on when prop like active is set
test('Switcher - should call action callback on click option', () => {
  const { rerender } = utils!;
  // we can only test their font-weight style

  // active is unset so none of options should have bold value
  expect(screen.getByText('First option')).not.toHaveStyle(
    'font-weight: bold;',
  );
  expect(screen.getByText('Second option')).not.toHaveStyle(
    'font-weight: bold;',
  );

  rerender(
    // rerender with active prop
    <Switcher<string>
      action={handleAction}
      options={['First option', 'Second option']}
      active="Second option"
    />,
  );

  expect(screen.getByText('First option')).not.toHaveStyle(
    'font-weight: bold;',
  );
  // second option should have bold value
  expect(screen.getByText('Second option')).toHaveStyle('font-weight: bold;');
});

// #########################################################################################
// here we are going to test what's going on when prop like isPrimary change
test('Switcher - should call action callback on click option', () => {
  const { rerender } = utils!;

  expect(screen.getByText('First option')).toHaveStyle(
    'color: rgb(68, 126, 235);',
  );
  expect(screen.getByText('Second option')).toHaveStyle(
    'color: rgb(68, 126, 235);',
  );

  rerender(
    <Switcher<string>
      action={handleAction}
      options={['First option', 'Second option']}
      isPrimary={false}
    />,
  );

  // all options should have rgb(68, 126, 235) value
  expect(screen.getByText('First option')).not.toHaveStyle(
    'color: rgb(68, 126, 235);',
  );
  expect(screen.getByText('Second option')).not.toHaveStyle(
    'color: rgb(68, 126, 235);',
  );
});

// #########################################################################################
// TODO more logic to tests when title will accept ReactNode
test('Switcher - should render title', () => {
  const { rerender } = utils!;

  rerender(
    <Switcher<string>
      action={handleAction}
      options={['First option', 'Second option']}
      isPrimary={false}
      title="My Title"
    />,
  );

  expect(screen.getByText('My Title')).toBeInTheDocument();
});
