import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getId = createAsyncThunk(
  "tickets/getId",
  async (_, { dispatch }) => {
    await axios
      .get("https://aviasales-test-api.kata.academy/search")
      .then((res) => dispatch(setSearchId(res.data.searchId)));
  }
);

export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async function getTicketsAsync(id, { dispatch }) {
    await axios
      .get(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
      .then((res) => {
        dispatch(setTickets(res.data.tickets));
        dispatch(setStop(res.data.stop));
      })
      .catch((error) => {
        if (error.status === 500) {
          setTimeout(() => {
            getTicketsAsync(id, { dispatch });
          }, 1500);
        }
      });
  }
);

export const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    searchId: "",
    isStop: false,
    tickets: [],
    countOnPage: 5,
    checkAll: true,
    filters: [
      { id: 1, label: "Все", isChecked: true },
      { id: 2, label: "Без пересадок", isChecked: true },
      { id: 3, label: "1 пересадка", isChecked: true },
      { id: 4, label: "2 пересадки", isChecked: true },
      { id: 5, label: "3 пересадки", isChecked: true },
    ],
    buttons: [
      { id: 1, label: "Самый дешевый", isChecked: false },
      { id: 2, label: "Самый быстрый", isChecked: false },
      { id: 3, label: "Оптимальный", isChecked: false },
    ],
  },
  reducers: {
    setSearchId: (state, action) => {
      state.searchId = action.payload;
    },
    setTickets: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
    setStop: (state, action) => {
      state.isStop = action.payload;
    },
    setCountOnPage: (state) => {
      state.countOnPage = state.countOnPage + 5;
    },
    toggleFilter: (state, action) => {
      const toggledElem = state.filters.find(
        (elem) => elem.id === action.payload.id
      );
      const allToggle = state.filters.find((elem) => elem.label === "Все");
      const transferElements = state.filters.filter((elem) => elem.id !== 1);
      if (toggledElem.id === 1) {
        state.checkAll = !state.checkAll;
        state.checkAll
          ? (state.filters = state.filters.map((elem) => ({
              ...elem,
              isChecked: true,
            })))
          : (state.filters = state.filters.map((elem) => ({
              ...elem,
              isChecked: false,
            })));
      } else {
        state.checkAll = false;
        toggledElem.isChecked = !toggledElem.isChecked;
        allToggle.isChecked = false;
        if (transferElements.filter((elem) => elem.isChecked).length === 4) {
          state.checkAll = true;
          allToggle.isChecked = true;
        }
      }
    },
    toggleButton: (state, action) => {
      const toggledButton = state.buttons.find(
        (elem) => elem.id === action.payload
      );
      if (!toggledButton.isChecked) {
        state.buttons = state.buttons.map((item) =>
          item.id === action.payload && !item.isChecked
            ? { ...item, isChecked: !item.isChecked }
            : { ...item, isChecked: false }
        );
        const filteredButton = state.buttons.find((elem) => elem.isChecked);
        if (filteredButton) {
          switch (filteredButton.id) {
            case 1:
              state.tickets = state.tickets.sort((a, b) => a.price - b.price);
              break;
            case 2:
              state.tickets = state.tickets.sort(
                (a, b) =>
                  a.segments[0].duration +
                  a.segments[1].duration >
                  b.segments[0].duration + b.segments[1].duration ? 1 : -1
              );
              break;
            case 3:
              state.tickets = state.tickets.sort(
                (a, b) =>
                  a.segments[0].duration + a.segments[1].duration + a.price >
                  b.segments[0].duration + b.segments[1].duration + b.price ? 1 : -1
              );
              break;
            default:
              state.tickets = [...state.tickets];
              break;
          }
        }
      } else {
        state.buttons = [...state.buttons];
      }
    },
  },
});

export const {
  setSearchId,
  setTickets,
  setStop,
  setCountOnPage,
  toggleFilter,
  toggleButton,
} = ticketSlice.actions;
export default ticketSlice.reducer;
