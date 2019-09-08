importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: './styles/main.css', revision: '1' },
    { url: './scripts/base.js', revision: '2' },
    { url: './scripts/libs.js', revision: '3' },
    { url: './images/car.svg', revision: '4' },
    { url: './images/logo.svg', revision: '5' },
    { url: './images/icons/logo-share.png', revision: 'logoshare' },
    { url: './fonts/gilroy-regular-webfont.woff2', revision: '6' },
    { url: './fonts/gilroy-medium-webfont.woff2', revision: '7' },
    { url: './fonts/gilroy-bold-webfont.woff2', revision: '8' },
    { url: './fonts/iconse.ttf?etmj6f', revision: '9' },
    //{ url: 'https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery-1.8.3.min.js', revision: '10' },
    { url: './home.html', revision: '11' },
]);

/*workbox.routing.registerRoute(/.*\.(?:png|jpg|jpeg|svg|gif)/,
	workboxSW.strategies.cacheFirst({
		cacheName: 'image-cache',
		cacheExpiration: {
			maxEntries: 100,
			maxAgeSeconds: 24 * 60 * 60
		}
	})
);*/


workbox.routing.registerRoute( /\.(?:js|css)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'assets-cache',
        cacheExpiration: {
			maxEntries: 20,
			maxAgeSeconds: 7 * 24 * 60 * 60
		}
    })
);

workbox.routing.registerRoute(
    new RegExp('/images/'),
    workbox.strategies.cacheFirst({
        cacheName: 'images-cache',
        cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 15 * 24 * 60 * 60,
            purgeOnQuotaError: true,
        },
        cacheableResponse: { statuses: [0, 200] }
    })
);

workbox.routing.registerRoute(
    new RegExp('/images/icons/'),
    workbox.strategies.cacheFirst({
        cacheName: 'icons-cache',
        cacheExpiration: {
            maxEntries: 10,
            maxAgeSeconds: 30 * 24 * 60 * 60,
            purgeOnQuotaError: true,
        },
        cacheableResponse: { statuses: [0, 200] }
    })
);

/*workbox.routing.registerRoute(/.*\.(?:|js|css|jpg|jpeg|gif|png|woff|woff2|ttf|svg)/,
	workbox.strategies.cacheFirst({
		cacheName: 'assets-cache',
		cacheExpiration: {
			maxEntries: 100,
			maxAgeSeconds: 3 * 24 * 60 * 60
		},
		cacheableResponse: { statuses: [0, 200] }
	})
);*/

workbox.routing.registerRoute('https://fonts.googleapis.com/(.*)',
    workbox.strategies.networkFirst({
        cacheName: 'google-fonts',
        cacheableResponse: {
            statuses: [0, 200]
        },
        networkTimeoutSeconds: 3
    })
);

workbox.routing.registerRoute('https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery-1.8.3.min.js',
    workbox.strategies.networkFirst({
        cacheName: 'jquery-vtex',
        cacheableResponse: {
            statuses: [0, 200]
        },
        networkTimeoutSeconds: 3
    })
);

