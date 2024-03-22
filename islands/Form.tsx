import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact";
import { Definition } from "../types.ts";
import Definiciones from "./Definiciones.tsx";

type Meaning = {
  definitions: Definition[];
};

type Entry = {
  meanings: Meaning[];
  word: string;
};

type ApiResponse = Entry[];

const Form: FunctionComponent = () => {
  const [word, setWord] = useState<string>("");
  const [wordSearched, setWordSearched] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [definitions, setDefinitions] = useState<Definition[]>([]);

  const handleSubmit = async (
    e: JSX.TargetedEvent<HTMLButtonElement, Event>,
  ) => {
    if (word.length === 0) {
      setError("Please enter a word");
      return;
    }
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;
      const res = await fetch(url);
      const data: ApiResponse = await res.json();
      if (data.length === 0 || res.status === 404) {
        setDefinitions([]);
        setWordSearched(word);
        return;
      }
      const aux: Definition[] = [];

      data.forEach((e) =>
        e.meanings.forEach((meaning) =>
          meaning.definitions.forEach((def) => {
            const { definition, example } = def;
            if (example === undefined) aux.push({ definition });
            else aux.push({ definition, example });
          })
        )
      );
      setWordSearched(data[0].word);
      setDefinitions(aux);
    } catch (e) {
      setDefinitions([]);
      console.error(e.message);
      setError(e.message);
      setWordSearched(word);
    }
  };

  return (
    <>
      <div class="container">
        <div class="form">
          <input
            type="text"
            name="word"
            id="word"
            onInput={(e) => {
              setWord(e.currentTarget.value);
              setError("");
            }}
            value={word}
            placeholder="Type a word"
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
        {error.length !== 0 && <p class="error">{error}</p>}
      </div>
      {wordSearched.length !== 0 && (
        <Definiciones wordSearched={wordSearched} definitions={definitions} />
      )}
    </>
  );
};

export default Form;
