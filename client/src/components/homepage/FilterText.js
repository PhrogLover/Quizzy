const FilterText = ( { filter, setFilterTitle, setFilterCategory, setFilterCreator } ) => {

    if (!filter) {
        return ( 
            <span id="filter-text">
                <input disabled type="text"></input>
            </span>
         );
    }
    else if (filter === "filter-title"){
        return ( 
            <span id="filter-text">
                <label htmlFor="filter-title"> Filter by Quiz Title: </label><input type="text" name="filter-title" onChange={text => (setFilterTitle(text.target.value))}></input>
            </span>
         );
    }
    else if (filter === "filter-category") {
        return ( 
            <span id="filter-text">
                <label htmlFor="filter-category"> Filter by Category: </label><input type="text" name="filter-category" onChange={text => (setFilterCategory(text.target.value))}></input>
            </span>
         );
    }
    else {
        return ( 
            <span id="filter-text">
                <label htmlFor="filter-creator"> Filter by Host: </label><input type="text" name="filter-creator" onChange={text => (setFilterCreator(text.target.value))}></input>
            </span>
         );
    }
}
 
export default FilterText;