import { useEffect, useState } from "react";
import _ from "lodash";
import classnames from "classnames";
/**
 * Data is now object so we have to convert it to an array then suffle and render it
 *
 *
 */
const Game = ({ data }) => {
  const [option, setoption] = useState();
  const [selectedOption, setselectedOption] = useState([]);
  const [correctSelection, setcorrectSelection] = useState([]);

  //Set => India Delhi
  //Set => Russia , Moscow => India,Delhi,Russia, Moscow
  const [matched, setmatched] = useState(new Set());

  useEffect(function onMount() {
    //.flat() removes one level of nesting.
    //Object.entries(data).flat(Infinity); for full flattening
    const AllOption = Object.entries(data).flat();

    setoption(_.shuffle(AllOption));
  }, []);

  const handleSelection = (e) => {
    const { target } = e;
    const value = target.getAttribute("data-value");
    console.log({ value });

    if (selectedOption.length === 2 || selectedOption.includes(value)) {
      return null;
    }

    /**
     * We will have two turns
     * First turn => country / capital
     * border color to blue
     * second => selection
     * border color to blue
     * check the answer => right/wrong
     * border Color => change to green or red
     * reset > 1sec
     */

    //[India]
    // [India, Paris]
    const newSelection = selectedOption.concat(value);

    if (newSelection.length === 2) {
      const [first, second] = newSelection;

      if (data[first] === second || data[second] === first) {
        setcorrectSelection(newSelection);

        setTimeout(() => {
          setmatched(new Set([...matched, ...newSelection]));
          setcorrectSelection([]);
          setselectedOption([]);
        }, 1000);
      } else {
        setselectedOption(newSelection);
        setTimeout(function reset() {
          setselectedOption([]);
        }, 1000);
      }
    } else {
      setselectedOption(newSelection);
    }
  };

  if (matched.size === option?.length) {
    return (
      <div className="country-board">
        <h1>Congratulation</h1>
      </div>
    );
  }

  return (
    <div className="country-board">
      {option?.map((option) => {
        if (matched.has(option)) {
          return null;
        }
        const isSelected =
          selectedOption.includes(option) || correctSelection.includes(option);
        const isCorrect = correctSelection.includes(option);
        const isIncorrect =
          selectedOption.length === 2 && isSelected && !isCorrect;

        //key is imp in scenario like as option is unique so across all re render react know which element is selected
        //even when it is shuffled the key is maintained
        return (
          <button
            className={classnames(
              "option",
              isSelected && "selected",
              isIncorrect && "incorrect",
              isCorrect && "correct"
            )}
            key={option}
            onClick={handleSelection}
            data-value={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Game;

//One more edge we can think of even if it not there in question like we can selected same option twice we can handle that also
