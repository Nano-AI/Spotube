import React, { Component, useEffect } from "react";
// import { SearchIcon, XIcon } from "@heroicons/react/solid";
// import { Search as SearchIcon, X as XIcon } from "react-feather";
import { IoIosClose as XIcon } from "react-icons/io";
import { SongResultsType } from "../../types/VideoResults";
import { FiSearch as SearchIcon } from "react-icons/fi";
import SongsView from "../../components/songs-view/SongsView";
import "./Search.scss";
import SongView from "../../components/song-view/SongView";

class Search extends Component<
  {},
  { typing?: boolean; typingTimeout?: number; searchResults?: SongResultsType }
> {
  // searchQueryRef: React.RefObject<any>;
  private searchQueryRef: React.RefObject<HTMLInputElement>;
  private timeout: any;
  _isMounted = false;

  constructor(props: any) {
    super(props);
    this.searchQueryRef = React.createRef();
    this.timeout = 0;
    this.state = {
      typing: false,
      typingTimeout: 0,
      searchResults: undefined,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const electron = window.require("electron");
    electron.ipcRenderer.on("search-results", (event: any, arg: any) => {
      if (this._isMounted) {
        console.log(arg);
        this.setState({
          searchResults: arg,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  doSearch(evt: any) {
    // Code for searching a query with a delay of 1000ms
    const electron = window.require("electron");
    var searchText = evt.target.value;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log("Searching for: " + searchText);
      electron.ipcRenderer.send("search", searchText);
    }, 1000);
  }

  render() {
    // When we get the search event from the main process, we want to focus the search input
    console.log(this.state.searchResults);
    return (
      <div>
        {/* Search bar at the top of the page */}
        <div className="flex flex-wrap items-stretch mb-4 relative w-80">
          <div className="flex -mr-px">
            <span className="search-icon rounded-full rounded-r-none px-2">
              <SearchIcon className="text-searchbar-text w-5 h-5  py-0" />
            </span>
          </div>
          <input
            type="text"
            ref={this.searchQueryRef}
            className="px-0 outline-0 border-0 text-searchbar-text bg-searchbar flex-shrink flex-grow leading-normal w-px flex-1 h-10 border-grey-light relative"
            placeholder="Search for a song"
            onChange={(evt) => this.doSearch(evt)}
            onKeyDown={(evt: any) => {
              if (evt.code === "Enter") {
                const electron = window.require("electron");
                console.log(evt);
                electron.ipcRenderer.send("search", evt.target.value);
              }
            }}
          />
          <div className="flex -mr-px">
            <span className="search-icon rounded-full rounded-l-none pl-1 pr-2 ">
              <button
                onClick={() => {
                  if (this.searchQueryRef.current != null) {
                    this.searchQueryRef.current.value = "";
                    this.setState({ searchResults: undefined });
                  }
                }}
              >
                <XIcon className="text-searchbar-text w-5 h-5  py-0" />
              </button>
            </span>
          </div>
        </div>
        {/* Display the actual songs by Top result and Songs */}
        <div>
          {
            // If we have results, show them
            this.state.searchResults ? (
              <div className="flex">
                <div className="w-1/4 h-full">
                  <h3 className="title">Top result</h3>
                  <div>
                    <SongView
                      topResult={true}
                      songObj={this.state.searchResults[0]}
                      playButton={true}
                    />
                  </div>
                </div>
                <div className="align-top h-full w-3/4 pl-5">
                  <h3 className="title">Songs</h3>
                  {/* Made this reusable because of playlists and such */}
                  <SongsView
                    searchResults={this.state.searchResults}
                    cutOff={0}
                  />
                </div>
              </div>
            ) : (
              ""
            )
          }
        </div>
      </div>
    );
  }
}

export default Search;
