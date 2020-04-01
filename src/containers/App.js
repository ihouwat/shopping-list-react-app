import React, { Component } from 'react';
import './App.css';
// Import Components
import SearchArea from '../components/SearchArea';
import GroceryList from '../components/GroceryList';
import CompletedList from '../components/CompletedList';
import EmptyList from '../components/EmptyList';
import TopNavigation from '../components/TopNavigation';
import FixedScroll from '../components/FixedScroll';
// Import Material Design UI Custom Theme API
import {  Box } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Material Design UI theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(0,0,0,.54)',
    }
  },
  spacing: 8,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formfield: '',
      items: [],
      completeditems: [],
    }
    this.onCompleteItem = this.onCompleteItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onRecoverItem = this.onRecoverItem.bind(this);
  }

  // Methods

  addNewToGroceries = (item) => {
    this.setState({items: this.state.items.concat(item)})
  }

  // Listen to search area input
  onFormChange = (event) => {
    this.setState({formfield: event.target.value})
  }

  // On 'enter' add grocery item
  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.formfield === '') {
      return;
    }
    const newItem = this.state.formfield.charAt(0).toUpperCase(0) + this.state.formfield.slice(1);
    this.setState({items: this.state.items.concat(newItem)})
    this.setState({formfield: ''})
  }

  // Complete acquiring grocery
  onCompleteItem = (completedItem) => {
    this.setState({completeditems: this.state.completeditems.concat(completedItem)});
    this.setState({items: this.state.items.filter(completed => completed !== completedItem )})
  }

  // Delete item from list
  onDeleteItem = (deletedItem, list) => {
    this.setState({[list]: this.state.items.filter(deleted => deleted !== deletedItem)});
  }

  onRecoverItem = (item) => {
    this.addNewToGroceries(item)
    this.setState({completeditems: this.state.completeditems.filter(deleted => deleted !== item)});
  }


  // Render
  render () {
    const { formfield, items, completeditems } = this.state;
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <FixedScroll>
            <TopNavigation
              addFave = {this.addNewToGroceries}
            />
          </FixedScroll>
          <Box pt={11} maxWidth={600} mx={'auto'}>
            <Box mr={2} ml={2} pt={1.5} className={'White-container'}>
              <SearchArea
                formChange = {this.onFormChange}
                formSubmit = {this.onFormSubmit}
                formfield = {formfield}
              />
              <GroceryList 
                groceryItems = { items } 
                completeItem = {this.onCompleteItem}
                deleteItem = {this.onDeleteItem}
              />
            </Box>
            <Box mr={2} ml={2}>
              { items.length === 0 && completeditems.length === 0 && <EmptyList /> }
              <CompletedList 
                completedItems = { completeditems }
                deleteItem = {this.onDeleteItem}
                recoverItem = {this.onRecoverItem}
              />
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
