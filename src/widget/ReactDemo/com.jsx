require('./style.scss');
import React from 'react';
import $ from 'jquery';

export default class ReactRender extends React.Component {

  constructor(props) {
    super(props);
    var list = [];
    $.extend(list, this.props.list);
    this.state = {
      list: list
    }
  }
  
  render() {
    var list = this.state.list.map(function(value){
      return <p key={value}>{value}</p>;
    });
    return (
      <div>
        <h1 className="bbccdd" onClick={this.clickHandler}>
          哈哈{new Date().toLocaleDateString()}哈
        </h1>
        <p>PPPP</p>
        {list}
      </div>
    );
  }

  clickHandler = (e) => {
    var $ts = $(e.currentTarget);
    this.state.list.unshift(4);
    this.setState({
      list: this.state.list
    });
    // this.props.changeList();
    // this.props.list.push(4);
    // this.props.list = [];
  };

  componentDidMount() {
    var ts = this;
    $('p').click(function () {
      ts;
      debugger
    })
  }
}
