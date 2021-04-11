import React, { Component } from 'react'
import './App.css'
import Colors from './components/Screens/Colors'
import Search from './components/Components/Search'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Colorpicker from './components/Screens/Colorpicker'
import Gradients from './components/Screens/Gradients'
import Navbar from './components/Components/Navbar'
import Footer from './components/Components/Footer'
import Palettediv from './components/Components/Palettediv'
import Maintemp from './components/Screens/Maintemp'
import Development from './components/Screens/Development'
import bgGradientData from './components/bgGradientData'
import colorcoll from './components/colorcoll'
import Palletes from './components/Palletes'

class App extends Component {
  state = {
    collection: [],
    gradientscollection: [],
    palettescollection: [],
    loading: false,
    mode: true,
    palettefortemp: {
      color1: '',
      color2: '',
      color3: '',
      color4: '',
    },
  }
  componentDidMount() {
    this.setState({ loading: true })
    this.setState({
      palettescollection: Palletes,
      loading: false,
    })
  }
  filterMethod = (value) => {
    this.setState({ loading: true })
    const res = colorcoll.filter((item) => item.category == value)
    this.setState({ collection: res, loading: false })
  }
  changeMode = (modevalue) => {
    this.setState({ mode: modevalue })
  }
  temppalette = (color1, color2, color3, color4) => {
    this.setState({
      palettefortemp: { color1, color2, color3, color4 },
    })
  }
  trigerColors = () => {
    if (this.state.collection.length === 0) {
      const trigerColorsdata = async () => {
        this.setState({ loading: true })
        this.setState({ collection: colorcoll, loading: false })
      }
      trigerColorsdata()
    }
  }
  allColors = () => {
    this.setState({ loading: true })
    this.setState({ collection: colorcoll, loading: false })
  }
  trigerGradients = () => {
    if (this.state.gradientscollection.length === 0) {
      const trigerGradientsdata = async () => {
        this.setState({ loading: true })
        this.setState({
          gradientscollection: bgGradientData,
          loading: false,
        })
      }
      trigerGradientsdata()
    }
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <div className='container-fluid p-0 m-0'>
            <Navbar changeMode={this.changeMode} mode={this.state.mode} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <>
                    {' '}
                    <Colorpicker mode={this.state.mode} />
                    <Footer />
                  </>
                )}
              />
              <Route
                exact
                path='/colors'
                render={(props) => (
                  <>
                    <Search
                      filterMethod={this.filterMethod}
                      allColors={this.allColors}
                    ></Search>
                    <Colors
                      collection={this.state.collection}
                      loading={this.state.loading}
                      trigerColors={this.trigerColors}
                    >
                      <Footer />
                    </Colors>
                  </>
                )}
              />
              <Route
                exact
                path='/gradients'
                render={(props) => (
                  <>
                    <Gradients
                      gradientcollection={this.state.gradientscollection}
                      loading={this.state.loading}
                      trigerGradients={this.trigerGradients}
                    >
                      <Footer />
                    </Gradients>
                  </>
                )}
              />
              <Route
                exact
                path='/palettes'
                render={(props) => (
                  <>
                    <div className='left  p-xl-4 p-0'>
                      {this.state.palettescollection.map((item) => (
                        <Palettediv
                          loading={this.state.loading}
                          key={item._id}
                          item={item}
                          temppalette={this.temppalette}
                        ></Palettediv>
                      ))}
                    </div>
                    <div className='right '>
                      <Maintemp
                        palettefortemp={this.state.palettefortemp}
                      ></Maintemp>
                      <Footer />
                    </div>
                  </>
                )}
              />
              <Route exact path='/development' component={Development} />
              {/* <Redirect to='/' /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </>
    )
  }
}

export default App
