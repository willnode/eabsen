

const serverUrl = process.env.NODE_ENV === 'production' ? 'https://dev.wellosoft.net/eabsen' : 'http://localhost/eabsen-ci';
const session = {
	auth: null,
	login: null,
	history: null,
	counter: null,
	message: null,
	error: null,
	reload: () => session.setCounter(Math.random()),
	setMessage(v) {
		session.message = v;
		session.reload();
	},
	setError(v) {
		session.error = v;
		session.reload();
	},
	baseUrl: url => `${serverUrl}/${url}`,
	baseUrlByRole: url => `${serverUrl}/${session.login.role}/${url}`,
	extract(event) {
		event.preventDefault();
		return new FormData(event.target);
	},
	get: async function (url) {
		let response;
		try {
			const result = await fetch(`${serverUrl}/${url}`, {
				headers: {
					...(session.auth ? { 'Authorization': session.auth, 'Accept': 'application/json' } : {})
				}
			});
			response = await result.json();
		} catch (error) {
			session.error = error;
			throw session.error;
		} finally {
			if (response.status !== 'Error') {
				return response;
			} else {
				session.error = response.message;
				throw session.error;
			}
		}
	},
	post: async function (url, form) {
		if (!(form instanceof FormData)) {
			var data = new FormData();
			Object.entries(form).forEach(([k,v])=>data.append(k, v));
			form = data;
		}
		const result = await fetch(`${serverUrl}/${url}`, {
			headers: {
				...(session.auth ? { 'Authorization': session.auth, 'Accept': 'application/json' } : {}),
			},
			body: form,
			method: 'post'
		});
		const response = await result.json();
		if (response.status !== 'Error') {
			return response;
		} else {
			session.error = response.message;
			throw response.message;
		}
	},
	getByRole: async function(url) {
		return await session.get(session.login.role+'/'+url);
	},
	postByRole: async function(url, body) {
		return await session.post(session.login.role+'/'+url, body);
	}
}
if (window.sessionStorage.getItem('appauth')) {
	session.auth = window.sessionStorage.getItem('appauth');
	session.login = JSON.parse(window.sessionStorage.getItem('applogin'));
} else if (window.localStorage.getItem('appauth')) {
	session.auth = window.localStorage.getItem('appauth');
	session.login = JSON.parse(window.localStorage.getItem('applogin'));
}
window.session = session;
export default session;