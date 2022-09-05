import React from "react";
import {
  MultiSelectorDialog,
  MultiSelectorDialogInput,
  MultiSelectorDialogItems,
  MultiSelectorItem,
} from "../MultiSelector.styles";
import DefaultItemComponent from "./DefaultItemComponent";
import { partial } from "lodash";

type IDialogProps = {
  containerRef?: React.RefObject<HTMLDivElement>;
  onChange: (e: any) => any;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  showSearch?: boolean;
  dialogHeight?: number;
  items: any;
  getItemTitle?: (e: any) => any;
  maxSearchItems?: number;
  doNotScroll?: boolean;
  selectedItems?: any;
  selectItem: any;
};

export const Dialog: React.FC<IDialogProps> = ({
  containerRef,
  onChange,
  placeholder,
  maxLength,
  showSearch,
  dialogHeight,
  getItemTitle,
  items = [],
  value,
  maxSearchItems,
  doNotScroll,
  selectedItems,
  selectItem,
}) => {
  // Refs;
  const dialogElementRef = React.useRef<HTMLDivElement>(null);
  const dialogSearchInputRef = React.useRef<HTMLInputElement>(null);
  const searchItems = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    setTimeout(() => {
      let el = containerRef.current;
      if (el) {
        let height = el.clientHeight;
        let dialog = dialogElementRef.current;

        if (dialog) {
          dialogElementRef.current.style.top = height + 1 + "px";
          if (showSearch) {
            let dialogInputElement = dialogSearchInputRef.current;
            if (dialogInputElement) {
              dialogSearchInputRef.current.focus();
            }
          }
        }
      }
    }, 100);
  }, [showSearch, selectedItems]);

  const getFilterItems = (items = []) => {
    return items.filter((item) => {
      return getItemTitle(item).toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  };

  /** drop down select items */
  const getSearchItems = (items = []) => {
    let filterItems = getFilterItems(items);
    // Show a message that user can press enter to add new item
    if (filterItems.length === 0) {
      const noResultsPhrase = "No items found.";
      return <div data-testid="selector-no-items">{noResultsPhrase}</div>;
    }

    if (maxSearchItems) {
      filterItems.length =
        filterItems.length > maxSearchItems
          ? maxSearchItems
          : filterItems.length;
    }

    return filterItems.map((item, index) => {
      return (
        <MultiSelectorItem
          key={index}
          ref={(ref) => {
            if (searchItems.current) {
              searchItems.current[index] = ref;
            } else {
              // @ts-ignore
              searchItems.current = [];
              searchItems.current[index] = ref;
            }
          }}
          onClick={partial(selectItem, item)}
          data-testid={"selector-item"}
        >
          <DefaultItemComponent
            item={item}
            selectedItems={selectedItems}
            getItemTitle={getItemTitle}
            doNotScroll={doNotScroll}
          />
        </MultiSelectorItem>
      );
    });
  };

  return (
    <MultiSelectorDialog
      data-testid={`selector__dialog`}
      ref={dialogElementRef}
    >
      {showSearch && (
        <div data-testid="selector__dialog__search">
          <MultiSelectorDialogInput
            ref={dialogSearchInputRef}
            onChange={onChange}
            data-testid={`multi-selector__dialog__input`}
            placeholder={placeholder}
            value={value}
            style={{ display: "inherit" }}
            {...(maxLength ? { maxLength } : {})}
          />
        </div>
      )}
      <MultiSelectorDialogItems
        style={dialogHeight ? { maxHeight: dialogHeight } : {}}
        data-testid={"selector__dialog__items"}
      >
        {getSearchItems(items)}
      </MultiSelectorDialogItems>
    </MultiSelectorDialog>
  );
};
