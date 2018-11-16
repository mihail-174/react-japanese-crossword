import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';
import NumTop from './NumTop';
import NumLeft from './NumLeft';
const Context = React.createContext()

let initialState = {
    pic1: {
        // name: 'face',
        row: 1,
        cell: 5,
        arr: [
            // [1,1,1,1,1],
            [1,0,1,0,1],
            // [1,1,1,1,1],
            // [1,0,0,0,1],
            // [1,1,1,1,1]
        ],
        numTop: [
        //     [5],
        //     [1,1,1],
        //     [5],
        //     [1,1,1],
        //     [5]
        ],
        numLeft: [
        //     [5],
        //     [1,1,1],
        //     [5],
        //     [1,1],
        //     [5]
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
        this.click = this.click.bind(this);
        this.clickCell = this.clickCell.bind(this);
    }
    setAppState(newState) {
      this.setState(newState);
    }
    click(e) {
        var result = false;
      // document.querySelectorAll('.cross__row').map(function(row, i) {
      //     console.log( row );
      // });
      console.clear();
      var rows = document.querySelectorAll('.cross__row');
      var mycell = 222;

      for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].querySelectorAll('.cross__cell');
          for (var j = 0; j < cells.length; j++) {
              cells[j].classList.remove('AAA');
              cells[j].classList.remove('BBB');
              // console.log( cells[j] );
              // console.log( cells[j].classList.contains('active') );

              // switch ( cells[j].getAttribute('data-type') ) {
              //     case null:
              //         cell = parseInt(0, 0);
              //         break;
              //     case 1:
              //         cell = parseInt( cells[j].getAttribute('data-type'), 0 );
              //         break;
              //     default:
              // }
              switch ( cells[j].classList.contains('active') ) {
                  case false:
                      mycell = parseInt(0, 0);
                      break;
                  case true:
                      mycell = parseInt( cells[j].getAttribute('data-type'), 0 );
                      break;
                  default:
              }
              // console.log( cell );

              // if ( cells[j].getAttribute('data-type') === null ) {
              //     cell = 0;
              // } else {
              //     cell = cells[j].getAttribute('data-type');
              // }
              // if ( this.state.pic1.arr[0][j] === cell ) {
              //     console.log( this.state.pic1.arr[0][j] + ' | ' + cell + ' = вы днище' );
              // } else {
              //     console.log( this.state.pic1.arr[0][j] + ' | ' + cell + ' = ура' );
              // }
              if ( this.state.pic1.arr[i][j] === mycell ) {
                  console.log( this.state.pic1.arr[i][j] + ' | ' + mycell + ' = ура' );
                  result = true;
                  // cells[j].classList.add('AAA');
              } else {
                  console.log( this.state.pic1.arr[i][j] + ' | ' + mycell + ' = вы днище' );
                  result = false;
                  // cells[j].classList.add('BBB');
                  // cells[j].classList.add('AAA');
              }
              // console.log( this.state.pic1.arr[0][j] + ' | ' + cell );
              // console.log( this.state.pic1.arr[0][j] + ' | ' + cells[j].classList.contains('active') );
              // console.log( cells[j].getAttribute('data-type') );
              // console.log( cells[j].getAttribute('data-type') );
          }
      }

      // if ( result ) {
      //     console.log('ура');
      // } else {
      //     console.log('вы днище');
      // }

      // console.log( rows[i] );
      // console.log( rows[i].querySelectorAll('.cross__cell').length );
      // console.log( rows[i].querySelectorAll('.cross__cell').getAttribute('data-type') );

    }
    clickCell(e) {
      // console.log( e.currentTarget );
    }
    render() {
        // const width = this.state.pic1.width;
        // const height = this.state.pic1.height;

          const list = [];

          for (let i = 0; i < 1; i++ ){
              for (let j = 0; j < 5; j++ ){
                  list.push(
                      <div className="cross__row">
                          <div className='cross__row-inner'>
                              <div className='cross__cell'>{i}</div>
                          </div>
                      </div>
                  );
              }
          }

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

                            {list}




                                {
                                    this.state.pic1.arr.map(function(row, i) {
                                        return (
                                            <div className='cross__row' key={i} data-index={i}>
                                                <Cell value={row} context={context} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        {/*
                        <div className='t'>
                            <div className='t__num-top'>t__num-top</div>
                            <div className='t__c'>



                            </div>
                        </div>
                        */}
                    </div>
                    <button onClick={this.click}>CHECK</button>

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
            result: []
            // data: this.props.data
        });
    }
}

export default App;




    // {this.state.pic1.arr.map(function(row, i){
    //     return (
    //         <div className='row' key={i}>
    //             <Cell value={row} context={context} />
    //         </div>
    //     );
    // })}
