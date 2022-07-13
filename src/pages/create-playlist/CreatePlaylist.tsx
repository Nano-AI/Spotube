import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate } from "react-router-dom"

const { ipcRenderer } = window.require("electron");

class CreatePlaylist extends Component<{

}, {
  redirect: boolean,
  href: string
}> {
  v: any;
  componentDidMount() {
    this.v = uuidv4();
    this.setState({
      redirect: false,
      href: ""
    });
    ipcRenderer.send("create-playlist", this.v);
  }
  render() {
    ipcRenderer.on("created-playlist", (event: any, arg: any) => {
      // window.location.href = window.location.origin + "/playlist/" + arg;
      this.setState({
        redirect: true,
        href: "/playlist/" + arg
      })
      console.log(window.location.origin + "/playlist/" + arg);
    });
    return <div>{
      this.state && this.state.redirect && <Navigate to={this.state.href} replace={true} />  
    }</div>;
  }
}

export default CreatePlaylist;
