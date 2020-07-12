import React, { Dispatch, SetStateAction, useState } from 'react';

interface ISearchContext {
  firstSearchDone: boolean;
  setFirstSearchDone: Dispatch<SetStateAction<boolean>>;
}

export const SearchContext = React.createContext<ISearchContext>({
  firstSearchDone: false,
  setFirstSearchDone: () => {},
});

interface IProps {
  children: any;
}

function SearchProvider(props: IProps) {
  const [firstSearchDone, setFirstSearchDone] = useState(false);
  return (
    <SearchContext.Provider
      value={{
        firstSearchDone,
        setFirstSearchDone,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;