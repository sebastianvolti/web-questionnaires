import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './index.scss';

type Props = {
  index: number;
  id: string;
  title: string;
  color?: number;
};

const Card: React.FunctionComponent<Props> = ({
  index,
  id,
  title,
  color,
}: Props): JSX.Element => (
  <Draggable draggableId={id} index={index}>
    {(provided) => (
      <div
        className={`card ${
          color !== undefined ? `card__${color} card__in-category` : ''
        }`}
        ref={provided.innerRef}
        data-rbd-draggable-context-id={
          provided.draggableProps['data-rbd-draggable-context-id']
        }
        data-rbd-draggable-id={provided.draggableProps['data-rbd-draggable-id']}
        onTransitionEnd={provided.draggableProps.onTransitionEnd}
        style={provided.draggableProps.style}
        aria-describedby={provided.dragHandleProps?.['aria-describedby']}
        data-rbd-drag-handle-context-id={
          provided.dragHandleProps?.['data-rbd-drag-handle-context-id']
        }
        data-rbd-drag-handle-draggable-id={
          provided.dragHandleProps?.['data-rbd-drag-handle-draggable-id']
        }
        draggable={provided.dragHandleProps?.draggable}
        onDragStart={provided.dragHandleProps?.onDragStart}
        role={provided.dragHandleProps?.role}
        tabIndex={provided.dragHandleProps?.tabIndex}
      >
        {title}
      </div>
    )}
  </Draggable>
);

export default Card;
