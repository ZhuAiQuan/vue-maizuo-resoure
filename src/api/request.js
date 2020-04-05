import axios from 'axios'


export const getBanner = (cityId) => {
  return axios.get(`https://m.maizuo.com/gateway?type=2&cityId=${cityId}&k=1855596`,{
    headers: {
      'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1586063131390842026034","bc":${cityId}}`,
      'X-Host': 'mall.cfg.common-banner'
    }
  }
  )
}

export const PlayList = ({ type, cityId }) => {
  return axios.get(`https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=${type}&k=2176853`, {
    headers: {
      'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1586063131390842026034","bc":${cityId}}`,
      'X-Host': 'mall.film-ticket.film.list'
    }
  })
}

export const filmInfo = ({ filmId, cityId}) => {
  return axios.get(`https://m.maizuo.com/gateway?filmId=${filmId}&k=1226606`, {
    headers: {
      'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1586063131390842026034","bc": ${cityId}}`,
      'X-Host': 'mall.film-ticket.film.info'
    }
  })
}

export const getInfo = () => {
  return axios.get('https://m.maizuo.com/gateway?actId=ElzMZU125260', {
    headers: {
      'X-Client-Info': '',
      'X-Host': 'mall.act.static-page.info'
    }
  })
}
// 获取定位地图信息
export const getMaps = (cityId) => {
  return axios.get('https://m.maizuo.com/gateway?k=4634182', {
    headers: {
      'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1586063131390842026034","bc":${cityId}}`,
      'X-Host': 'mall.film-ticket.city.list'
    }
  })
}