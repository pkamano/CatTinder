import { render } from '@testing-library/react'
import React, { Component } from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import CatEdit from "./pages/CatEdit"
import CatIndex from "./pages/CatIndex"
import CatNew from "./pages/CatNew"
import CatShow from "./pages/CatShow"
import Home from "./pages/Home"
import About from "./pages/About"
import FunFacts from './pages/FunFacts.js'
import Contact from './pages/Contact.js'
import NotFound from "./pages/NotFound"
import "./App.css"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  constructor (props){
    super (props)
    this.state = {
      cats: []
    }
  }

  componentDidMount() {
    this.readCat()
  }

  readCat = () => {
    fetch("http://localhost:3000/cats",)
    .then(response => response.json())
    .then(payload => this.setState({cats: payload}))
    .catch(errors => console.log("Cat read errors: ", errors))
  }

  createNewCat = (theNewCatObject) => {
    fetch("http://localhost:3000/cats", {
      body: JSON.stringify(theNewCatObject),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(response => response.json())
    .then(() => this.readCat())
    .catch(errors => console.log("Cat create errors:", errors))
  }

  updateCat = (cat, id) => {
    fetch(`http://localhost:3000/cats/${id}`, {
      body: JSON.stringify(cat),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH"
    })
    .then(response => response.json())
    .then(() => this.readCat())
    .catch(errors => console.log("Cat update errors:", errors))
  }

  deleteCat = (id) => {
    fetch(`http://localhost:3000/cats/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then(response => response.json())
    .then(() => this.readCat())
    .catch(errors => console.log("Cat delete errors:", errors))
  }
 

render () {
  console.log('appjs state:', this.state)
  return (
    <Router>
      <Header />
      <Switch>
      <Route path="/catedit/:id" 
        render={(props) => {
          let id = +props.match.params.id
          let cat = this.state.cats.find(catObject => catObject.id === id)
          return(
           <CatEdit cat={cat} 
          updateCat={this.updateCat} />
          )
        }} />
        <Route path="/catindex" render={(props) => <CatIndex cats={this.state.cats} />} />
        <Route path="/catnew" 
        render={() => {
          return <CatNew createNewCat={this.createNewCat} /> 
        }}/>
        <Route path="/catshow/:id" render={(props) => {
          let id = +props.match.params.id
          let cat = this.state.cats.find(catObject => catObject.id === id)
          return( <CatShow 
          cat={cat}
          deleteCat={this.deleteCat}
           />
            )
          }} />
        <Route path="/about" component={About} />
        <Route path="/funfacts" component={FunFacts} />
        <Route path="/contact" component={Contact} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound}/>

      </Switch>
      <Footer />
    </Router>
  )
}
}


export default App