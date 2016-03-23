var giftinymce = {
    searchInputStringSelector: '#gifsearch',
    ouputListStringSelector: '#giflisting',
    keywordTranslation: 'Mots clés',
    searchTranslation: 'Chercher un gif',
    modalStringSelector: '.bs-modal-lg',
    apiBase: 'https://api.giphy.com/v1',
    apiKey: 'dc6zaTOxFJmzC',

    giphySearch: function(searchTerm) {
        uri = '${apiBase}/gifs/search?q=${encodedSearch}&api_key=${apiKey}';
        uri = uri.replace("${apiBase}", giftinymce.apiBase);
        uri = uri.replace("${apiKey}", giftinymce.apiKey);
        uri = uri.replace("${encodedSearch}", searchTerm);
        $.get(uri, giftinymce.outputResult);
    },

    outputResult: function(results){
        $.each(results.data, function(index, element) {
            $(giftinymce.ouputListStringSelector).append('<li><img src="' + element.images.original.url + '" /></li>')
        });

        $(giftinymce.ouputListStringSelector).find('li img').on('click', giftinymce.bindGif);
        $('#infoGif').remove();
    },

    bindGif: function(){
        imgpath = $(this).attr('src');
        tinyMCE.execCommand('mceInsertContent', false, '[img]' + imgpath + '[/img]');
        $(_this.modalStringSelector).modal('hide');
    },

    bindSearchInput: function(){
        $(giftinymce.searchInputStringSelector).keyup(function() {
            if (typeof variable !== 'undefined') {
                clearTimeout(timeoutID);
            }

            var keyword = $(this).val();
            timeoutID = setTimeout(function() { giftinymce.giphySearch(keyword); }, 2000);
        });
    },

    init: function(){
        _this = this;
        modalGif = $(_this.modalStringSelector);

        gifsearch  = _this.searchInputStringSelector.replace('#', '');
        giflisting = _this.ouputListStringSelector.replace('#', '');

        modalGif.find('.modal-content').empty();
        modalGif.find('.modal-content').append('<input type="text" class="form-control input-block" id="' + gifsearch + '" placeholder="' + _this.keywordTranslation + '" />');
        modalGif.find('.modal-content').append('<ul id="' + giflisting + '"></ul>');
        modalGif.find('.modal-content').append('<div class="row-fluid" id="infoGif"><div class="alert alert-warning" role="alert">' + _this.searchTranslation + '</div></div>');
        modalGif.modal('show');

        _this.bindSearchInput();
    }
}


function tinymce_button_giphy(){
    giftinymce.init();
}

