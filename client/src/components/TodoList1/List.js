import React from 'react';

const List = props => (
  <ul>
    {
      props.items.map((item, index) => 
      <div>
      <li key={index}>{item.title}</li>
      <li key={index}>{item.dueDate}</li>
      <li key={index}>{item.notes}</li>
      </div>
    )
    }
  </ul>
);

export default List;