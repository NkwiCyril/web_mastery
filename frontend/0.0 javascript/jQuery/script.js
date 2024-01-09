// addClass('class-1 class-2 ... class-n')
// removeClass()
// hasClass() ; check if element has class
// attr(); get and set attributes

$('h1').addClass('h1-style') 
$('h1').removeClass('h1-style')
$('h1').on('click', function () {
    alert(this.innerHTML)
});

$('h1').text("I have been changed");

$('button').click(function (e) { 
    console.log(e);
    
});

$('h1').hover(function () {
        // over
        $(this).css('color', 'red');
    }, function () {
        // out
        $(this).css('color', 'black');

    }
);

$(document).keydown(function (e) { 
    $('h1').text(e.key);
});

$('input').remove();
