import * as React from "react";
import DefaultPillBoxComponent from "./components/DefaultPillBoxComponent";
import { MultiSelectorStyled } from "./MultiSelector.styles";
import { Dialog } from "./components/Dialog";
import { without, union, some } from "lodash";

interface IProps {
  children?: React.ReactNode;
  items: any;
  initialSelectedItems?: any;
  onInputChange?: (e: any) => any;
  onChange: (e: any) => any;
  getItemTitle?: (e: any) => any;
  ItemComponent?: any;
  CustomPillboxComponent?: any;
  placeholder?: string;
  pillPlaceholder?: string;
  maxLength?: number;
  noRestrict?: boolean;
  pressEnterToAddPhrase?: string;
  noResultsPhrase?: string;
  customCSSClass?: string;
  hasError?: boolean;
  color?: string;
  closeOnSelect?: boolean;
  keepSearchTextOnSelect?: boolean;
  showSearch?: boolean;
  doNotScroll?: boolean;
  disabled?: boolean;
  maxSearchItems?: number;
  disableInput?: (e: any) => boolean;
  onBlur?: (e: MouseEvent | TouchEvent) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  validate?: (e: any) => boolean;
  CustomPill?: any;
  pillUniqueIdentifier?: any;
  dialogHeight?: number;
  invalidMsg?: any;
  doneButton?: any;
}

interface IState {
  selectedItems: any;
  dialogDisplayed: boolean;
  activeIndex: any;
  searchValue: string;
  lastModifiedItem: any;
  invalid: boolean;
  initialSelectedItems: any;
  disabled: boolean;
}

export default class MultiSelector extends React.Component<IProps, IState> {
  private el = React.createRef<HTMLDivElement>();
  private gotMounted = React.createRef<boolean>();

  constructor(props: any) {
    super(props);
    this.state = {
      selectedItems: props.initialSelectedItems || [],
      dialogDisplayed: false,
      activeIndex: null,
      searchValue: "",
      lastModifiedItem: null,
      invalid: false,
      initialSelectedItems: [],
      disabled: false,
    };
  }

  static defaultProps = {
    showSearch: true,
    pillUniqueIdentifier: "id",
    initialSelectedItems: [],
    doNotScroll: false,
  };

  componentDidUpdate(prevProps: IProps) {
    if (this.props.initialSelectedItems !== prevProps.initialSelectedItems) {
      this.setState({
        selectedItems: this.props.initialSelectedItems,
        initialSelectedItems: this.props.initialSelectedItems,
      });
    }
  }

  componentDidMount() {
    // @ts-ignore
    this.gotMounted.current = true;
    document.addEventListener("click", this.close);
  }

  componentWillUnmount() {
    // @ts-ignore;
    this.gotMounted.current = false;
    document.removeEventListener("click", this.close);
  }

  closeDialog = (event: any): void => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({
      dialogDisplayed: false,
      searchValue: "",
    });
  };

  displayDialog = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!this.state.dialogDisplayed) {
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    }
    this.setState({
      dialogDisplayed: true,
    });
  };

  removeItem = (item: any, e: any) => {
    e.stopPropagation();
    this.setState(
      {
        selectedItems: without(this.state.selectedItems, item),
        lastModifiedItem: item,
      },
      this.triggerItemChange,
    );
  };

  getItemTitle = (item: any): string => {
    return item.label;
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.persist();
    let newVal = e.target.value;
    if (this.state.invalid && this.props.validate) {
      this.setState({
        invalid: !this.props.validate(newVal),
      });
    }
    this.setState(
      {
        disabled: this.props.disableInput
          ? this.props.disableInput(newVal)
          : false,
      },
      () => {
        this.inputChange(newVal);
      },
    );
  };

  inputChange = (newVal) => {
    this.props.onInputChange && this.props.onInputChange(newVal);
    this.setState({
      searchValue: newVal,
    });
  };

  triggerItemChange = () => {
    if (this.props.onChange) {
      this.props.onChange.call(
        null,
        this.state.selectedItems,
        this.state.lastModifiedItem,
      );
    }
  };

  selectItem = (item, e) => {
    let selectedItems = this.state.selectedItems;
    if (some(selectedItems, item)) {
      this.setState(
        {
          selectedItems: item.id
            ? selectedItems.filter((i) => i.id !== item.id)
            : without(selectedItems, item),
          invalid: false,
          dialogDisplayed: !this.props.closeOnSelect,
          lastModifiedItem: item,
        },
        this.triggerItemChange,
      );
    } else {
      this.setState(
        {
          selectedItems: union(selectedItems, [item]),
          invalid: false,
          dialogDisplayed: !this.props.closeOnSelect,
          lastModifiedItem: item,
        },
        this.triggerItemChange,
      );
    }
    if (!this.props.keepSearchTextOnSelect && e && e.currentTarget) {
      e.currentTarget.value = "";
      this.inputChange("");
    }
  };

  close = (e) => {
    const eventOccurredInsideOfThisComponent = this.el
      ? this.el.current.contains(e.target)
      : false;
    if (!eventOccurredInsideOfThisComponent) {
      setTimeout(() => {
        if (this.state.dialogDisplayed && this.gotMounted.current) {
          this.closeDialog(e);
        }
      });
    }
  };

  render() {
    //Get getItemTitle is the function that should be passed in to decide what `pill` will display on selection.
    let placeholder = this.props.placeholder
      ? this.props.placeholder
      : "search";
    const { dialogDisplayed } = this.state;

    return (
      <MultiSelectorStyled
        ref={this.el}
        active={!!this.state.dialogDisplayed}
        data-testid="selector"
      >
        <DefaultPillBoxComponent
          items={this.state.selectedItems || []}
          displayDialog={this.displayDialog}
          pillPlaceholder={this.props.pillPlaceholder}
          hasError={this.props.hasError}
          disabled={this.props.disabled}
          removeItem={this.removeItem}
          pillUniqueIdentifier={this.props.pillUniqueIdentifier}
          getItemTitle={this.props.getItemTitle || this.getItemTitle}
        />
        {/* {dialog} */}
        {dialogDisplayed && (
          <Dialog
            containerRef={this.el}
            showSearch={this.props.showSearch}
            onChange={this.handleChange}
            placeholder={placeholder}
            value={this.state.searchValue}
            dialogHeight={this.props.dialogHeight}
            items={this.props.items}
            maxSearchItems={this.props.maxSearchItems}
            getItemTitle={this.props.getItemTitle || this.getItemTitle}
            selectItem={this.selectItem}
            selectedItems={this.state.selectedItems}
          />
        )}
      </MultiSelectorStyled>
    );
  }
}
