import React, { useReducer, useState } from 'react';
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
  setAnswer(answer: {[categoryName: string]: string[]}): void;
  validate(isValid: boolean): void;
};

const reducer = (
  state: {[categoryName: string]: string[]},
  action: {
    source: {droppableId: string; index: number};
    destination: {droppableId: string; index: number};
  },
) => {
  const sourceCategoryCards = [...state[action.source.droppableId]];
  const [draggedCard] = sourceCategoryCards.splice(action.source.index, 1);

  // If card is dragged into its own category
  if (action.source.droppableId === action.destination.droppableId) {
    sourceCategoryCards.splice(action.destination.index, 0, draggedCard);

    return {
      ...state,
      [action.source.droppableId]: sourceCategoryCards,
    };
  }

  // If card is dragged to other category
  const destinationCategoryCards = [...state[action.destination.droppableId]];
  destinationCategoryCards.splice(action.destination.index, 0, draggedCard);

  return {
    ...state,
    [action.source.droppableId]: sourceCategoryCards,
    [action.destination.droppableId]: destinationCategoryCards,
  };
};

const buildStateFromParameters = (parameters: any) => {
  const initialState: {[categoryName: string]: string[]} = {};

  initialState.banner = parameters.items;

  parameters.categories.forEach((categoryName: string) => {
    initialState[categoryName] = [];
  });

  return initialState;
};

const ClosedCardSorting: React.FunctionComponent<Props> = ({
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
    [...Array(Object.keys(state).length)].map(() =>
      Math.floor(Math.random() * 4),
    ),
  );

  const onDragEnd = ({source, destination}: any) => {
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    dispatch({
      source,
      destination,
    });

    const newState = reducer(state, {
      source,
      destination,
    });

    validate(newState.banner.length === 0);

    delete newState.banner;
    setAnswer(newState);
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
          <CardBanner id="banner" cards={state.banner} />
          <Modal
            isOpen={showInstructions === 1 || showInstructions === 2}
            onRequestClose={() => (showInstructions === 1 ? setInstructions(2) : setInstructions(0))}
            ariaHideApp={false}
            className={showInstructions === 1 ? 'bubble-step-first' : 'bubble-step-second'}
          >
            <div className="bubble-content__title">{showInstructions === 1 ? 'Step 1' : 'Step 2'}</div>
            <div className="bubble-content__text">{showInstructions === 1 ? InstructionText1 : InstructionText2}</div>
            {showInstructions === 2 && <div className="bubble-content__accept" onClick={() => setInstructions(0)}>Accept</div>}
          </Modal>
          <div className="card--activity__column">
            {Object.keys(state)
              .filter((elem) => elem !== 'banner')
              .map((categoryName, index) => (
                <Category
                  key={categoryName}
                  id={categoryName}
                  title={categoryName}
                  cards={state[categoryName]}
                  color={colors[index]}
                  editable={false}
                  onTitleChange={null}
                />
              ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ClosedCardSorting;
