import { defaultSearchValues } from '@constants/defaultSearchValues';
import { IGetParams, IResponse } from '@services/ArtworksAPI';
import { createContext, useContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface IPaintingsContext {
  paintings: IResponse | null;
  setPaintings:
    | React.Dispatch<React.SetStateAction<IResponse>>
    | React.Dispatch<React.SetStateAction<null>>;
  params: IGetParams;
  setParams: React.Dispatch<React.SetStateAction<IGetParams>>;
}

const PaintingsContext = createContext<IPaintingsContext | undefined>(
  undefined,
);

export const usePaintingsContext = () => {
  const context = useContext(PaintingsContext);

  if (!context) {
    throw new Error(
      'usePaintingsContext must be used within a PaintingsProvider',
    );
  }

  return context;
};

export const PaintingsProvider = ({ children }: IProps) => {
  const [paintings, setPaintings] = useState(null);
  const [params, setParams] = useState(defaultSearchValues);

  return (
    <PaintingsContext.Provider
      value={{ paintings, setPaintings, params, setParams }}
    >
      {children}
    </PaintingsContext.Provider>
  );
};
