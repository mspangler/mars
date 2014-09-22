
/** @jsx React.DOM */

function getMiles(meters) {
  return meters * 0.000621371192;
}

var Restaurant = React.createClass({
  render: function() {
    return (
      <li>
        <a target="_blank" href={this.props.restaurant.mobile_url}>{this.props.restaurant.name}</a> - {getMiles(this.props.restaurant.distance).toPrecision(2)} miles away
      </li>
    );
  }
});

var RestaurantList = React.createClass({
  render: function() {
    var restaurantNodes = this.props.restaurants.map(function(restaurant) {
      return (
        <Restaurant key={restaurant.id} restaurant={restaurant} />
      );
    });
    return (
      <ul>
        {restaurantNodes}
      </ul>
    );
  }
});

var RestaurantBox = React.createClass({
  getInitialState: function() {
    return {restaurants: []};
  },
  componentDidMount: function() {
    $.getJSON(this.props.url, function(data) {
      this.setState({restaurants: data});
    }.bind(this));
  },
  render: function() {
    return (
      <RestaurantList restaurants={this.state.restaurants} />
    );
  }
});
