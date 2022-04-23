import React from 'react';
import { IMainContext } from '../interface/Interface';

export const MainContext = React.createContext<IMainContext>({
  favorites: [],
  handleStateChange: () => {},
});
