function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

$(document).ready(function () {
  function getHTMLforNews(article) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var date = new Date(article.created_at);
    return `<div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 botonewsarticle mb-4">
        <div class="card text-white bg-dark">
            <a href="${article.item_url || ""}" target="_blank">
                <img src="${article.image_url || ""}" 
                    class="card-img-top" width="100%" alt="${
                      article.image_alt
                    }"/>
            </a>
            <div class="card-body">
            <h5 class="caMotivQuoteItemrd-title">${article.title || ""}</h5>
            <p class="card-text">
                ${article.subtitle || ""}
            </p>
            <p class="card-text">
                <small class="text-muted">${date.toLocaleDateString(
                  undefined,
                  options
                )}</small>
            </p>
            </div>
        </div>
    </div>
`;
  }

  function getHTMLforQuote(article) {
    return `<div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 botonewsarticle mb-4">
    <div class="card card text-white bg-dark">
      <figure class="p-3 mb-0">
        <blockquote class="blockquote">
          <p>${article.quote}</p>
        </blockquote>
        <figcaption class="blockquote-footer mb-0 text-muted">
          ${article.author}
        </figcaption>
      </figure>
    </div>
  </div>`;
  }
  const getNews = async (random = true) => {
    let url = `http://localhost:8081/news?lang=en&api_key=test`;

    let cookies = [];

    $.each($.cookie(), function (key, value) {
      if (value == $.cookie("count")) {
      } else {
        cookies.push(value);
      }
    });

    let countResults = $.cookie("count");

    url += cookies ? `&src=${cookies}` : "";
    url += countResults ? `&number=${countResults}` : "";
    $.get(url, function (data) {
      var tooltip = $('<div id="tooltip" />')
        .css({
          position: "absolute",
          top: -25,
          left: -10,
        })
        .hide();
      $("#slider")
        .slider({
          value: countResults,
          min: 1,
          max: 20,
          step: 1,
          slide: function (event, ui) {
            tooltip.text(ui.value);
          },
          change: function (event, ui) {},
        })
        .find(".ui-slider-handle")
        .append(tooltip)
        .hover(
          function () {
            tooltip.show();
          },
          function () {
            tooltip.hide();
          }
        );

      articlesList = "";
      let index = 0;

      if (random) {
        data = data
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      }

      for (article of data) {
        if (!article) {
          break;
        }
        index++;

        articlesList +=
          article.src_channel == "Quote"
            ? getHTMLforQuote(article)
            : getHTMLforNews(article);
      }
      $("#cards-container").html(articlesList);

      // https://github.com/desandro/masonry/issues/1147
      // Wait for all image to be loaded before running masonry
      // in order to avoid overlap
      Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((resolve) => {
                img.onload = img.onerror = resolve;
              })
          )
      ).then(() => {
        $("#cards-container").masonry({
          percentPosition: true,
        });
      });
    });
  };

  getNews();

  let cookies = [];

  $.each($.cookie(), function (key, value) {
    cookies.push(value);
  });
  if (cookies.length !== 0) {
    //   let channels = allChannels.split(',')
    cookies.includes("goepfl")
      ? ($(".go")[0].checked = true)
      : ($(".go")[0].checked = false);
    cookies.includes("actu")
      ? ($(".actu")[0].checked = true)
      : ($(".actu")[0].checked = false);
    cookies.includes("hackernews")
      ? ($(".hn")[0].checked = true)
      : ($(".hn")[0].checked = false);
    cookies.includes("quote")
      ? ($(".quote")[0].checked = true)
      : ($(".quote")[0].checked = false);
    cookies.includes("tomshardware")
      ? ($(".tom")[0].checked = true)
      : ($(".tom")[0].checked = false);
    cookies.includes("letemps")
      ? ($(".ltps")[0].checked = true)
      : ($(".ltps")[0].checked = false);
  }

  $(".random-button").click(async function () {
    if ($(".random-button").html() == "Turn randomize off") {
      await getNews(false);
      $(".random-button").addClass("disabled");
      await sleep(2500);
      $(".random-button").removeClass("disabled");
      $(".random-button").html("Turn randomize on");
    } else if ($(".random-button").html() == "Turn randomize on") {
      await getNews(true);
      $(".random-button").addClass("disabled");
      await sleep(2500);
      $(".random-button").html("Turn randomize off");
      $(".random-button").removeClass("disabled");
    }
  });
  $(".darkmode").click(function () {
    $("body").toggleClass("background-darkmode background-lightmode");
    $(".darkmode").toggleClass("btn-light btn-dark");
    $(".card").toggleClass("text-white bg-dark bg-light");
    $(".form-check").toggleClass("text-lightmode text-darkmode");
    $(".results-number-text").toggleClass("text-lightmode text-darkmode");
    $(".filter-button").toggleClass("btn-light btn-dark");
    $(".random-button").toggleClass("btn-light btn-dark");

    if ($(".darkmode").html() == "Light mode ☀️") {
      $(".darkmode").html("Dark mode 🌑");
    } else if ($(".darkmode").html() == "Dark mode 🌑") {
      $(".darkmode").html("Light mode ☀️");
    }
  });
  $(".filter-button").click(function () {
    var gostatus = $(".go").is(":checked");
    var actustatus = $(".actu").is(":checked");
    var hnstatus = $(".hn").is(":checked");
    var quotestatus = $(".quote").is(":checked");
    var tomstatus = $(".tom").is(":checked");
    var ltpsstatus = $(".ltps").is(":checked");

    // var phpceostatus = $("#php_ceo").is(":checked");
    // var neckbeardstatus = $("#neckbeardhacker").is(":checked");
    // var hipsterstatus = $("#hipsterhacker").is(":checked");
    if (gostatus) {
      $.cookie("go_epfl", "goepfl");
    }
    if (actustatus) {
      $.cookie("actu_epfl", "actu");
    }
    if (hnstatus) {
      $.cookie("hackernews", "hackernews");
    }
    if (quotestatus) {
      $.cookie("quote_of_the_day", "quote");
    }
    if (tomstatus) {
      $.cookie("tomshardware", "tomshardware");
    }
    if (ltpsstatus) {
      $.cookie("le_temps", "letemps");
    }
    // if (phpceostatus) {
    //   data.push("php_ceo");
    // }
    // if (neckbeardstatus) {
    //   data.push("neckbeardhacker");
    // }
    // if (hipsterstatus) {
    //   data.push("hipsterhacker");
    // }

    $.cookie("count", $("#slider").attr("value"));
    var cookiepath = "/public-frontend";

    if (!gostatus) {
      $.removeCookie("go_epfl", { path: cookiepath });
    }
    if (!actustatus) {
      $.removeCookie("actu_epfl", { path: cookiepath });
    }
    if (!hnstatus) {
      $.removeCookie("hackernews", { path: cookiepath });
    }
    if (!quotestatus) {
      $.removeCookie("quote_of_the_day", { path: cookiepath });
    }
    if (!tomstatus) {
      $.removeCookie("tomshardware", { path: cookiepath });
    }
    if (!ltpsstatus) {
      $.removeCookie("le_temps", { path: cookiepath });
    }
    let cookies = [];

    $.each($.cookie(), function (key, value) {
      if (value == $.cookie("count")) {
      } else {
        cookies.push(value);
      }
    });

    let count = $.cookie("count");

    if (cookies.length == 0) {
      location.href = "?count=" + count;
    } else {
      location.href = "?src=" + cookies + "&count=" + count;
    }
  });
});
