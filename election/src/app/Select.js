import Select from 'react-select';
import { useRef } from 'react';

const MultiSelect = (props) => {
  const valueRef = useRef(props.selected);
  valueRef.current = props.selected;
  
  const selectAllOption = {value: "*", label:"Select All"};
  const isSelectAllSelected = () => ((valueRef.current.length === props.options.length) && props.options.length > 1);
  const isOptionSelected = (option, selectValue) => 
    valueRef.current.some(({value}) => value === option.value) ||
    isSelectAllSelected();

  const getOptions = () => props.options.length > 1 ? [selectAllOption, ...props.options] : [...props.options];
  const getValue = () => isSelectAllSelected() ? [selectAllOption] : props.selected;

  const handleSelect = (newValue, actionMeta) => {
    const {action, option, removedValue} = actionMeta;
    const opt = option;
    const removed = removedValue;
    if (action === "select-option" && opt.value === selectAllOption.value) {
      console.log("new item selected");
      props.setSelected(props.options);
    } else if ((action === "deselect-option" && opt.value === selectAllOption.value) || (action === "remove-value" && removed.value === selectAllOption.value)) {
      props.setSelected([]);
      console.log("all items removed");
    } else if (actionMeta.action === "deselect-option" && isSelectAllSelected()) {
      props.setSelected(
        props.options.filter(({ value }) => value !== opt.value));
        console.log("new item removed");
    } else {
      props.setSelected(newValue || []);
      console.log("new item added");
    }
  }

  return (
      <Select
        isOptionSelected={isOptionSelected}
        closeMenuOnSelect={false}
        defaultValue={getOptions()}
        value={getValue()}
        isMulti
        placeholder={props.title}
        options={getOptions()}
        onChange={handleSelect}
        hideSelectedOptions={props.hide ?? false}
        instanceId={props.title}
        id={props.title}
      />
  )
}

export default MultiSelect;

// import Select from 'react-select';
// import { useRef } from 'react';

// const MultiSelect = (props) => {
//   const valueRef = useRef(props.selected);
//   valueRef.current = props.selected;
  
//   const selectAllOption = { value: "All", label: "Select All" };

//   const isSelectAllSelected = () => (
//     (valueRef.current.length === props.options.length) && props.options.length > 1
//   );

//   const getOptions = () => (
//     props.options.length > 1 ? [selectAllOption, ...props.options] : [...props.options]
//   );

//   const getValue = () => (
//     isSelectAllSelected() ? [selectAllOption] : props.selected
//   );

//   const handleSelect = (newValue, actionMeta) => {
//     const { action, option } = actionMeta;
//     const opt = option;

//     if (action === "select-option" && opt.value === selectAllOption.value) {
//       props.onSelectAll(); // Call onSelectAll callback when "Select All" is selected
//     } else {
//       props.setSelected(newValue || []);
//     }
//   };

//   return (
//     <Select
//       closeMenuOnSelect={false}
//       defaultValue={getOptions()}
//       value={getValue()}
//       isMulti
//       placeholder={props.title}
//       options={getOptions()}
//       onChange={handleSelect}
//       hideSelectedOptions={props.hide ?? false}
//       instanceId={props.title}
//       id={props.title}
//     />
//   );
// };

// export default MultiSelect;

