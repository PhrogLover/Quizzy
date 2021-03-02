const FilterText = ( { filter, setFilterTitle, setFilterCategory, setFilterCreator, setFilterDrop } ) => {

    if (filter === "filter-title"){
        setFilterDrop("Title");
        return ( 
            <span id="filter-text">
                <input type="text" name="filter-title" onChange={text => (setFilterTitle(text.target.value))}></input>
            </span>
         );
    }
    else if (filter === "filter-category") {
        setFilterDrop("Category");
        return ( 
            <span id="filter-text">
                <input type="text" name="filter-category" onChange={text => (setFilterCategory(text.target.value))}></input>
            </span>
         );
    }
    else {
        setFilterDrop("Host");
        return ( 
            <span id="filter-text">
                <input type="text" name="filter-creator" onChange={text => (setFilterCreator(text.target.value))}></input>
            </span>
         );
    }
}
 
export default FilterText;