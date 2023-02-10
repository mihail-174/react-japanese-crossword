import React, { Component } from 'react';
import Settings from '../Settings/Settings';
import './Modal.css';

export default class Modal extends Component {

    constructor(props) {
        super(props);
        // this.clickCell = this.clickCell.bind(this);
    }

    render() {
        const {context} = this.props;
        const state = context.state;

        return (
            <div className="modal">
                <div className="modal__overlay"></div>
                <div className="modal__inner">
                    <div className="modal__close">Закрыть</div>
                    <div className="modal__hd">
                        <div className="modal__title">{this.props.title}</div>
                    </div>
                    <div className="modal__content">
                        <Settings context={context} />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {}

    componentWillUnmount() {}

}
