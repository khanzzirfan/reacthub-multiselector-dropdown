import React from "react";
import {
  MultiSelectorPill,
  MultiSelectorPillClose,
} from "../MultiSelector.styles";

import CloseIcon from "../assets/closeicon.svg";

type IDefaultPillProps = {
  removeItem: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  getItemTitle: (item: string) => string;
  item: any;
  disabled: boolean;
};

export default function DefaultPill(props: IDefaultPillProps) {
  return (
    <MultiSelectorPill
      data-testid={`pill-component`}
      title={`${props.getItemTitle(props.item)}`}
    >
      <span
        style={{ verticalAlign: "top", margin: "0 8px" }}
        title={props.getItemTitle(props.item)}
      >
        {props.getItemTitle(props.item)}
      </span>
      {!props.disabled && (
        <MultiSelectorPillClose
          data-testid={`pillclose`}
          onClick={props.removeItem}
        >
          <img
            src={CloseIcon}
            data-testid="close-icon"
            width={15}
            height={15}
            alt="close"
          />
        </MultiSelectorPillClose>
      )}
    </MultiSelectorPill>
  );
}
