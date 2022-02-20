import { Component, LegacyRef, useRef } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTags, { ClassNames, SuggestionComponentProps, Tag, TagComponentProps } from 'react-tag-autocomplete';

type SearchBarProps = {
  title: string,
  onGenerate: (query: string) => void;
}

type SearchBarState = {
  "tags": Tag[],
  "suggestions": Tag[]
}

type UpdatedClassNames = {
  
  root: string,
  rootFocused: string,
  selected: string,
  selectedTag: string,
  selectedTagName: string,
  search: string,
  searchWrapper: string,
  searchInput: string,
  suggestions: string,
  suggestionActive: string,
  suggestionDisabled: string,
  suggestionPrefix: string
  
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {

  reactTags: LegacyRef<ReactTags>;
  classNames: UpdatedClassNames;
  hasInput : () => boolean;
  genButton : () => JSX.Element;
  searchTags : () => JSX.Element;

  constructor(props: SearchBarProps) {
    super(props)

    this.state = {
      tags: [],
      suggestions: [
        { id: 3, name: "History" },
        { id: 4, name: "U.S. History" },
        { id: 5, name: "European History" },
        { id: 6, name: "Computer Science" },
        { id: 7, name: "Java Programming Language" },
        { id: 8, name: "CU Boulder" },
        { id: 9, name: "Geology" },
        { id: 10, name: "Hackathons" },
        { id: 11, name: "English Grammar" },
        { id: 12, name: "Geography" },
        { id: 13, name: "Asian History" },
        { id: 14, name: "3rd grade grammar" },
      ],
    }

    this.reactTags = React.createRef()

    this.classNames = {
      root: 'flex-grow w-100 p-5',
      rootFocused: 'is-focused',
      selected: 'react-tags__selected',
      selectedTag: 'react-tags__selected-tag',
      selectedTagName: 'react-tags__selected-tag-name',
      search: 'w-100 ',
      searchWrapper:'w-full m-auto',
      searchInput: 'w-full flex-row bg-purple-100 p-3 mt-4 mr-2 border-2 border-purple-800',
      suggestions: 'w-full askawaiSuggestion',
      suggestionActive: 'w-full',
      suggestionDisabled: 'w-full',
      suggestionPrefix: 'w-full'
      
    }

    

    this.hasInput = ()=> {
      if(this.state.tags.length > 0)
      {
        return true
      }
      else
      {
        return false
      }
    }

    this.genButton = () => {
      if(this.hasInput()){
        return <button onClick={()=>{this.props.onGenerate(this.state.tags[0].name)}} className="flex-row bg-grape hover:bg-white h-full text-white hover:text-purple-500 font-bold py-3.5 px-4 m-5 mr-5 rounded ">Generate</button>
      }
      else{
        return <p className="flex-row bg-white h-full text-purple-600 font-bold py-3.5 px-4 mb-3 mr-5 rounded ">Please enter a search term!</p>
      }
    
    }

    this.searchTags = () => {
      if(!this.hasInput()){
        return <ReactTags
        ref={this.reactTags}
        tags={this.state.tags}
        suggestions={this.state.suggestions}
        onDelete={this.onDelete.bind(this)}
        onAddition={this.onAddition.bind(this)}
        tagComponent={TagComponent} 
        suggestionComponent={SuggestionComponent}
        classNames={this.classNames}
        autoresize={false}
        placeholderText={"Search for your class topic..."}
       />
      }else{
        return <>
        <p className="text-black text-xl text-center">Topic Selected</p>
        <p className="text-center text-purple-500 text-5xl" 
          onClick={()=>{this.setState({"tags":[]});}}>
            {this.state.tags[0].name}
            <small className="ml-5 text-black text-lg shadow-lg">X</small>
        </p>
        </>
      }
      
    }
  
    

    
  }

  

  onDelete(i: number) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  onAddition(tag: Tag) {
    const newState: SearchBarState = {
      "tags": [tag],
      "suggestions": this.state.suggestions
    }
    this.setState(newState);
  }

  render() {
    return (<>
    
      
    <this.searchTags></this.searchTags>
    <div className="flex flex-auto"> 
      <div className="flex-grow"></div>
      <this.genButton></this.genButton>
      <div className="flex-grow"></div>
    </div>
       </>)
  }
}

function TagComponent(props : TagComponentProps) {
  return (
    <div>
      <p>Topic Selection:</p>
      <button className="btn btn-primary bg-purple-100 rounded-lg shadow-lg p-2 m-2" type='button' title={`${props.removeButtonText}: ${props.tag.name}`} onClick={props.onDelete}>
          {props.tag.name}<b className="p-2"></b>
      </button>
    </div>
  )
}

function SuggestionComponent (props: SuggestionComponentProps) {
  return (
    <span id={""+props.item.id} className="btn btn-primary bg-purple-100 rounded-lg shadow-lg p-2 m-2">
      {props.item.name}
    </span>
  )
}


export default SearchBar