export const endpoints = {
  auth: {
    login: '/auth/login',
    otp: '/auth/send-otp',
    registerBarber: '/auth/register-barber',
  },

  users: {
    list: '/users',
    detail: (id: number) => `/users/${id}`,
  },

  categories: {
    list: '/categories',
    create: '/categories',
  },

  locations: {
    provinceList: '/locations/provinces',
    searchCities: '/locations/cities',
    cityList: (id: number) => `/locations/provinces/${id}/cities`,
  },
};
