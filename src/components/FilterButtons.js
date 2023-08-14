import React from 'react';
import '../FilterButtons.css'

const FilterButtons = ({ selectedFilter, onFilterChange }) => {

  return(
        <div className="filter">
            <div className="filter-text">
                <p>Filter by:</p>
            </div>
            <div className="containter">
                <div className="card" id='top' onClick={() => onFilterChange('top')}>
                    <img src="/top.png"></img>
                    <p>Top</p>
                </div>
                <div className="card" id='best' onClick={() =>onFilterChange('best')}>                    
                <img src="/best.png"></img>
                    <p>Best</p>
                </div>
                <div className="card" id='new' onClick={() =>onFilterChange('new')}>
                    <img src="/new.png"></img>
                    <p>New</p>
                </div>
            </div>
        </div>
    )
}

export default FilterButtons
