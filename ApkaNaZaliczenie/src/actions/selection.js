import { SELECTED_ITEM } from "./types";

export const selectItem = selectedItem => {
  return (dispatch, getState) => {
    if (!getState().selection.selectedItem) {
      dispatch({
        type: SELECTED_ITEM,
        selectedItem
      });
    } else {
      dispatch({
        type: SELECTED_ITEM,
        selectedItem: ""
      });
    }
  };
};
