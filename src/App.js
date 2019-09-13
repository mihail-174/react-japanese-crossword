import React, { Component } from 'react';
import './App.css';
import Size from './Size/Size';
import List from './List/List';
import Cross from './Cross/Cross';
import Settings from './Settings/Settings';

const Context = React.createContext()

let initialState = {
    selectedSize: 'small',
    selectedCross: null,
    selectedCrossName: null,
    selectedCrossChange: false,
    selectedCrossTime: {
        h: 0,
        m: 0,
        s: 0
    },
    selectedCrossData: null,
    modal: false,
    settingGuideLines: true,
    settingHideNames: true,
    settingMarkerEmptyCells: false,
    paintSuper: true,
    paint: false,
    blank: false,
    delete: false,
    result: false,
    numTop: [],
    numLeft: [],
    size: [
        {
            systemName: 'small',
            name: 'Маленькие'
        },
        {
            systemName: 'medium',
            name: 'Средние'
        },
        {
            systemName: 'big',
            name: 'Большие'
        }
    ],
    small: [
        {
            id: 0,
            name: 'smile',
            width: 5,
            height: 5,
            arr: [
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,1,1,1,1]
            ]
        },
        {
            id: 1,
            name: 'раз',
            width: 10,
            height: 5,
            arr: [
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,1,1,1,1]
            ]
        },
        {
            id: 2,
            name: 'два',
            width: 10,
            height: 5,
            arr: [
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,1,1,1,1]
            ]
        }
    ],
    medium: [
        {
            id: 0,
            name: 'batman',
            width: 5,
            height: 5,
            arr: [
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ]
        }
    ],
    big: [
        {
            id: 0,
            name: 'Кораблик',
            width: 10,
            height: 10,
            arr: [
                [1,1,0,0,1,0,0,0,0,0],
                [1,0,0,0,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1],
                [0,0,0,0,1,1,1,1,0,0],
                [0,0,0,0,1,1,1,1,1,0],
                [0,0,0,0,1,1,1,1,1,1],
                [0,0,0,0,1,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1],
                [0,1,0,0,0,0,0,0,1,0],
                [0,0,1,1,1,1,1,1,0,0]
            ]
        },
        {
            id: 2,
            name: 'Бэтмен',
            width: 10,
            height: 10,
            arr: [
                [1,1,0,0,1,0,0,0,0,0],
                [1,0,0,0,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1],
                [0,0,0,0,1,1,1,1,0,0],
                [0,0,0,0,1,1,1,1,1,0],
                [0,0,0,0,1,1,1,1,1,1],
                [0,0,0,0,1,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1],
                [0,1,0,0,0,0,0,0,1,0],
                [0,0,1,1,1,1,1,1,0,0]
            ]
        }
    ],
    images: {
        img0: {
            name: 'smile',
            width: 5,
            height: 5,
            size: 'small',
            arr: [
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,1,1,1,1]
            ]
        },
        img1: {
            name: 'batman',
            width: 5,
            height: 5,
            size: 'medium',
            arr: [
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ]
        },
        img2: {
            name: 'Кораблик',
            width: 10,
            height: 10,
            size: 'big',
            arr: [
                [1,1,0,0,1,0,0,0,0,0],
                [1,0,0,0,1,1,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1],
                [0,0,0,0,1,1,1,1,0,0],
                [0,0,0,0,1,1,1,1,1,0],
                [0,0,0,0,1,1,1,1,1,1],
                [0,0,0,0,1,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1],
                [0,1,0,0,0,0,0,0,1,0],
                [0,0,1,1,1,1,1,1,0,0]
            ]
        }
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        this.setAppState = this.setAppState.bind(this);
        this.returnBackList = this.returnBackList.bind(this);
    }
    returnBackList() {
        this.setState({
            selectedCross: null,
            selectedCrossName: null,
            selectedCrossChange: false,
            selectedCrossData: null,
            selectedCrossTime: {
                h: 0,
                m: 0,
                s: 0
            },
            numTop: null,
            numLeft: null,
            paint: false,
            blank: false,
            delete: false
        })
    }
    setAppState(newState) {
      this.setState(newState);
    }

    render() {
        return (
            <Context.Provider value={{ state: this.state, methods: {setAppState: (value) => this.setState(value)}}}>
            <Context.Consumer>{context => (

                <div className="App">
                    <h1>Японские кроссворды</h1>
                    {
                        this.state.selectedCross !== null
                        &&
                            <div className='return-back-list' onClick={this.returnBackList}>Вернуться к списку</div>
                    }
                    {
                        this.state.selectedCross === null
                        &&
                            <div>
                                <Size context={context} />
                                <List context={context} />
                            </div>
                    }
                    {
                        this.state.selectedCrossData !== null
                        &&
                        <Cross context={context} />
                    }
                    <Settings context={context} />

                    {
                        <pre>
                        {JSON.stringify(this.state, "", 4)}
                        </pre>
                    }
                </div>

            )}</Context.Consumer>
            </Context.Provider>

        );
    }
    componentDidMount() {
        this.setState({
            ...initialState
            // data: this.props.data
        });
    }
}

export default App;
