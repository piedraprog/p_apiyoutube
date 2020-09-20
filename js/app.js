// KEY PARA ENTRAR EN LA API DE YOUTUBE
// 
const _key = "Aqui va la api key";
const _Cid = ""; // aqui va el id del canal  prueba


// esto es para cuando se recargue la pagina me muestre la pantalla de bienvenida
$(document).ready(function() {

    $(location).attr('href', '#home');



});



//FUNCION PARA REALIZAR LA BUSQUEDA CON LA API Y UN METODO AJAX (GET)
function search() {

    // Obtengo el valor en el inpute
    const dato = $('#searchtext').val();

    data = {

        part: 'snippet',
        q: dato,
        pageToken: '  ',
        maxResults: '6',
        type: 'video',
        key: _key

    }

    // console.log(data);

    //  Url a donde envio los datos
    url = "https://www.googleapis.com/youtube/v3/search";

    //metodo ajax get para la obtencion de parametros
    $.get(url, data, (request) => {

        // console.log(request);
        template = '';

        // Este for es para listar la informacion que me devuelve la api
        for (let k in request.items) {

            //console.log(k, request.items[k].snippet.thumbnails.default.url);
            // console.log(request2.items[k].snippet.channelId)

            template += `                   
                <div id="video-info" class="video-info" >
                    <div class="img">
                    <img  onclick="showVideo('${request.items[k].id.videoId}')" src="${request.items[k].snippet.thumbnails.default.url}">
                    </div>
                    <div class="info">
                        <div class="titulo">
                            <label onclick="showVideo('${request.items[k].id.videoId}')"><h3>${request.items[k].snippet.title}</h3></label>

                            <label><a onclick="channelInfo('${request.items[k].snippet.channelId}')">${request.items[k].snippet.channelTitle}</a> </label>
                        </div>
                        <div class="desc" onclick="showVideo(${k})">
                            <p>${request.items[k].snippet.description}</p>
                        </div>
                    </div>
                </div>      

            `
        }

        $('#result').html(template);
    })


}

// FUNCION QUE ME MUESTRA LA INFORMACION DEL CANAL SEGUN EL ID
function channelInfo(id) {

    $(location).attr('href', '#channelInfo');

    //console.log("este es el id del canal " + id);

    template = '';
    //Url a donde le pido la informacion del canal
    url = "https://www.googleapis.com/youtube/v3/channels";

    data = {
        part: 'statistics,snippet,brandingSettings',
        id: id,
        pageToken: '  ',
        key: _key
    }


    $.get(url, data, (request) => {

        //console.log(request);

        template += `<div id="ui-body-test" class="ui-body ui-body-a ui-corner-all" style="height: 88px; margin-bottom:1em;background-image: url(${request.items[0].brandingSettings.image.bannerMobileLowImageUrl}); display: flex; justify-content: center;">
                        <img style="border-radius: 50px;" src="${request.items[0].snippet.thumbnails.default.url}" alt="imagen de perfil">

                        </div>
                        <div id="ui-body-test" class="ui-body ui-body-a ui-corner-all" style="margin-bottom:1em; ">

                        <div class="ui-bar ui-bar-a">
                            <div class="ui-field-contain">
                                nombre del canal: ${request.items[0].snippet.title}
                            </div>
                            <div class="ui-field-contain">
                                descripcion del canal: ${request.items[0].snippet.description}
                            </div>
                        </div>

                        <div class="ui-bar ui-bar-a">
                            <div class="ui-field-contain">
                                Numero de Suscriptores: ${request.items[0].statistics.subscriberCount}
                            </div>
                            <div class="ui-field-contain">
                                total de videos Subidos: ${request.items[0].statistics.videoCount}
                            </div>
                            <div class="ui-field-contain">
                                Total de vistas: ${request.items[0].statistics.viewCount}
                            </div>

                        </div>

                    </div>`

        $('#chann').html(template);

    })

    lastVideos(id);

}


// FUNCION PARA OBTENER LOS ULTIMOS VIDEOS SUBIDOS POR EL CANAL
function lastVideos(id) {

    data = {
        part: 'id,snippet,player',
        channelId: id,
        maxResults: '5',
        key: _key
    }

    //Url donde hago la solicitud de los videos en base al id del canal 
    url = "https://www.googleapis.com/youtube/v3/playlists"
    template = "";
    $.get(url, data, (request) => {

        //console.log(request);
        template += '<h3 style="text-align:center">Ultimos videos Subidos</h3>'

        for (let k in request.items) {
            template += `
                        <div id="video-info" class="video-info" >
                            <div class="img">
                                <img  src="${request.items[k].snippet.thumbnails.default.url}">
                            </div>
                            <div class="info">
                                <div class="titulo">
                                    <label><h3>${request.items[k].snippet.title}</h3></label>
                                </div>
                                <div class="desc" >
                                    <p>Descripción: ${request.items[k].snippet.description}</p>
                                </div>
                            </div>
                        </div>
                       `
        }


        $("#chann").html(template);
    })
}


//FUNCION PARA QUE CUANDO CARGUE LA PAGINA PRINCIPAL ME MUESTRE LOS VIDEOS MAS POPULARES
$('#Most-popular').ready(function() {
    //esto es la estructuracion de la data que se pasa a travez de la url para que la api me de una respuesta 
    data = {
        part: 'id,snippet',
        chart: 'mostPopular',
        maxResults: '20',
        key: _key
    }

    //Url donde se consulta los videos
    url = "https://www.googleapis.com/youtube/v3/videos"
    template = '';
    $.get(url, data, (request) => {

        //console.log(request);

        for (let k in request.items) {
            template += `<div class="Video-card" >
                            <label>
                                <img onclick="showVideo('${request.items[k].id}')" src="${request.items[k].snippet.thumbnails.medium.url}" alt="miniatura">
                            </label>
                            <label onclick="showVideo('${request.items[k].id}')">${request.items[k].snippet.localized.title}</label>
                            <a onclick="channelInfo('${request.items[k].snippet.channelId}')">${request.items[k].snippet.channelTitle}</a>
                        </div>
                        `
        }

        $("#Most-popular").html(template);
    })
});

//FUNCION QUE EN BASE AL ID DEL VIDEO ME PERMITE REPRODUCIRLO
function showVideo(id) {


    $(location).attr('href', '#showVideo');
    // console.log("id video: ");
    // console.log(id);

    url = "https://www.googleapis.com/youtube/v3/videos";

    template = '';

    data = {
        part: 'snippet, player,statistics',
        id: id,
        key: _key
    }

    $.get(url, data, (request) => {

        // console.log("este console log es de show video:");
        // console.log(request);

        template += `
                <label>
                    <iframe id="video-rep" class="video-rep" src="https://www.youtube.com/embed/${request.items[0].id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <h2>${request.items[0].snippet.title}</h2>
                    <p>
                        <a onclick="channelInfo('${request.items[0].snippet.channelId}')">${request.items[0].snippet.channelTitle}</a> 
                        ${request.items[0].statistics.viewCount} <i class="fa fa-eye" aria-hidden="true"></i> 
                        ${request.items[0].statistics.likeCount} <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                        ${request.items[0].statistics.dislikeCount} <i class="fas fa-thumbs-down    "></i>
                    </p> 
                </label>`


        $('#video-play').html(template)
    })



}


// INSTALACION DEL SERVICE WORKER
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/sw.js')
        .then(reg => console.log('Registro de SW exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el sw', err))
}