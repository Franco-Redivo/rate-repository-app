import useRepositories from '../hooks/useRepositories';
import { RepositoryListContainer } from './RepositoryListContainer';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';


const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories,fetchMore, loading, error } = useRepositories({ first:3, orderBy, orderDirection, searchKeyword: debouncedSearchKeyword });
  const navigate = useNavigate();

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} orderBy={orderBy} orderDirection={orderDirection} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} navigate={navigate} loading={loading} error={error} />;

};

export default RepositoryList;