import { createContext } from "react";

type OptionContextType = {
  wordBank: string[];
  setWordBank?: (wordBank: string[]) => void;
};

const Game3Context = createContext<OptionContextType>({
  wordBank: [],
  setWordBank: () => {},
});

export default Game3Context;
