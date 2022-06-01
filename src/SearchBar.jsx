import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStates } from './utilities/states';
const SearchBar = () => {

    const [myOptions, setMyOptions] = useState([])

    let s = useStates('main')
    function search(event) {
        let text = event.target.value
        s.filterproducts = s.products.filter(x => x.name.includes(text))
    }

    return (
        <div>
            <Autocomplete
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                renderInput={(params) => (
                    <TextField {...params}
                        onChange={search}
                        variant="outlined"
                        label="Search for a product"
                    />
                )}
            />
        </div>
    );
}

export default SearchBar