var foods = ["hotdog", "hamburger", "salad", "taco", "cake", "watermellon", "cookie", "steak", "spaghetti", "chip", "doughnut", "soda", "burrito", "fries", "milkshake", "chicken", "porkchop", "pie", "toast",];

var key = "pEDX8JvYH6dqEggZsUogRGGHJ5MkMrdy";



function buttonMaker() {
    $("#button-box").empty();
    for (var i = 0; i < foods.length; i++) {
        $("#button-box").append("<button class='food-button' food='" + foods[i] + "'>" + foods[i]);
    }
}

$(document).on("click", ".food-button", function () {
    var foodGetter = $(this).attr("food");
    var dataGetter = "https://api.giphy.com/v1/gifs/search?q=" + foodGetter + "&api_key=" + key;
    gifGetter();
    function gifGetter() {
        $("#image-column").empty();
        event.preventDefault();
        $.ajax({
            url: dataGetter,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 10; i > 0; i--) {
                var a = $("<div>");
                a.addClass("food-box");
                var c = $("<p>")
                c.text("rating: " + response.data[i].rating);
                a.append(c);
                a.append("<br>");
                var b = $("<img>")
                var still = response.data[i].images.downsized_still.url;
                var moving = response.data[i].images.downsized_large.url;
                b.attr("src", still);
                b.attr("asleep", still);
                b.attr("awake", moving);
                b.attr("status", "asleep");
                b.addClass("foodGif")
                a.append(b);
                $("#image-column").prepend(a);
            }
        });
    }
});

$(document).on("click", ".foodGif", function () {

    var status = $(this).attr("status");
    if (status === "awake") {
        $(this).attr("src", $(this).attr("asleep"));
        $(this).attr("status", "asleep");
    }
    else {
        $(this).attr("src", $(this).attr("awake"));
        $(this).attr("status", "awake");
    }
    // alert($(this).attr("status"));
});

$("#make-food").on("click", function (event) {
    event.preventDefault();
    var newFood = $("#food-maker").val().trim();
    foods.push(newFood);
    buttonMaker();
});

buttonMaker();
