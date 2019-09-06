import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';
import NumTop from './NumTop';
import NumLeft from './NumLeft';
const Context = React.createContext()

let initialState = {
    selected: 0,
    paint: false,
    blank: false,
    delete: false,
    result: false,
    numTop: [],
    numLeft: [],
    images: {
        img0: {
            id: 0,
            name: 'smile',
            arr: [
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,1,1,1,1]
            ]
        },
        img1: {
            id: 1,
            name: 'batman',
            arr: [
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [1,1,1,1,1]
            ]
        },
        img2: {
            id: 2,
            name: 'Кораблик',
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
        this.check = this.check.bind(this);
        this.clickCell = this.clickCell.bind(this);
        this.clickPaint = this.clickPaint.bind(this);
        this.clickBlank = this.clickBlank.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
        this.clickSelectCross = this.clickSelectCross.bind(this);
    }
    setAppState(newState) {
      this.setState(newState);
    }
    clickSelectCross(e) {
        // console.log( e.currentTarget );
        // console.log( e.currentTarget.getAttribute('value') );
        let selectedImg = parseInt(e.currentTarget.getAttribute('value'),0);
        this.setState({
            selected: parseInt(e.currentTarget.getAttribute('value'),0)
        })
        document.querySelectorAll('.cross__cell').forEach(function(item){
            item.classList.remove('paint');
            item.classList.remove('blank');
            item.removeAttribute('data-type');
        })

        // ВЫВОДИМ В ЛЕВУЮ КОЛОНКУ КОЛИЧЕСТВО ЗАКРАШИВАЕМЫХ КЛЕТОК
        function printNumLeft(this2) {
            let newarrRow = []
            let newarrValues = []
            let a = 0;
            // console.log('строк в массиве = ' + this.state.images['img' + this.state.selected].arr.length);
            this2.state.images['img' + selectedImg].arr.map((row, i) => {
                // console.group('СТРОКА #' + i);
                // console.log(row);
                row.map((value, j) => {
                    // console.log('цикл #' + j);
                    if ( value !== 0 ) {
                        // console.log(value + ' != 0');
                        a += value;
                        if ( j + 1 === row.length ) {
                            // console.log('значений в массиве = ' + row.length);
                            // console.log( '*** КОНЕЦ МАССИВА ***' );
                            newarrValues.push(a);
                            a = 0;
                            // console.log('записали в новый массив количество единиц = ' + a);
                        }
                    } else {
                        // console.log(value + ' == 0');
                        if ( a !== 0 ) {
                            newarrValues.push(a);
                            a = 0;
                            // console.log('записали в новый массив количество единиц = ' + a);
                        }
                    }
                    // newarrValues = [];
                });
                // console.log(newarrValues);
                newarrRow.push(newarrValues);
                newarrValues = [];
                // console.groupEnd();
            });
            // console.log(newarrValues);
            // console.log(newarrRow);
            this2.setState({
                numLeft: newarrRow
            })
            // РАБОЧИЙ ПРИМЕР С ОДНОМЕРНЫМ МАССИВОМ
            // let newarr = []
            // let a = 0;
            // console.log('длина массива = ' + arr.length);
            // const my2 = arr.map((value, i) => {
            //     console.log('цикл #' + i);
            //     if ( arr[i] !== 0 ) {
            //         console.log(arr[i] + ' != 0');
            //         a += arr[i];
            //         if ( i + 1 === arr.length ) {
            //             console.log( 'конец массива' );
            //             newarr.push(a);
            //         }
            //     } else {
            //         console.log(arr[i] + ' == 0');
            //         if ( a !== 0 ) {
            //             newarr.push(a);
            //         }
            //         console.log('записали в новый массив количество единиц = ' + a);
            //         a = 0;
            //     }
            // });
            // console.log(newarr);
        }
        printNumLeft(this);
        // КОНЕЦ








        // ВЫВОДИМ В ВЕРХНЮЮ КОЛОНКУ КОЛИЧЕСТВО ЗАКРАШИВАЕМЫХ КЛЕТОК
        function printNumTop(this2) {
            let newArrRow = []
            let newArrValues = []
            let a = 0;
            // let j = 1;
            // console.log('строк в массиве = ' + arr.length);
            let arr = this2.state.images['img' + selectedImg].arr;
            for (var i = 0; i < arr[0].length; i++) {
                // console.group('************* GROUP *************');
                // console.log( arr );
                for (var key in arr) {
                    // console.group('ЦИКЛ #' + key);
                    if ( arr[key][i] !== 0 ) {
                        // console.log(arr[key][i] + ' != 0');
                        a += arr[key][i];
                        // console.log( key );
                        // console.log( parseInt(key) + 1 );
                        // console.log( arr.length );
                        if ( parseInt(key) + 1 === arr.length ) {
                            // console.log('+');
                            newArrValues.push(a);
                            a = 0;
                            // console.log(newArrValues);
                        }
                    } else {
                        // console.log(arr[key][i] + ' == 0');
                        if ( a !== 0 ) {
                            newArrValues.push(a);
                            a = 0;
                            // console.log('записали в новый массив количество единиц = ' + a);
                        }
                    }
                    // console.groupEnd();
                }
                // console.log('записали в новый массив количество единиц = ' + a);
                // a = 0;
                // console.log(newArrValues);
                newArrRow.push(newArrValues);
                newArrValues = [];
                // console.groupEnd();
            }
            // console.log(newArrRow);
            this2.setState({
                numTop: newArrRow
            })
        }
        printNumTop(this);
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
                if ( this.state.images['img' + this.state.selected].arr[i][j] === parseInt(cells[j].getAttribute('data-type'), 0) ) {
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
            }, 2000
        );
    }

    render() {
        return (
            <Context.Provider value={{ state: this.state, methods: {setAppState: (value) => this.setState(value)}}}>
            <Context.Consumer>{context => (

                <div className="App">

                    <div className="list">
                        <div className="list__name">Выбор:</div>
                        <select className="list__select">
                            {
                                Object.values(this.state.images).map(function(item, i) {
                                    let name = item.name;
                                    // var reg=/[a-zA-Z]/g;
                                    // name = name.replace(reg, "*");
                                    return (
                                        <option onClick={this.clickSelectCross} value={i} key={i}>
                                        {name}
                                        </option>
                                    )
                                }, this)
                            }
                        </select>
                    </div>

                    <div className="grid">
                        <div className='grid__name'>{this.state.images['img' + this.state.selected].name}</div>
                        <div className='grid__num-top'>
                            <NumTop context={context} />
                        </div>
                        <div className='grid__num-left'>
                            <NumLeft context={context} />
                        </div>
                        <div className='grid__content'>
                            <div className='cross'>
                                {
                                    this.state.images['img' + this.state.selected].arr.map(function(row, i) {
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
                                <button className='btn btn_check' title='Проверить решение' onClick={this.check}>CHECK</button>
                                <button className='btn btn_paint' title='Закрасить ячейку' onClick={this.clickPaint}>Закрасить</button>
                                <button className='btn btn_blank' title='Пометить ячейку как пустую' onClick={this.clickBlank}>Крестик</button>
                                <button className='btn btn_delete' title='Очистить ячейку' onClick={this.clickDelete}>удалить</button>
                            </div>
                            <div className='grid__result'>
                                {
                                    this.state.result
                                    ?
                                    'Отлично'
                                    :
                                    'Вы дно!'
                                }
                            </div>
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
