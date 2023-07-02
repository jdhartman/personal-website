$(document).ready(function(){
    var currentIndex = 0;
    var currentCollection = 0;

    $('.photo-collection').not('#photos1').hide();

    show(0, 0);

    $('.photo-nav').click(function() {
        var inputValue = $(this).attr('value');
        var targetBox = $('#' + inputValue);

        currentCollection = parseInt(inputValue.substring(6)) - 1;
        currentIndex = 0;

        $('.photo-collection').not(targetBox).hide();
        $(targetBox).show();

        show(currentIndex, currentCollection);
    });

    $('.prev').click(function() {
        show(-1, currentCollection);
    })

    $('.next').click(function() {
        show(1, currentCollection);
    })


    function show(index, collection) {
        console.log(index, collection);
        var c = $('#photos' + (collection + 1) + ' > div');
        console.log(c);
        console.log(c.length);

        if (currentIndex + index < 0) {
            currentIndex = c.length;
        }

        currentIndex = (currentIndex + index) % c.length;
        console.log(currentIndex);

        $(".current").text((currentIndex + 1) + ' / ' + c.length);

        var photo = $('#image-' + collection + '-' + currentIndex);
        console.log(photo);

        $('.photo-card').not(photo).hide();
        $(photo).show();
    }
});
