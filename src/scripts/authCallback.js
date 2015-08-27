import AuthService from './services/AuthService'

AuthService.handleCallback().then(() => window.location.href = '/');