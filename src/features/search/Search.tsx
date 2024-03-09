import React, {FC, useEffect, useState} from 'react';
import styles from "./Search.module.scss"
import Input from '@/src/shared/ui/input/Input';

interface SearchProps {
    getSearchQuery: (searchQuery: string) => void;
}
const Search:FC<SearchProps> = ({getSearchQuery}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        getSearchQuery(searchQuery)
    }, [getSearchQuery, searchQuery]);

    return (
        <Input
            placeholder="SEARCH NETWORK..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            search="true"
        />
    );
};

export default Search;