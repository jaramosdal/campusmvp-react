import { Component } from 'react';

class Tarea extends Component {
  render() {
    const { titulo, descripcion } = this.props;
    return (
      <li>
        <strong>{titulo}</strong>
        <p>{descripcion}</p>
      </li>
    );
  }
}

export default Tarea;