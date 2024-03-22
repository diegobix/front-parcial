import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { JSX } from "preact";
import axios from "npm:axios";

type Definition = {
  definition: string;
  example?: string;
};

type Meaning = {
  definitions: Definition[];
};

type ApiResponse = [
  {
    meanings: Meaning[];
  }?,
];

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
      const res = await axios.get<ApiResponse>(url);
      if (res.data.length === 0) {
        setDefinitions([]);
        return;
      }
      const aux: Definition[] = [];
      res.data.forEach((e) =>
        e?.meanings.forEach((meaning) =>
          meaning.definitions.forEach((def) => {
            const { definition, example } = def;
            if (example === undefined) aux.push({ definition });
            else aux.push({ definition, example });
          })
        )
      );
      setDefinitions(aux);
    } catch (e) {
      setDefinitions([]);
    }
    setWordSearched(word);
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
        <div class="definiciones">
          <h3>{wordSearched}</h3>
          <ul>
            {definitions.map((def, i) => (
              <li key={i}>
                <p>
                  <span>
                    <strong>Definition:</strong>
                    <br />
                  </span>
                  <span>{def.definition}</span>
                </p>
                {def.example && (
                  <p>
                    <span>
                      <strong>Example:</strong>
                      <br />
                    </span>
                    <span>{def.example}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Form;
