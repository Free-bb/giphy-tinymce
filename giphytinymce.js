var giphytinymce = {
    searchInputStringSelector: '#gifsearch',
    ouputListStringSelector: '#giflisting',
    keywordTranslation: 'Mots clés',
    searchTranslation: 'Chercher un gif',
    modalStringSelector: '.bs-modal-lg',
    apiBase: 'https://api.giphy.com/v1',
    apiKey: 'dc6zaTOxFJmzC',

    giphySearch: function(searchTerm) {
        uri = '${apiBase}/gifs/search?q=${encodedSearch}&api_key=${apiKey}';
        uri = uri.replace("${apiBase}", giphytinymce.apiBase);
        uri = uri.replace("${apiKey}", giphytinymce.apiKey);
        uri = uri.replace("${encodedSearch}", encodeURIComponent(searchTerm));
        $.get(uri, giphytinymce.outputResult);
    },

    outputResult: function(results){
        $.each(results.data, function(index, element) {
            $(giphytinymce.ouputListStringSelector).append('<li><img src="' + element.images.original.url + '" /></li>')
        });

        $(giphytinymce.ouputListStringSelector).find('li img').off().on('click', giphytinymce.bindGif);
        $('#infoGif').hide();
    },

    bindGif: function(){
        imgpath = $(this).attr('src');
        tinyMCE.execCommand('mceInsertContent', false, '[img]' + imgpath + '[/img]');
        $(giphytinymce.modalStringSelector).modal('hide');
    },

    bindSearchInput: function(){
        $(giphytinymce.searchInputStringSelector).keyup(function() {
            if (typeof timeoutID !== 'undefined') {
                clearTimeout(timeoutID);
            }

            var keyword = $(this).val();
            timeoutID = setTimeout(function() { giphytinymce.giphySearch(keyword); }, 1000);
        });
    },

    init: function(){
        _this = this;
        modalGif = $(_this.modalStringSelector);

        gifsearch  = _this.searchInputStringSelector.replace('#', '');
        giflisting = _this.ouputListStringSelector.replace('#', '');

        // modal not used yet
        if (modalGif.find('.modal-content').find(_this.searchInputStringSelector)) {
            modalGif.find('.modal-content').empty();
            modalGif.find('.modal-content').append('<input type="text" class="form-control input-block" id="' + gifsearch + '" placeholder="' + _this.keywordTranslation + '" />');
            modalGif.find('.modal-content').append('<ul id="' + giflisting + '"></ul>');
            modalGif.find('.modal-content').append('<div class="row-fluid" id="infoGif"><div class="alert alert-warning" role="alert">' + _this.searchTranslation + '</div></div>');
            modalGif.modal('show');
            _this.bindSearchInput();
        }
    }
}


function tinymce_button_giphy(){
    giphytinymce.init();
}