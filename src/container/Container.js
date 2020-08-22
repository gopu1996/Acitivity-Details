import React, { Component } from "react";
import MemberDetails from "../component/MemberDetails";
import Header from "../component/Header";

export class Container extends Component {
  render() {
    return (
      <div>
        <Header />
        <MemberDetails />
      </div>
    );
  }
}

export default Container;
