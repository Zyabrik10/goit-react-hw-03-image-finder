import { Component } from 'react';
import PropsType from 'props-type';

export class Button extends Component {
  addMoreHandler = () => {
    this.props.increasePage();
  };

  render() {
    return (
      <button className="Button" onClick={this.addMoreHandler}>
        Load More
      </button>
    );
  }
}

Button.propsType = {
  addImage: PropsType.func,
};
