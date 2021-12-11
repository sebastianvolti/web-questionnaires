/* eslint-disable react/prop-types */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Card from '../Card';

import './index.scss';

type Props = {
  id: string;
  cards: string[];
};

const CardBanner: React.FunctionComponent<Props> = ({
  id,
  cards,
}: Props): JSX.Element => (
  <div className="group--banner">
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="group--banner__list" ref={provided.innerRef}>
          {cards.map((item: string, index: number) => (
            <Card key={item} index={index} id={item} title={item} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default CardBanner;
