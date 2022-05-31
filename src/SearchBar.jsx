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
        <div style={{ marginLeft: '40%', marginTop: '60px' }}>
            <Autocomplete
                style={{ width: 500 }}
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                renderInput={(params) => (
                    <TextField {...params}
                        onChange={search}
                        variant="outlined"
                        label="Search Box"
                    />
                )}
            />
        </div>
    );
}

export default SearchBar