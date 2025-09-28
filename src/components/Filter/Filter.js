/** @jsxImportSource @emotion/react */
import React from "react";
import { filterBar, filterFields, button } from "./styles";
import { Button, Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";



const Filter = ({setFilteringRecipes, filteringRecipes, setFilterIngredients, filterIngredients, setFilterTags, filterTags}) => {

    const allIngredients = useSelector((state) => state.ingredients)
    const allTags = useSelector((state) => state.tags)

    const handleClearFilter = () => {
        setFilterIngredients([])
        setFilterTags([])
    }
    
  return (
    <div css={filterBar}>
      <Button
        css={button}
        variant="contained"
        onClick={() =>
          setFilteringRecipes(filteringRecipes === true ? false : true)
        }
      >
        Filter
      </Button>
      {filteringRecipes && (
        <div css={filterFields}>
          <Autocomplete
            className="filter-autocomplete"
            multiple
            options={allIngredients || []}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => setFilterIngredients(value)}
            value={filterIngredients}
            renderInput={(params) => (
              <TextField {...params} label="Filter Ingredients" />
            )}
          ></Autocomplete>
          <Autocomplete
            className="filter-autocomplete"
            multiple
            options={allTags || []}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => setFilterTags(value)}
            value={filterTags}
            renderInput={(params) => (
              <TextField {...params} label="Filter Tags" />
            )}
          ></Autocomplete>
          <Button css={button} variant="contained" onClick={handleClearFilter}>
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default Filter;