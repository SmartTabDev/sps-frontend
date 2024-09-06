import React from 'react';
import Downshift from 'downshift';

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
];

const TagsInput = () => (
  <>
    <Downshift
      onChange={() => {
        //
      }}
      itemToString={(item) => (item ? item.value : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div>
          <label {...getLabelProps()}>Enter a fruit</label>
          <div
            style={{ display: 'inline-block' }}
            {...getRootProps(
              { refKey: 'innerRef' },
              { suppressRefError: true },
            )}
          >
            <input {...getInputProps()} />
          </div>
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                .filter(
                  (item) => !inputValue || item.value.includes(inputValue),
                )
                .map((item, index) => (
                  <li
                    key={index}
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.value}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  </>
);

export default TagsInput;
