import { Theme } from '@mui/material/styles';

import Autocomplete from './Autocomplete';
import ButtonBase from './ButtonBase';
import Checkbox from './Checkbox';
import FilledInput from './FilledInput';
import FormControl from './FormControl';
import FormControlLabel from './FormControlLabel';
import FormHelperText from './FormHelperText';
import Input from './Input';
import InputAdornment from './InputAdornment';
import InputBase from './InputBase';
import InputLabel from './InputLabel';
import LinearProgress from './LinearProgress';
import Link from './Link';
import ListItem from './ListItem';
import OutlinedInput from './OutlinedInput';
import Radio from './Radio';
import Slider from './Slider';
import Switch from './Switch';
import TextField from './TextField';
import Tooltip from './Tooltip';
import TableRow from './TableRow';
import DataGrid from './DataGrid';

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Autocomplete(theme),
    ButtonBase(theme),
    Checkbox(theme),
    FilledInput(theme),
    FormControl(theme),
    FormControlLabel(theme),
    FormHelperText(theme),
    Input(theme),
    InputAdornment(theme),
    InputBase(theme),
    InputLabel(theme),
    LinearProgress(theme),
    Link(theme),
    ListItem(theme),
    OutlinedInput(theme),
    Radio(theme),
    Slider(theme),
    Switch(theme),
    TextField(theme),
    Tooltip(theme),
    TableRow(theme),
    DataGrid(theme)
  );
}
