import styled, { css } from "styled-components";

type IContainerProps = {
  active: boolean;
};

//  selector
export const MultiSelectorStyled = styled.div<IContainerProps>`
  display: inline-block;
  position: relative;
  font-size: 1.4rem;
  width: 340px;
  z-index: 1;
  ${({ active }) =>
    active &&
    `
    z-index: 8;
  `};
`;

type IMultiSelectorItemProps = {
  highlighted?: boolean;
};
// multi-selector-item {
export const MultiSelectorItem = styled.div<IMultiSelectorItemProps>`
  display: block;
  height: 40px;
  position: relative;
  padding-top: 6px;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;

  ${({ highlighted }) =>
    highlighted &&
    `
    background-color: #f7f7f7;
  `}
`;

type IMultiSelectorHiddenInputProps = {
  hasError?: boolean;
};

export const MultiSelectorHiddenInput = styled.input<IMultiSelectorHiddenInputProps>`
  max-width: 100%;
  position: absolute;
  border-radius: 5px;
  ${({ hasError }) =>
    hasError &&
    `
  border: 2px solid hsla(18, 99%, 71%, 0.3);
  box-shadow: none;`}
`;

// dialog
export const MultiSelectorDialog = styled.div`
  background: white;
  position: absolute;
  top: 33px;
  min-width: 298px;
  width: auto;
  z-index: 1;
  border-radius: 5px;
`;

export const MultiSelectorDialogItems = styled.div`
  padding: 16px 0;
  max-height: 254px;
  overflow-y: auto;
`;

export const MultiSelectorDone = styled.div`
  border: 2px solid hsla(18, 99%, 71%, 0.3);
  box-shadow: none;
`;

type IMultiSelectorMainInput = {
  hasError?: boolean;
};

export const ContainerFormControl = styled.div`
  display: block;
  width: 100%;
  height: 32px;
  padding: 2px 12px 1px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  -webkit-transition: border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
`;

export const FormControlCss = css`
  display: block;
  width: 100%;
  height: 32px;
  padding: 2px 12px 1px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
`;

export const MultiSelectorMainInput = styled.div<IMultiSelectorMainInput>`
  ${FormControlCss}
  position: relative;
  white-space: normal;
  z-index: 2;
  padding: 4px 4px 0 4px;
  min-height: 32px;
  height: auto;
  ${({ hasError }) =>
    hasError &&
    `
    border-color: red;
  `}
`;

type IMultiSelectorPill = {
  closed?: boolean;
};

export const MultiSelectorPill = styled.div<IMultiSelectorPill>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  margin-right: 5px;
  height: 25px;
  margin-bottom: 3px;
  vertical-align: top;
  border-radius: 5px;
  max-width: 184px;
  background-color: #afafaf !important;

  ${({ closed }) =>
    closed &&
    `
  display: inline-block;
  line-height: normal;
  height: 100%;
  `}

  & > span {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`;

export const MultiSelectorPillClose = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  line-height: normal;
  height: 100%;
  cursor: pointer;
`;

type IMultiSelectorItemIcon = {
  selected?: boolean;
};

export const MultiSelectorItemIcon = styled.div<IMultiSelectorItemIcon>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  border-radius: 1px;
  border: solid 2px #afafaf;
  ${({ selected }) =>
    selected &&
    `
  `}
`;

export const MultiSelectItemTitle = styled.div`
  display: inline-block;
  position: absolute;
  left: 56px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: calc(100% - 6.4rem);
  overflow-x: hidden;
`;

export const MultiSelectorDialogInput = styled.input`
  ${FormControlCss}
  display: inherit;
`;

type ICheckIcon = {
  selected?: boolean;
};
export const CheckIcon = styled.i<ICheckIcon>`
  font-size: 1.5rem;
  color: #777777;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;

  ${({ selected }) =>
    selected &&
    `
    &::before {
      content: "\\2713";
    }
  `}
`;
