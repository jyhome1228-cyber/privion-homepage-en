/* =========================================================
   PRIVION SEARCH JS
   - 정적 JSON 데이터 기반 사이트 내부 검색
   - assets/data/search-data.json 사용
========================================================= */

(function () {
  "use strict";

  var input = document.getElementById("pv-search-input");
  var resultBox = document.getElementById("pv-search-results");

  if (!input || !resultBox) return;

  var searchData = [];

  /**
   * 검색 데이터 불러오기
   */
  fetch("assets/data/search-data.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Search data load failed");
      }

      return response.json();
    })
    .then(function (data) {
      searchData = data;
    })
    .catch(function () {
      resultBox.innerHTML =
        '<p class="pv-search-empty">검색 데이터를 불러오지 못했습니다.</p>';
    });

  /**
   * 검색어 정규화
   */
  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  /**
   * 검색 결과 카드 생성
   */
  function createResultItem(item) {
    return (
      '<a href="' +
      item.url +
      '" class="pv-search-result">' +
      "<span>" +
      item.category +
      "</span>" +
      "<strong>" +
      item.title +
      "</strong>" +
      "<p>" +
      item.description +
      "</p>" +
      "</a>"
    );
  }

  /**
   * 검색 실행
   */
  function runSearch(keyword) {
    var normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
      resultBox.innerHTML =
        '<p class="pv-search-empty">검색어를 입력하면 관련 페이지가 표시됩니다.</p>';
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
        '<p class="pv-search-empty">검색 결과가 없습니다.</p>';
      return;
    }

    resultBox.innerHTML = results.map(createResultItem).join("");
  }

  /**
   * 입력 이벤트
   */
  input.addEventListener("input", function () {
    runSearch(input.value);
  });

  /**
   * URL query 검색 지원
   * 예: search.html?q=dl100
   */
  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var query = params.get("q");

    if (query) {
      input.value = query;
      runSearch(query);
    }
  });
})();
