import React, { Component } from 'react';
import './Size.css';

function importFilesCross(r) {
    return r.keys().map(r);
}

export default class Size extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.state = {
            count: []
        }
    }

    click(e){
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        document.querySelectorAll('.size__item').forEach(function(item, i) {
            item.classList.remove('active')
        });
        e.currentTarget.classList.add('active');
        let listFilesSelectedSize = '';
        switch ( e.currentTarget.getAttribute('data-name') ) {
            case 'all':
                listFilesSelectedSize = importFilesCross( require.context('../files/', true, /\.json$/) );
                break;
            case 'small':
                listFilesSelectedSize = importFilesCross( require.context('../files/small/', false, /\.json$/) );
                break;
            case 'medium':
                listFilesSelectedSize = importFilesCross( require.context('../files/medium/', false, /\.json$/) );
                break;
            case 'big':
                listFilesSelectedSize = importFilesCross( require.context('../files/big/', false, /\.json$/) );
                break;
            default:
        }
        setAppState({
            selectedSize: e.currentTarget.getAttribute('data-name'),
            selectedCross: null,
            selectedCrossName: null,
            selectedCrossData: null,
            numTop: [],
            numLeft: [],
            crossList: listFilesSelectedSize
        });
    }

    render() {
        const {context} = this.props;
        const state = context.state;
        const newthis = this;
        let count = this.state.count;
        // console.log( aaa[0] );
        const list = state.size.map(function(item, i) {
            // console.log(item);
            return (
                <div
                    key={i}
                    data-name={item.systemName}
                    className={
                        state.selectedSize === item.systemName ? 'size__item active' : 'size__item'
                    }
                    onClick={newthis.click}
                >
                    <span className='size__name'>{item.name}</span>
                    <span className='size__count' title='количество'>({count[i]})</span>
                </div>
            )
        })
        return (
            <div className='size'>
                {list}
            </div>
        )
    }

    componentDidMount() {
        let countCrossAll = importFilesCross( require.context('../files/', true, /\.json$/) );
        let countCrossSmall = importFilesCross( require.context('../files/small', false, /\.json$/) );
        let countCrossMedium = importFilesCross( require.context('../files/medium', false, /\.json$/) );
        let countCrossBig = importFilesCross( require.context('../files/big', false, /\.json$/) );
        this.setState({
            count: [countCrossAll.length, countCrossSmall.length, countCrossMedium.length, countCrossBig.length]
        });
    }

}
