import { defaultSearchValues } from '@constants/defaultSearchValues';
import { IGetParams } from '@localTypes/ArtworksAPITypes';
import { createContext, useContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface ISearchParamsContext {
  params: IGetParams;
  setParams: React.Dispatch<React.SetStateAction<IGetParams>>;
}

const SearchParamsContext = createContext<ISearchParamsContext | undefined>(
  undefined,
);

export const useSearchParamsContext = () => {
  const context = useContext(SearchParamsContext);

  if (!context) {
    throw new Error(
      'useSearchParamsContext must be used within a SearchParamsProvider',
    );
  }

  return context;
};

export const SearchParamsProvider = ({ children }: IProps) => {
  const [params, setParams] = useState<IGetParams>(defaultSearchValues);

  return (
    <SearchParamsContext.Provider value={{ params, setParams }}>
      {children}
    </SearchParamsContext.Provider>
  );
};
