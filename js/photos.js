$(document).ready(function(){
    var currentIndex = 0;
    var currentCollection = 0;
    const bucketUrl = "https://justinhartman.s3.amazonaws.com/photos/"

    getJSON(bucketUrl + 'photos.json',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                buildPhotoCollection(data)
            }
        }
    );

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

    function getJSON(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
          var status = xhr.status;
          if (status === 200) {
            callback(null, xhr.response);
          } else {
            callback(status, xhr.response);
          }
        };
        xhr.send();
    };

    function buildPhotoCollection(data) {
        for (const index in data) {
            if (Object.hasOwnProperty.call(data, index)) {
                const collection = data[index];
                createPhotoNav(collection.name, index);
                createPhotoCards(collection, index)
                console.log(document.body)
            }
        }

        photosLoaded()
    }

    function createPhotoNav(name, index) {
        var offsetIndex = parseInt(index) + 1
        var ul = document.getElementById("nav");
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.textContent = name
        a.id = "photo-nav-" + offsetIndex
        a.setAttribute("value", "photos" + offsetIndex)
        a.setAttribute("class", "photo-nav")
        
        li.appendChild(a);
        ul.appendChild(li);
    }

    function createPhotoCards(collection, index) {
/*
<div class="photo-card" id="image-0-0">
            <a target="_blank" href="../images/sf-06-2021/1.jpg">
                <img class="photo-image" src="../images/sf-06-2021/1.jpg" alt="Chinatown 1">
              </a>
            <div class="photo-description">Chinatown, San Francisco. June 2021. Kodak Gold 200 on Ilford Sprite 35-II.</div>
        </div>
*/
        var offsetIndex = parseInt(index) + 1

        var photoCollection = document.createElement("div")
        photoCollection.setAttribute("class", "photo-collection")
        photoCollection.id = "photos" + offsetIndex

        for (const photoIndex in collection.photos) {
            if (Object.hasOwnProperty.call(collection.photos, photoIndex)) {
                const photo = collection.photos[photoIndex];
                var card = createPhotoCard(photo, collection.folder, index, photoIndex)
                
                photoCollection.appendChild(card)
            }
        }

        console.log(photoCollection)
        document.body.appendChild(photoCollection)
    }

    function createPhotoCard(photo, folder, index, photoIndex) {
        var offsetIndex = parseInt(photoIndex) + 1
        var card = document.createElement("div")
        card.setAttribute("class", "photo-card")
        card.id = "image-" + index + "-" + photoIndex

        var source = bucketUrl + folder + "/" + offsetIndex  + ".jpg"

        var a = document.createElement("a")
        a.setAttribute("target", "_blank")
        a.setAttribute("href", source)

        var img = document.createElement("img")
        img.setAttribute("class", "photo-image")
        img.setAttribute("alt", folder + " " + offsetIndex)
        img.src = source

        a.appendChild(img)
        card.appendChild(a)

        var description = document.createElement("div")
        description.setAttribute("class", "photo-description")
        description.textContent = photo.description

        card.appendChild(description)
        return card
    }

    function photosLoaded() {
        $('.photo-collection').not('#photos1').hide();
        show(0, 0);

        $('.photo-nav').click(function() {
            var inputValue = $(this).attr('value');
            var targetBox = $('#' + inputValue);
    
            console.log(targetBox)
    
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
    }
});
