export default {
  state: {
    photos: [],
    city: {
      cityId: 440300,
      name: '深圳'
    },
    cinamas: {}
  },
  mutations: {
    GetPhotos (state, arr) {
      state.photos = arr
    },
    GetCity (state, data) {
      state.city = data
    },
    GetCinemas (state, data) {
      state.cinamas = data
    }
  },
  getters: {},
  actions: {}
}