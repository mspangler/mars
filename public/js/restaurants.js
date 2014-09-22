
/** @jsx React.DOM */

function getMiles(meters) {
  return (meters * 0.000621371192).toPrecision(2);
}

var Restaurant = React.createClass({
  render: function() {
    return (
      <li>
        <a target="_blank" href={this.props.restaurant.mobile_url}>{this.props.restaurant.name}</a> - {getMiles(this.props.restaurant.distance)} miles away
      </li>
    );
  }
});

var RestaurantList = React.createClass({
  loadRestaurantsFromServer: function() {
    $.getJSON(this.props.url, function(data) {
      this.setState({restaurants: data});
    }.bind(this));
  },
  getInitialState: function() {
    return {restaurants: []};
  },
  componentDidMount: function() {
    this.loadRestaurantsFromServer();
  },
  render: function() {
    var restaurantNodes = this.state.restaurants.map(function(restaurant) {
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
