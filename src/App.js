import React, { Component } from 'react';
import './App.css';
import Size from './Size/Size';
import List from './List/List';
import Panel from './Panel/Panel';
import Grid from './Grid/Grid';
import Settings from './Settings/Settings';

const Context = React.createContext()

function importFilesCross(r) {
    return r.keys().map(r);
}

let initialState = {
    settingGuideLines: true,
    settingHideNames: true,
    settingQuickDraw: true,
    // settingMarkerEmptyCells: false,
    // btnDrawQuick: true,
    btnDraw: false,
    btnEmpty: false,
    btnClean: false,
    selectedSize: 'all',
    selectedType: null,
    selectedCross: null,
    selectedCrossName: null,
    selectedCrossChange: false,
    selectedCrossTime: {
        h: 0,
        m: 0,
        s: 0
    },
    selectedCrossTimerId: null,
    selectedCrossData: null,
    modal: false,
    result: false,
    numTop: [],
    numLeft: [],
    size: [
        {
            systemName: 'all',
            name: 'Все'
        },
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
    crossList: []
    // small: [
    //     {
    //         id: 0,
    //         name: 'smile',
    //         width: 5,
    //         height: 5,
    //         arr: [
    //             [1,1,1,1,1],
    //             [1,0,1,0,1],
    //             [1,1,1,1,1],
    //             [1,0,0,0,1],
    //             [1,1,1,1,1]
    //         ]
    //     },
    //     {
    //         id: 1,
    //         name: 'раз',
    //         width: 10,
    //         height: 5,
    //         arr: [
    //             [1,1,1,1,1],
    //             [1,0,1,0,1],
    //             [1,1,1,1,1],
    //             [1,0,0,0,1],
    //             [1,1,1,1,1]
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: 'Смайлик',
    //         width: 10,
    //         height: 5,
    //         arr: [
    //             [1,1,1,1,1],
    //             [1,0,1,0,1],
    //             [1,1,1,1,1],
    //             [1,0,0,0,1],
    //             [1,1,1,1,1]
    //         ]
    //     }
    // ],
    // medium: [
    //     {
    //         id: 0,
    //         name: 'batman',
    //         width: 5,
    //         height: 5,
    //         arr: [
    //             [1,0,0,0,1],
    //             [1,1,1,1,1],
    //             [1,0,1,0,1],
    //             [1,1,1,1,1],
    //             [1,1,1,1,1]
    //         ]
    //     }
    // ],
    // big: [
    //     {
    //         id: 0,
    //         name: 'Кораблик',
    //         width: 10,
    //         height: 10,
    //         arr: [
    //             [1,1,0,0,1,0,0,0,0,0],
    //             [1,0,0,0,1,1,0,0,0,0],
    //             [0,0,0,0,1,1,1,1,1,1],
    //             [0,0,0,0,1,1,1,1,0,0],
    //             [0,0,0,0,1,1,1,1,1,0],
    //             [0,0,0,0,1,1,1,1,1,1],
    //             [0,0,0,0,1,0,0,0,0,0],
    //             [1,1,1,1,1,1,1,1,1,1],
    //             [0,1,0,0,0,0,0,0,1,0],
    //             [0,0,1,1,1,1,1,1,0,0]
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: 'Бэтмен',
    //         width: 10,
    //         height: 10,
    //         arr: [
    //             [1,1,0,0,1,0,0,0,0,0],
    //             [1,0,0,0,1,1,0,0,0,0],
    //             [0,0,0,0,1,1,1,1,1,1],
    //             [0,0,0,0,1,1,1,1,0,0],
    //             [0,0,0,0,1,1,1,1,1,0],
    //             [0,0,0,0,1,1,1,1,1,1],
    //             [0,0,0,0,1,0,0,0,0,0],
    //             [1,1,1,1,1,1,1,1,1,1],
    //             [0,1,0,0,0,0,0,0,1,0],
    //             [0,0,1,1,1,1,1,1,0,0]
    //         ]
    //     }
    // ]
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
            selectedType: null,
            selectedCrossName: null,
            selectedCrossChange: false,
            selectedCrossData: null,
            selectedCrossTime: {
                h: 0,
                m: 0,
                s: 0
            },
            numTop: [],
            numLeft: [],
            btnDraw: false,
            btnEmpty: false,
            btnClean: false
        })
    }

    setAppState(newState) {
      this.setState(newState);
    }

    render() {
        return (
            <Context.Provider value={{ state: this.state, methods: {setAppState: (value) => this.setState(value)}}}>
            <Context.Consumer>{context => (

                <div className="app">
                    <h1 className='app__title'>Японские кроссворды</h1>
                    {
                        this.state.selectedCross !== null
                        &&
                            <div className='return-back-list' onClick={this.returnBackList}>Вернуться к списку</div>
                    }
                    {
                        JSON.parse(localStorage.getItem('cross_' + this.state.selectedType + '_id-' + this.state.selectedCross + '_done'))
                        &&
                            <div className='message'>
                                <b>Поздравляем!</b><br/>
                                Вы выполнили "{this.state.selectedCrossName}" за {String(this.state.selectedCrossTime.h).padStart(2, "0") + ':' + String(this.state.selectedCrossTime.m).padStart(2, "0") + ':' + String(this.state.selectedCrossTime.s).padStart(2, "0")}
                            </div>
                    }
                    {
                        this.state.selectedCross !== null
                        &&
                            <Panel context={context} />
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
                        <Grid context={context} />
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
            ...initialState,
            crossList: importFilesCross( require.context('./files/', true, /\.json$/) )
        });
    }

}

export default App;
