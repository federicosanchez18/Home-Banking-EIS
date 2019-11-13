import axios from 'axios'

const registerUrl = 'http://localhost:3060/register'

module.exports = class RegisterService {
  static createUser (data) {
    return axios.post(registerUrl, {
      data
    })
  }
}

export default 'ApiService'
