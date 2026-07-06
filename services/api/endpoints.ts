export const endpoints = {
  auth: {
    login: '/auth/login',
    otp: '/auth/send-otp',
    registerBarber: '/auth/register-barber',
    me: '/auth/me',
  },

  users: {
    list: '/users',
    detail: (id: number) => `/users/${id}`,
    edit: `/users/me`,
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

  barber: {
    list: '/barber',
    detail: (id: number) => `/barber/${id}`,
  },

  booking: {
    create: '/booking',
    availableTimes: '/bookings/available-times',
  },
};
