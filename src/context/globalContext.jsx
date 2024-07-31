import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    textSearch: "",
    checkBoxFilter: [],
    selectedOne: "all",
    selectedTwo: "all",
    rangeMarket: 100,
    isSelectedCircle: false,
  });

  const handleClearAllFilters = () => {
    setState((prevState) => ({
      ...prevState,
      textSearch: "",
      selectedOne: "all",
      selectedTwo: "all",
      isSelectedCircle: false,
      checkBoxFilter: [],
    }));
  };

  const handleSelectOne = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedTwo: e.target.value,
    }));
  };
  const handleSelectTwo = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedOne: e.target.value,
    }));
  };

  const handleCheckBoxChange = (categoryValue) => {
    setState((prevState) => ({
      ...prevState,
      checkBoxFilter: categoryValue,
    }));
  };

  function handleTextSearch(inputValue) {
    setState((prevState) => ({
      ...prevState,
      textSearch: inputValue.toLowerCase(),
    }));
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleClearAllFilters,
        handleSelectTwo,
        handleSelectOne,
        handleCheckBoxChange,
        handleTextSearch,
        setRangeMarket: (value) => setState({ ...state, rangeMarket: value }),
        setIsSelectedCircle: (value) =>
          setState({ ...state, isSelectedCircle: value }),
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
