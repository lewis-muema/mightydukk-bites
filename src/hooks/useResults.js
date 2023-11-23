import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const defaultVal = 'restaurants';
  const [results, setResults] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const searchApi = (val) => {
    setLoading(true);
    yelp.get('/search', {
      params: {
        limit: 50,
        term: val,
        location: 'new york',
      },
    }).then((res) => {
      setResults(res.data.businesses);
      setLoading(false);
      setRefreshing(false);
      setError('');
    }).catch((err) => {
      setError(err.response.data.error.description);
      setLoading(false);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    searchApi(defaultVal);
  }, []);

  return [
    results,
    error,
    searchApi,
    loading,
    setRefreshing,
    refreshing,
  ];
};
