import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { TiHome as HomeIcon } from "react-icons/ti";
import { VscLibrary as LibraryIcon } from "react-icons/vsc";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { RiAddBoxFill as PlusCircleIcon } from "react-icons/ri";
import "./SideNav.scss";

class SideNavComponent extends Component<{
  name: string;
  href: string;
  icon?: JSX.Element;
  selected?: boolean;
}> {
  render() {
    return (
      <NavLink
        to={this.props.href}
        draggable="false"
        className={(navData) =>
          "block py-2 px-4 text-left text-url-text hover:text-url-hover visited:text-url-text" +
          // Add selected class if props.selected is not undefined or true
          (navData.isActive ? " selected" : "")
        }
      >
        <div className="">
          {/* Add Icon if it's defined */}
          {this.props.icon ? (
            <div className="align-top h-6 w-6 inline-block mr-3 content-center">
              {this.props.icon}
            </div>
          ) : undefined}
          <div className="align-bottom inline-block content-center text-sm font-bold">
            {this.props.name}
          </div>
        </div>
      </NavLink>
    );
  }
}

class SideNav extends Component<{ className?: string }> {
  render() {
    return (
      <div className="relative min-h-screen flex">
        <div className="bg-sidebar-background text-zinc-100 w-56">
          <nav className="m-2">
            <div className="mt-title-bar"></div>
            <SideNavComponent
              href="/"
              name="Home"
              icon={<HomeIcon className="w-full h-full" />}
              selected={true}
            />
            <SideNavComponent
              href="/search"
              name="Search"
              icon={<SearchIcon className="w-full h-full" />}
            />
            <SideNavComponent
              href="/library"
              name="Your Library"
              icon={<LibraryIcon className="w-full h-full" />}
            />
            <div className="py-2"></div>
            <SideNavComponent
              href="/create-playlist"
              name="Create Playlist"
              icon={<PlusCircleIcon className="w-full h-full" />}
            />
          </nav>
        </div>
        <div className="flex-1 p-10 text-2x1 text-base">
          <div className={this.props.className}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default SideNav;
