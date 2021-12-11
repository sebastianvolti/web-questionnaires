/* eslint-disable react/prop-types */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Card from '../Card';

import './index.scss';

type Props = {
  id: string;
  title: string | null;
  cards: string[];
  color: number;
  editable: boolean;
  onTitleChange: any;
  onClose?(): void;
};

const Category: React.FunctionComponent<Props> = ({
  id,
  title,
  cards,
  color,
  editable,
  onTitleChange,
  onClose = () => {},
}: Props): JSX.Element => (
  <div className="group">
    <div className="group--parent">
      <div
        className={`group--parent__container group--parent__container__${color}`}
      >
        <div className="group--parent__title">
          {editable ? (
            <input
              type="text"
              name="title"
              value={title != null ? title : 'Add Title'}
              className="group--parent__title__input"
              onChange={(event) => onTitleChange(event.target.value)}
            />
          ) : (
            title
          )}
        </div>
        <div className="group--parent__info">
          <div className="group--parent__counter">
            {cards.length}
            {' '}
            Items
          </div>
          {editable ? (
            <button className={`group--parent__container__${color}__close group--parent__close`} type="button" onClick={onClose}>Delete</button>
          )
            : null}
        </div>
        <hr className={`group--parent__container__${color}__hbar`} />
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              className="group--parent__list-container"
              ref={provided.innerRef}
            >
              {cards.map((cardName: string, index: number) => (
                <Card
                  key={cardName}
                  index={index}
                  id={cardName}
                  title={cardName}
                  color={color}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  </div>
);

export default Category;
