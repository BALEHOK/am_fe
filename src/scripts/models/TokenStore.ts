export interface ITokenStore {
	getToken(): string;
	setToken(token: string): void;
}

export class CookieTokenStore implements ITokenStore {
	public getToken(): string {
		return this.getCookie(this.tokenCookieName);
	}

	public setToken(token: string): void {
		document.cookie = this.tokenCookieName + '=' + token;
	}

	private tokenCookieName: string = "OAuthToken";

	private getCookie(name: string): string {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
}

export class LocalStorageTokenStore implements ITokenStore {
	public getToken(): string {
		return localStorage.getItem(this.tokenName);
	}
	public setToken(token: string): void {
		localStorage.setItem(this.tokenName, token);
	}
	private tokenName: string = "bearerToken";
}