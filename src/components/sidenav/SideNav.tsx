import React, { Component, MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";
import { TiHome as HomeIcon } from "react-icons/ti";
import { VscLibrary as LibraryIcon } from "react-icons/vsc";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { RiAddBoxFill as PlusCircleIcon } from "react-icons/ri";
import "./SideNav.scss";
import { AiOutlineImport } from "react-icons/ai";
const { ipcRenderer } = window.require("electron");

class SideNavComponent extends Component<{
  name: string;
  href?: string;
  icon?: JSX.Element;
  selected?: boolean;
  onClick?: React.MouseEvent<HTMLDivElement, MouseEvent>
} ,{
}> {
  render() {
    const filler: any = () => {
      
    };
    return (
      <NavLink
        to={this.props.href ? this.props.href : "#"}
        draggable="false"
        className={(navData) =>
          "block py-2 px-4 text-left text-url-text hover:text-url-hover visited:text-url-text" +
          // Add selected class if props.selected is not undefined or true
          (navData.isActive && this.props.href ? " selected" : "")
        }
        // onClick={this.props.onClick ? this.props.onClick : () => null}
        onClick={this.props.onClick ? this.props.onClick : filler}
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

class SideNav extends Component<{ 
  className?: string
}, {
  url?: string;
  import_popup?: string;
}> {
  componentDidMount() {
    this.setState({
      import_popup: "hidden -z-50",
      url: ""
    })
  }
  render() {
    const toggleImport: any = () => {
      console.log("popup")
      this.setState({
        import_popup:
          this.state.import_popup == "" ? "hidden -z-50" : ""
      });
    };
    const importPlaylist = (url: string | null | undefined) => {
      // let url = document.getElementById("playlistTitleInput");
      toggleImport();
      ipcRenderer.send("import-playlist", this.state.url);
    };
    return (
      <div className="relative min-h-screen flex">
        <div className={"relative rounded-lg shadow dark:bg-gray-700 bg-playlist-edit-background " + ((this.state) ? this.state.import_popup : "")}>
          <div className="items-center justify-center">
            <div className="py-6 px-6 lg:px-8" id="edit-box">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 "
                data-modal-toggle="authentication-modal"
                onClick={() => {
                  // console.log(this.state.edit_hidden);
                  toggleImport();
                }}
              >
                <svg
                  className="w-5 h-5 text-playlist-edit-field-text"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <h3 className="mb-4 text-xl font-medium text-playlist-edit-field-text">
                Import Playlist
              </h3>
              <div className="">
                <div className="inline-block align-bottom justify-center ml-5">
                  <div className="relative">
                    <input
                      type="text"
                      id="playlistTitleInput"
                      className="mb-4 text-playlist-edit-field-text bg-playlist-edit-field block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={(e) => {
                        this.setState({
                          url: e.target.value
                        })
                      }}
                    />
                    <label
                      htmlFor="playlistTitleInput"
                      className="text-playlist-edit-field-text absolute text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      id="spotify-url-input"
                    >
                      Spotify/YouTube URL
                    </label>
                  </div>
                </div>
                <button
                  className="focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center justify-end block bg-soundbar-dot text-playlist-edit-field-text px-2 py-1 mt-0"
                  onClick={() => {
                    let url = document.getElementById("playlistTitleInput")?.nodeValue;
                    console.log(url)
                    importPlaylist(url);
                  }}
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-sidebar-background w-60">
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
            <SideNavComponent
              name="Import Playlist"
              icon={<AiOutlineImport className="w-full h-full" />}
              onClick={toggleImport}
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
