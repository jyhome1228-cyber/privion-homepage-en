/* =========================================================
   PRIVION SEARCH JS — ENGLISH SITE
   Static search powered by assets/data/search-data.json
========================================================= */

(function () {
  "use strict";

  var input = document.getElementById("pv-search-input");
  var resultBox = document.getElementById("pv-search-results");

  if (!input || !resultBox) return;

  var searchData = [];

  fetch("assets/data/search-data.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Search data load failed");
      return response.json();
    })
    .then(function (data) {
      searchData = data;
    })
    .catch(function () {
      resultBox.innerHTML =
        '<p class="pv-search-empty">Search data could not be loaded.</p>';
    });

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  function createResultItem(item) {
    return (
      '<a href="' + item.url + '" class="pv-search-result">' +
      "<span>" + item.category + "</span>" +
      "<strong>" + item.title + "</strong>" +
      "<p>" + item.description + "</p>" +
      "</a>"
    );
  }

  function runSearch(keyword) {
    var normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
      resultBox.innerHTML =
        '<p class="pv-search-empty">Enter a keyword to view relevant pages.</p>';
      return;
    }

    var results = searchData.filter(function (item) {
      var targetText = normalizeText(
        item.title + " " + item.category + " " + item.description + " " + item.keywords
      );
      return targetText.indexOf(normalizedKeyword) > -1;
    });

    if (!results.length) {
      resultBox.innerHTML =
        '<p class="pv-search-empty">No results found.</p>';
      return;
    }

    resultBox.innerHTML = results.map(createResultItem).join("");
  }

  input.addEventListener("input", function () {
    runSearch(input.value);
  });

  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var query = params.get("q");
    if (query) {
      input.value = query;
      runSearch(query);
    }
  });
})();
