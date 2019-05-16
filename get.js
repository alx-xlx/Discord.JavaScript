const http = require('http');
const https = require('https');
const { URL } = require('url');

function get(url, options = {}) {
	if (typeof url !== 'string' && !(url instanceof URL)) {
		throw new Error('url must be a url-string or a url.URL instance');
	}
	if (typeof options !== 'object') {
		throw new Error('if specified, options must be an object');
	}

	const targetUrl = typeof url === 'string' ? new URL(url) : url;
	const transport = targetUrl.protocol === 'https:' ? https : http;

	return new Promise((resolve, reject) => {
		const req = transport.request(Object.assign(targetUrl, options), (res) => {
			const response = [];

			res.on('data', chunk => response.push(chunk));
			res.on('end', () => resolve(Buffer.concat(response).toString('utf-8')));

			res.on('error', reject);
		});

		req.on('error', reject);

		req.end();
	});
}

module.exports = get;
