# React Multi Select dropdown component

[Demo at Netlify ](https://visionary-scone-7bcb28.netlify.app/)

# Usage

```
import MultiSelect from "./MultiSelect";

const itemsChanged = (selectedItems: any): void => {
    console.log(selectedItems);
  };

  const inputChange = (input: any) => {
    //Input will be whatever current text is in the input
  };

  const getCustomTitle = (item: any): string => {
    return `${item.firstName} ${item.lastName}`;
  };

 <MultiSelect
              items={items}
              onChange={itemsChanged}
              onInputChange={inputChange}
              getItemTitle={getCustomTitle}
            />

```
