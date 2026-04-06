import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { useState } from 'react';


const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const { repositories, loading, error } = useRepositories({ orderBy, orderDirection });

  return <RepositoryListContainer repositories={repositories} orderBy={orderBy} orderDirection={orderDirection} setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} loading={loading} error={error} />;

};

export default RepositoryList;