import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/storage/getLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import { updateLocalStorage } from "../../utils/storage/updateLocalStorage";
const categorySlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    loadData: (state, action) => {
      const data = getLocalStorage(LOCAL_STORAGE_KEY);
      state.content = data;
    },

    addCategory: (state, action) => {
      state.content = [...state.content, action.payload];
      updateLocalStorage(LOCAL_STORAGE_KEY, state.content);
    },

    addNote: (state, action) => {
      //  in state we will have a new note, then we wil need to check if this note is in a category that already exists, if it is, we will add it to the category, if not, we will create a new category with the new note
      // 1. check if the category already exists
      const categoryExists = state.find(
        (category) => category.title === action.payload.category
      );
      if (categoryExists) {
        // 2. if the category exists, we will add the new note to the category
        categoryExists.content = [...categoryExists.content, action.payload];
      } else {
        // 3. if the category does not exist, we will create a new category with the new note
        state = [
          ...state,
          { title: action.payload.category, content: [action.payload] },
        ];
      }

      state.content.push(action.payload);
    },
    deleteNote: (state, action) => {
      //action payload is the id of the note to delete
      //state.content is the array of categories
      //state.content.content is the array of notes
      //state.content.content.id is the id of the note
      const newState = state.content.map((category) => {
        return {
          ...category,
          content: category.content.filter(
            (note) => note.id !== action.payload
          ),
        };
      });
      state.content = newState;

      updateLocalStorage(LOCAL_STORAGE_KEY, newState);
    },
    editNote: (state, action) => {
      //action payload is the note to edit
      state.content = state.content.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
    },
    completeNote: (state, action) => {
      //action payload is the id of the note to complete
      state.content = state.content.map((note) => {
        if (note.id === action.payload) {
          return { ...note, isCompleted: !note.isCompleted };
        }
        return note;
      });
    },
  },
});

export const {
  loadData: loadDataActioncreator,
  addNote: addNoteActioncreator,
  deleteNote: deleteNoteActioncreator,
  completeNote: completeNoteActioncreator,
  addCategory: addCategoryActioncreator,
} = categorySlice.actions;

export default categorySlice.reducer;
