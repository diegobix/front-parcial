import { FunctionComponent } from "preact";
import { Definition } from "../types.ts";

type DefinicionesProps = {
  wordSearched: string;
  definitions: Definition[];
};

const Definiciones: FunctionComponent<DefinicionesProps> = (
  { wordSearched, definitions },
) => {
  return (
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
  );
};

export default Definiciones;
