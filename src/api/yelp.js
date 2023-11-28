import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer VtGPjOygQR1oKDPZCYB9MPOFBJOS3zqB_2HgoAEQRsFeeQ6Wu545gAppEh64T_FrHCdIF6MwgABZaxu254ilf_RGAmJgYs4L1ixTf3SpLusWxwbS1D6BjF7oi5lcZXYx',
  },
});
