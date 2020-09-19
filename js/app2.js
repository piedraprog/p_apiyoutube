const _key = "AIzaSyCi_LLmtmlK-l5J5-huREE-chjZAxaTzu8";

$(document).ready(function() {


    //lastVideos()

});



function search() {

    const dato = $('#searchtext').val();


    data = {

        part: 'snippet',
        q: dato,
        pageToken: '  ',
        type: 'video',
        key: _key

    }

    console.log(data);

    url = "https://www.googleapis.com/youtube/v3/search";

    $.get(url, data, (request2) => {

        console.log(request2);
        template = '';

        for (var k in request2.items) {

            //console.log(k, request.items[k].snippet.thumbnails.default.url);

            console.log(request2.items[k].snippet.channelId)

            template += `                   
                <div id="video-info" class="video-info" >
                    <div class="img">
                    <img  onclick="mostrarVideo()" src="${request2.items[k].snippet.thumbnails.default.url}">
                    </div>
                    <div class="info">
                        <div class="titulo">
                            <label onclick="mostrarVideo()"><h3>${request2.items[k].snippet.title}</h3></label>
                            <input type="hidden" id="idChnl" value="${request2.items[k].snippet.channelId}">
                            <label><a id="link-canal">${request2.items[k].snippet.channelTitle}</a> </label>
                        </div>
                        <div class="desc" onclick="mostrarVideo()">
                            <p>aqui van el numero de vistas</p>
                        </div>
                    </div>
                </div>      

            `
        }

        $('#result').html(template);
    })


}


function mostrarVideo() {

    console.log("aqui va el video");

}



$(document).on('click', '#link-canal', (e) => {

    $(location).attr('href', '#channelInfo');

    id = $("#idChnl").val();

    template = '';
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
                                Total de vistas:${request.items[0].statistics.viewCount}
                            </div>

                        </div>

                    </div>`

        $('#chann').html(template);

    })




    infoChannel(id);
    //lastVideos(id);
    console.log(id);
});


function infoChannel(id) {



}


function lastVideos(chid) {

    data = {
        part: 'id,snippet',
        id: chid,
        maxResults: '10',
        key: _key
    }

    url = "https://www.googleapis.com/youtube/v3/videos"
    template = "";
    $.get(url, data, (request) => {

        console.log(request);

        for (let k in request.items) {
            template += `<div class="video-img" style="">
                            <label><img src="${request.items[k].snippet.thumbnails.default.url}" alt="miniatura"></label>
                            <input type="hidden" id="idChnl" value="${request.items[k].snippet.channelId}">
                            <label>${request.items[k].snippet.localized.title}</label>
                            <a id="canal">${request.items[k].snippet.channelTitle}</a>
                        </div>`
        }

        $("#lastVideos").html(template);
    })
}

function mostPopularvid() {
    data = {
        part: 'id,snippet',
        chart: 'mostPopular',
        maxResults: '20',
        key: _key
    }

    url = "https://www.googleapis.com/youtube/v3/videos"
    template = '';
    $.get(url, data, (request) => {

        console.log(request);

        for (let k in request.items) {
            template += `<div class="video-img" style="">
                            <label><img src="${request.items[k].snippet.thumbnails.default.url}" alt="miniatura"></label>
                            <input type="hidden" id="idChnl" value="${request.items[k].snippet.channelId}">
                            <label>${request.items[k].snippet.localized.title}</label>
                            <a id="link-canal">${request.items[k].snippet.channelTitle}</a>
                        </div>`
        }

        $("#lastVideos").html(template);
    })
}