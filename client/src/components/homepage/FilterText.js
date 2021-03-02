const FilterText = ( { filter, filterTitle, setFilterTitle, filterCategory, setFilterCategory, filterCreator, setFilterCreator, setFilterDrop } ) => {

    if (filter === "filter-title"){
        setFilterDrop("Title");
        setFilterCategory("");
        setFilterCreator("");
        return ( 
            <span id="filter-text">
                <input type="text" name="filter-title" value={filterTitle} onChange={text => (setFilterTitle(text.target.value))}></input>
            </span>
         );
    }
    else if (filter === "filter-category") {
        setFilterDrop("Category");
        setFilterTitle("");
        setFilterCreator("");
        return ( 
            <span id="filter-text">
                <input type="text" name="filter-category" value={filterCategory} onChange={text => (setFilterCategory(text.target.value))}></input>
            </span>
         );
    }
    else {
        setFilterDrop("Host");
        setFilterTitle("");
        setFilterCategory("");
        return ( 
            <span id="filter-text">
                <input type="text" name="filter-creator" value={filterCreator} onChange={text => (setFilterCreator(text.target.value))}></input>
            </span>
         );
    }
}
 
export default FilterText;