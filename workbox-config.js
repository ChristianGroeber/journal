module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{css,js}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};