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
    myPofile: '/barber/profile/me',
    updateProfile: '/barber/profile/me',
    updateProfileImage: '/barber/profile/image',
    workHours: '/barber/profile/work-hours',
    updateWorkHours: '/barber/profile/work-hours',
    admin: {
      list: '/admin/barber',
      detail: (id: string) => `/admin/barber/${id}`,
      update: '/admin/barber',
      remove: '/admin/barber',
      review: (id: string) => `/admin/barber/${id}/review`,
    },
  },

  booking: {
    create: '/bookings',
    availableTimes: '/bookings/available-slots',
  },

  services: {
    list: '/services/my-services',
    create: '/services',
    detail: (id: number) => `/services/${id}`,
    edit: (id: number) => `/services/${id}`,
    delete: (id: number) => `/services/${id}`,
  },

  subscription: {
    list: '/admin/subscriptions',
    active: '/admin/subscriptions/active',
    create: '/admin/subscriptions',
    detail: (id: string) => `/admin/subscriptions/${id}`,
    update: (id: string) => `/admin/subscriptions/${id}`,
    delete: (id: string) => `/admin/subscriptions/${id}`,
    toggleActive: (id: string) => `/admin/subscriptions/${id}/toggle-active`,
  },

  settings: {
    get: '/admin/settings',
    update: '/admin/settings',
  },
};
