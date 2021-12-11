import React, { useEffect, useReducer, useState } from 'react';
import Modal from 'react-modal';
import { DragDropContext } from 'react-beautiful-dnd';

import Category from '../Category';
import CardBanner from '../CardBanner';
import { InstructionText1, InstructionText2 } from '../../../helpers/constants/mocks';
import './index.scss';

type Props = {
  label: string;
  parameters: any;
  answer: any;
  setAnswer(value: any): void;
  validate(isValid: boolean): void;
};

const reducer = (
  state: {
    [categoryNumber: string]: {
      title: string | null;
      cards: string[];
    };
  },
  action:
    | {
        source: {droppableId: string; index: number};
        destination: {droppableId: string; index: number};
      }
    | {keyToClose: string}
    | {key: string; title: string},
) => {
  const dragAction = action as {
    source: {droppableId: string; index: number};
    destination: {droppableId: string; index: number};
  };

  const closeAction = action as {keyToClose: string};

  const cardAction = action as {key: string; title: string};

  // Drag & Drop action
  if (dragAction.source) {
    const sourceCategoryCards = [...state[dragAction.source.droppableId].cards];
    const [draggedCard] = sourceCategoryCards.splice(
      dragAction.source.index,
      1,
    );

    // If card is dragged to create new category
    if (dragAction.destination === null) {
      const destinationCategoryCards = [draggedCard];

      return {
        ...state,
        [dragAction.source.droppableId]: {
          ...state[dragAction.source.droppableId],
          cards: sourceCategoryCards,
        },
        [Object.keys(state).length.toString()]: {
          title: null,
          cards: destinationCategoryCards,
        },
      };
    }

    // If card is dragged into its own category
    if (dragAction.source.droppableId === dragAction.destination.droppableId) {
      sourceCategoryCards.splice(dragAction.destination.index, 0, draggedCard);

      return {
        ...state,
        [dragAction.source.droppableId]: {
          ...state[dragAction.source.droppableId],
          cards: sourceCategoryCards,
        },
      };
    }

    // If card is dragged to other category
    const destinationCategoryCards = [
      ...state[dragAction.destination.droppableId].cards,
    ];
    destinationCategoryCards.splice(
      dragAction.destination.index,
      0,
      draggedCard,
    );

    return {
      ...state,
      [dragAction.source.droppableId]: {
        ...state[dragAction.source.droppableId],
        cards: sourceCategoryCards,
      },
      [dragAction.destination.droppableId]: {
        ...state[dragAction.destination.droppableId],
        cards: destinationCategoryCards,
      },
    };
  }

  if (closeAction.keyToClose) {
    const cards = [...state[closeAction.keyToClose].cards];
    const stateKeys = Object.keys(state).map(Number);
    const groupsToUpdate = stateKeys
      .filter((index: number) => index > Number(closeAction.keyToClose))
      .reduce((groups, index) => ({ ...groups, [(index - 1).toString()]: state[index] }), {});
    const prevGroups = stateKeys
      .filter((index: number) => index < Number(closeAction.keyToClose) && index !== 0)
      .reduce((groups, index) => ({ ...groups, [index.toString()]: state[index] }), {});

    return {
      [(0).toString()]: { ...state[0], cards: [...state[0].cards, ...cards] },
      ...prevGroups,
      ...groupsToUpdate,
    };
  }

  // New Title action
  return {
    ...state,
    [cardAction.key]: {
      ...state[cardAction.key],
      title: cardAction.title,
    },
  };
};

const buildStateFromParameters = (parameters: any) => {
  const initialState: {
    [categoryName: string]: {
      title: string | null;
      cards: string[];
    };
  } = {};

  initialState['0'] = {
    title: 'Banner',
    cards: parameters.items,
  };

  return initialState;
};

const OpenCardSorting: React.FunctionComponent<Props> = ({
  label,
  parameters,
  answer,
  setAnswer,
  validate,
}: Props): JSX.Element => {
  const initialState = answer || buildStateFromParameters(parameters);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showInstructions, setInstructions] = useState(0);
  const [colors] = useState(
    [
      ...Array(
        Object.keys(state)
          .map((opportunityKey) => state[opportunityKey].cards.length)
          .reduce(
            (sumCardElements, cardElements) => sumCardElements + cardElements,
            0,
          ),
      ),
    ].map(() => Math.floor(Math.random() * 4)),
  );

  useEffect(() => {
    const newState = { ...state };

    validate(
      !newState[0].cards.length
      && Object.values(newState)
        .map((element) => element.title)
        .every((title: string | null) => title !== null),
    );

    delete newState[0];
    setAnswer(newState);
  }, [state, setAnswer, validate]);

  const onDragEnd = ({ source, destination }: any) => {
    if (
      !destination
      || source.droppableId !== destination.droppableId
      || source.index !== destination.index
    ) {
      dispatch({
        source,
        destination,
      });
    }
  };

  const onTitleChange = ({ key, title }: {key: string; title: string}) => {
    dispatch({ key, title });
  };

  const handleClose = (keyToClose: string) => {
    dispatch({ keyToClose });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="card-root">
        <div className="card-root__labels">
          <div className="card-root__title">{label}</div>
          <div
            className="card-root__instructions"
            onClick={() => setInstructions(1)}
          >
            View Instructions
          </div>
        </div>
        <div className="card--activity">
          <CardBanner id="0" cards={state[0].cards} />
          <Modal
            isOpen={showInstructions === 1 || showInstructions === 2}
            onRequestClose={() => (showInstructions === 1
              ? setInstructions(2) : setInstructions(0))}
            ariaHideApp={false}
            className={showInstructions === 1 ? 'bubble-step-first' : 'bubble-step-second'}
          >
            <div className="bubble-content__title">{showInstructions === 1 ? 'Step 1' : 'Step 2'}</div>
            <div className="bubble-content__text">{showInstructions === 1 ? InstructionText1 : InstructionText2}</div>
            {showInstructions === 2 && <div className="bubble-content__accept" onClick={() => setInstructions(0)}>Accept</div>}
          </Modal>
          <div className="card--activity__column">
            {Object.keys(state)
              .filter((elem) => elem !== '0')
              .map((opportunityKey, index) => (
                <Category
                  key={opportunityKey}
                  id={opportunityKey}
                  title={state[opportunityKey].title}
                  cards={state[opportunityKey].cards}
                  color={colors[index]}
                  editable
                  onTitleChange={(title: string) => onTitleChange({ key: opportunityKey, title })}
                  onClose={() => handleClose(opportunityKey)}
                />
              ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default OpenCardSorting;
