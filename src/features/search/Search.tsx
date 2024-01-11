import React, {FC, useEffect, useState} from 'react';
import styles from "./Search.module.scss"

interface SearchProps {
    getSearchQuery: (searchQuery: string) => void;
}
const Search:FC<SearchProps> = ({getSearchQuery}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        getSearchQuery(searchQuery)
    }, [getSearchQuery, searchQuery]);

    return (
        <input
            className={styles.search}
            placeholder="SEARCH NETWORK..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
        />
    );
};

export default Search;