import React from "react";
import { noop, partial } from "lodash";
import {
  MultiSelectorHiddenInput,
  MultiSelectorMainInput,
} from "../MultiSelector.styles";
import DefaultPill from "./DefaultPillComponent";

type IDefaultPillBoxComponent = {
  pillPlaceholder: string;
  hasError: boolean;
  displayDialog: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled: boolean;
  items?: any;
  getItemTitle?: (e: any) => any;
  removeItem?: (items: any, e: any) => any;
  pillUniqueIdentifier?: any;
};

export default function DefaultPillBoxComponent(
  props: IDefaultPillBoxComponent,
) {
  const {
    items,
    getItemTitle,
    disabled,
    removeItem,
    pillUniqueIdentifier,
    pillPlaceholder = "",
  } = props;
  return (
    <div>
      <MultiSelectorHiddenInput
        type="input"
        hasError={!!props.hasError}
        onFocus={props.displayDialog}
        tabIndex={props.disabled ? -1 : 0}
      />
      <MultiSelectorMainInput
        // @ts-ignore
        disabled={props.disabled}
        onClick={!props.disabled ? props.displayDialog : noop}
        data-testid="selector__main-input"
      >
        {Array.isArray(items) && items.length > 0 && (
          <>
            {items.map((item, idx) => {
              return (
                <DefaultPill
                  key={item[pillUniqueIdentifier] || idx}
                  item={item}
                  removeItem={partial(removeItem, item)}
                  getItemTitle={getItemTitle}
                  disabled={disabled}
                />
              );
            })}
          </>
        )}
        {Array.isArray(items) ||
          (items.length < 1 && (
            <>
              <div
                style={{
                  padding: "2px 8px 1px",
                  fontStyle: "italic",
                }}
              >
                {pillPlaceholder}
              </div>
            </>
          ))}
      </MultiSelectorMainInput>
    </div>
  );
}
