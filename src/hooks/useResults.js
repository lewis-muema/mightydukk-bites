import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const defaultVal = 'restaurants';
  const [results, setResults] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [business, setBusinsess] = useState({});
  const [reviews, setReviews] = useState([]);
  const [country, setCountry] = useState('United States');
  const countries = [
    'United States',
    'Czech Republic',
    'Denmark',
    'Austria',
    'Switzerland',
    'Germany',
    'Australia',
    'Belgium',
    'Canada',
    'Switzerland',
    'United Kingdom',
    'Hong Kong',
    'Republic of Ireland',
    'Malaysia',
    'New Zealand',
    'Philippines',
    'Singapore',
    'Argentina',
    'Chile',
    'Spain',
    'Mexico',
    'Finland',
    'France',
    'Italy',
    'Japan',
    'Norway',
    'The Netherlands',
    'Poland',
    'Brazil',
    'Portugal',
    'Sweden',
    'Turkey',
    'Taiwan',
  ];

  const searchApi = (val, location) => {
    setLoading(true);
    yelp.get('/search', {
      params: {
        limit: 50,
        term: val,
        location,
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

  const searchBusiness = (val) => {
    setLoading(true);
    yelp.get(`/${val}`).then((res) => {
      setBusinsess(res.data);
      setLoading(false);
      setRefreshing(false);
      setError('');
    }).catch((err) => {
      setError(err.response.data.error.description);
      setLoading(false);
      setRefreshing(false);
    });
  };

  const getReviews = (val) => {
    yelp.get(`/${val}/reviews`).then((res) => {
      setReviews(res.data.reviews);
      setError('');
    }).catch((err) => {
      setError(err.response.data.error.description);
    });
  };

  useEffect(() => {
    searchApi(defaultVal, country);
  }, []);

  return [
    results,
    error,
    searchApi,
    loading,
    setRefreshing,
    refreshing,
    searchBusiness,
    business,
    getReviews,
    reviews,
    countries,
    country,
    setCountry,
  ];
};
