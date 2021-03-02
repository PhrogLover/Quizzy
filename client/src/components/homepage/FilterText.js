const FilterText = ( { filter, filterTitle, setFilterTitle, filterCategory, setFilterCategory, filterCreator, setFilterCreator, setFilterDrop } ) => {

    if (filter === "filter-title"){
        return ( 
            <div className="search-bar">
                <span id="filter-text">
                    <input type="text" name="filter-title" value={filterTitle} onChange={text => (setFilterTitle(text.target.value))}></input>
                </span>
            </div>
         );
    }
    else if (filter === "filter-category") {
        return ( 
            <div className="search-bar">
                <span id="filter-text">
                    <input type="text" name="filter-category" value={filterCategory} onChange={text => (setFilterCategory(text.target.value))}></input>
                </span>
            </div>
         );
    }
    else {
        return (
            <div className="search-bar">
                <span id="filter-text">
                    <input type="text" name="filter-creator" value={filterCreator} onChange={text => (setFilterCreator(text.target.value))}></input>
                </span>
            </div>
         );
    }
}
 
export default FilterText;