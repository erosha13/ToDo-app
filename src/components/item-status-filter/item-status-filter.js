import React from "react";

export default class ItemStatusFilter extends React.Component {

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ];

    render() {

        const {filter, onFilterItem} = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = name === filter;
            const buttonClass = isActive ? 'btn btn-info' : 'btn bnt-outline-secondary';
            return (
                <button type='button'
                        className={buttonClass}
                        onClick={() => onFilterItem(name)}
                        key={name}>
                    {label}
                </button>
            )
        });

        return (
            <div className='btn-group'>
                {buttons}
            </div>
        );
    }
}


