var React    = require('react'),
    ReactDOM = require('react-dom');

var Layout = React.createClass({
  render: function(){
    return (
      <h1>Hello</h1>
    )
  }
});

ReactDom.render(<Layout/>, document.getElementById('app'));
