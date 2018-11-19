import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';
import NumTop from './NumTop';
import NumLeft from './NumLeft';
const Context = React.createContext()

let initialState = {
    paint: false,
    blank: false,
    delete: false,
    result: false,
    pic1: {
        row: 1,
        cell: 5,
        arr: [
            [1,1,1,1,1],
            [1,0,1,0,1],
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,1,1,1,1]
        ],
        numTop: [
            [5],
            [1,1,1],
            [5],
            [1,1,1],
            [5]
        ],
        numLeft: [
            [5],
            [1,1,1],
            [5],
            [1,1],
            [5]
        ]
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        this.setAppState = this.setAppState.bind(this);
        this.check = this.check.bind(this);
        this.clickCell = this.clickCell.bind(this);
        this.clickPaint = this.clickPaint.bind(this);
        this.clickBlank = this.clickBlank.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
    }
    setAppState(newState) {
      this.setState(newState);
    }
    clickPaint(e) {
        this.setState({
            paint: true,
            blank: false,
            delete: false,
        });
    }
    clickBlank(e) {
        this.setState({
            paint: false,
            blank: true,
            delete: false,
        });
    }
    clickDelete(e) {
        this.setState({
            paint: false,
            blank: false,
            delete: true,
        });
    }
    clickCell(e) {
      // console.log( e.currentTarget );
      if ( this.state.paint ) {
          e.currentTarget.classList.add('paint');
          e.currentTarget.classList.remove('blank');
          e.currentTarget.setAttribute('data-type', 1);
      }
      if ( this.state.blank ) {
          e.currentTarget.classList.add('blank');
          e.currentTarget.classList.remove('paint');
          e.currentTarget.setAttribute('data-type', 0);
      }
      if ( this.state.delete ) {
          e.currentTarget.classList.remove('paint');
          e.currentTarget.classList.remove('blank');
          e.currentTarget.removeAttribute('data-type');
      }
    }
    check (e) {
        console.clear();
        var result = false;
        // console.log( e.currentTarget );
        var rows = document.querySelectorAll('.cross__row');
        // console.log( rows );
        outer: for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].querySelectorAll('.cross__cell');
            for (var j = 0; j < cells.length; j++) {
                if ( this.state.pic1.arr[i][j] === parseInt(cells[j].getAttribute('data-type'), 0) ) {
                    // console.log( 'row ' + i + ' | cell ' + j + ' — ' + this.state.pic1.arr[i][j] + ' | ' + parseInt(cells[j].getAttribute('data-type'), 0) + ' = ура' );
                    this.setState({
                        result: true
                    });
                } else {
                    // console.log( 'row ' + i + ' | cell ' + j + ' — ' + this.state.pic1.arr[i][j] + ' | ' + parseInt(cells[j].getAttribute('data-type'), 0) + ' = ура' );
                    this.setState({
                        result: false
                    });
                    break outer;
                }
            }
        }
        document.querySelector('.grid__result').classList.add('active')
        setTimeout(
            function() {
                document.querySelector('.grid__result').classList.remove('active')
            }, 1000
        );
    }

    render() {
        return (
            <Context.Provider value={{ state: this.state, methods: {setAppState: (value) => this.setState(value)}}}>
            <Context.Consumer>{context => (

                <div className="App">
                    <div className="grid">
                        <div className='grid__num-top'>
                            <NumTop context={context} />
                        </div>
                        <div className='grid__num-left'>
                            <NumLeft context={context} />
                        </div>
                        <div className='grid__content'>
                            <div className='cross'>
                                {
                                    this.state.pic1.arr.map(function(row, i) {
                                        return (
                                            <div className='cross__row' key={i} data-index={i}>
                                                <div className='cross__row-inner'>
                                                    {
                                                        row.map(function(cell, j) {
                                                            return (
                                                                <div onClick={this.clickCell} className='cross__cell' data-type='0' data-index={j} key={j}></div>
                                                            );
                                                        }, this)
                                                    }
                                                </div>
                                            </div>
                                        );
                                    }, this)
                                }
                            </div>
                            <div className='btns'>
                                <button className='btn btn_check' onClick={this.check}>CHECK</button>
                                <button className='btn btn_paint' onClick={this.clickPaint}>Закрасить</button>
                                <button className='btn btn_blank' onClick={this.clickBlank}>Крестик</button>
                                <button className='btn btn_delete' onClick={this.clickDelete}>удалить</button>
                            </div>
                            <div className='grid__result'>{this.state.result?'Отлично':'Вы дно!'}</div>
                        </div>
                    </div>

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
