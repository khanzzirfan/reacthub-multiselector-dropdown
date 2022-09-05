import React from "react";
import { isEqual } from "lodash";
import {
  MultiSelectorItemIcon,
  MultiSelectItemTitle,
  CheckIcon,
} from "../MultiSelector.styles";

type IDefaultItemComponent = {
  item: any;
  getItemTitle: (item: string) => string;
  doNotScroll: boolean;
  selectedItems: any;
};

export default function DefaultItemComponent(props: IDefaultItemComponent) {
  const item = props.item;
  const getItemTitle = props.getItemTitle;
  const selectedItems = props.selectedItems;
  const selected = selectedItems.some((checkItem: any) =>
    isEqual(checkItem, item),
  );

  return (
    <div title={`${getItemTitle(item)}`} style={{ display: "flex" }}>
      <MultiSelectorItemIcon
        selected={!!selected}
        data-testid="selector-item__icon"
      >
        <CheckIcon selected={selected} data-testid="icon-check" />
      </MultiSelectorItemIcon>
      <MultiSelectItemTitle data-testid="selector-item__title">
        {`${getItemTitle(item)}`}
      </MultiSelectItemTitle>
    </div>
  );
}
