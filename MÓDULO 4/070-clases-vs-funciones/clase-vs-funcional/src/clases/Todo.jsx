import { Component } from 'react';
import Tarea from './Tarea';

class TodoClase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nueva: '',
      tareas: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ nueva: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.nueva.trim() !== '') {
      const nuevasTareas = this.state.tareas.concat(this.state.nueva);
      this.setState({
        nueva: '',
        tareas: nuevasTareas
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Lista de tareas en clase</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Nueva tarea:
            <input type="text" value={this.state.nueva} onChange={this.handleChange} />
          </label>
          <button type="submit">Añadir</button>
        </form>
        <ul>
          {this.state.tareas.map((item, index) => (
            <Tarea key={index} titulo={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoClase;