import React, { Component } from "react";

function greet_user() {
  var today = new Date();
  var h = today.getHours();
  if (h > 4 && h < 12) {
    return "Good morning";
  } else if (h < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <h2 className="text-5xl">{greet_user()}</h2>
      </div>
    );
  }
}

export default Home;
