'use client '
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import styles from "../../styles/TopScreen.module.css"

const SidebarFilter = ({ type, size, single, dropDown=[], onValueChange = () => {},defaultValue='' }) => {
  const theme = useTheme();
  const [categories, setCategories] = useState(defaultValue || []);


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const getStyles = (name, categories, theme) => {
    return {
      fontWeight:
        categories.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const handleChangeSingle = (event) => {
    setCategories(event.target.value);
    onValueChange(event.target.value);
  };


  return (
    <div
      className={`${"small".localeCompare(size) == 0 ? "md:px-4 mt-4" : ""}`}
    >
      <div className="text-black ">
        <FormControl className="w-full">
          <InputLabel size={"small".localeCompare(size) == 0 ? "small" : ""}>
            {type}
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple={single ? false : true}
            value={categories}
            defaultValue={defaultValue || (single ? '' : [])}
            onChange={handleChangeSingle}
            input={<OutlinedInput label={`${type}`} />}
            MenuProps={MenuProps}
            size={"small".localeCompare(size) == 0 ? "small" : ""}
          >
            {dropDown && dropDown.map((name) => ( 
              <MenuItem
                key={name}
                value={name}
                className={`${styles.candidateFilterScroll}`}
                style={getStyles(name, categories, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SidebarFilter;