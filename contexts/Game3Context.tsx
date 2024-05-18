import { createContext } from "react";

type OptionContextType = {
  wordBank: string[];
  setWordBank?: (wordBank: string[]) => void;
  foundHelps: string[];
  setFoundHelps?: (foundHelps: string[]) => void;
};

const Game3Context = createContext<OptionContextType>({
  wordBank: [],
  setWordBank: () => {},
  foundHelps: [],
  setFoundHelps: () => {},
});

export default Game3Context;
