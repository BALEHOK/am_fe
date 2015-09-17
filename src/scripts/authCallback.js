import AuthService from './services/AuthService'

AuthService.handleCallback().then(() => window.location = window.location.protocol + "//" + window.location.host + '/');