;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_APP_JP_APIYV3',
    urlsToCache = [
        './',
        '../css/themes/p_yutube_api.min.css',
        '../css/themes/jquery.mobile.icons.min.css',
        'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
        '../jquery-m-1.4.5/jquery.mobile.structure-1.4.5.min.css',
        '../jquery-m-1.4.5/jQuery_v1.11.1.js',
        '../jquery-m-1.4.5/jquery.mobile-1.4.5.min.js',
        '../img/jp_favicon.png',
        '../img/jp_1024.png',
        'https://fonts.googleapis.com/css?family=Roboto:300,400',
        '../css/fontawesome/js/all.min.js',
        'app.js'
    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperar del cache
                return res
            }
            //recuperar de la petición a la url
            return fetch(e.request)
        })
    )
})