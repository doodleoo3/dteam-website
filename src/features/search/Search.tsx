import React, {FC, useEffect, useState} from 'react';
import Input from '@/src/shared/ui/input/Input';

interface SearchProps {
    getSearchQuery: (searchQuery: string) => void;
    isPageWithServices?: boolean;
}
const Search:FC<SearchProps> = ({getSearchQuery, isPageWithServices}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        getSearchQuery(searchQuery)
    }, [getSearchQuery, searchQuery]);

    return (
        <Input
            placeholder={isPageWithServices ? "Search service..." : "Search network..."}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            search="true"
        />
    );
};

export default Search;