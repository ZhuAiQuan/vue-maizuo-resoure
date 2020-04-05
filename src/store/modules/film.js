export default {
  state: {
    photos: [],
    city: {
      cityId: 440300
    }
  },
  mutations: {
    GetPhotos (state, arr) {
      state.photos = arr
    },
    GetCity (state, data) {
      state.city = data
    }
  },
  getters: {},
  actions: {}
}