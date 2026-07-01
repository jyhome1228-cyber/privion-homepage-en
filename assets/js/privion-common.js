/* =========================================================
   PRIVION COMMON JS
   - 현재 메뉴 active 처리
   - 지도 API placeholder 제어
   - 다운로드 버튼 경로 관리
   - 외부 지도 버튼 링크 관리
========================================================= */

(function () {
  "use strict";

  /**
   * 1. 현재 URL 기준 헤더 메뉴 active 처리
   */
  function setActiveNavigation() {
    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll(".pv-nav a");

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");

      if (!href) return;

      var normalizedHref = href.replace(".html", "");
      var normalizedPath = currentPath.replace(".html", "");

      if (
        (href === "/" || href === "/index.html" || href === "index.html") &&
        (currentPath === "/" || currentPath.includes("index.html"))
      ) {
        link.classList.add("is-active");
        return;
      }

      if (
        normalizedHref !== "/" &&
        normalizedPath.includes(normalizedHref.replace("/", ""))
      ) {
        link.classList.add("is-active");
      }
    });
  }

  /**
   * 2. 실제 지도 API가 들어간 경우 placeholder 숨김
   *
   * 지도 API 적용 후 아래 함수 호출:
   * window.privionHideMapPlaceholder();
   */
  function hideMapPlaceholder() {
    var placeholder = document.querySelector(".pv-map-placeholder");

    if (placeholder) {
      placeholder.style.display = "none";
    }
  }

  /**
   * 3. 카탈로그 다운로드 경로 일괄 관리
   *
   * 실제 PDF 파일은 아래 경로에 업로드:
   * assets/download/privion-dl-series-catalog.pdf
   */
  function setDownloadLinks() {
    var catalogPath = "assets/download/privion-dl-series-catalog.pdf";
    var downloadLinks = document.querySelectorAll('a[href="/download"], a[href="download"]');

    downloadLinks.forEach(function (link) {
      link.setAttribute("href", catalogPath);
      link.setAttribute("download", "");
    });
  }

  /**
   * 4. 외부 지도 버튼 경로
   */
  function setMapLinks() {
    var address = encodeURIComponent(
      "경기도 성남시 분당구 삼평동 621 판교이노밸리 제B동 6층 604호"
    );

    var naver = document.querySelector('[data-map="naver"]');
    var kakao = document.querySelector('[data-map="kakao"]');
    var google = document.querySelector('[data-map="google"]');

    if (naver) {
      naver.setAttribute("href", "https://map.naver.com/p/search/" + address);
      naver.setAttribute("target", "_blank");
      naver.setAttribute("rel", "noopener noreferrer");
    }

    if (kakao) {
      kakao.setAttribute("href", "https://map.kakao.com/link/search/" + address);
      kakao.setAttribute("target", "_blank");
      kakao.setAttribute("rel", "noopener noreferrer");
    }

    if (google) {
      google.setAttribute(
        "href",
        "https://www.google.com/maps/search/?api=1&query=" + address
      );
      google.setAttribute("target", "_blank");
      google.setAttribute("rel", "noopener noreferrer");
    }
  }

  /**
   * 5. 초기 실행
   */
  document.addEventListener("DOMContentLoaded", function () {
    setActiveNavigation();
    setDownloadLinks();
    setMapLinks();
  });

  /**
   * 외부에서 호출 가능한 함수
   */
  window.privionHideMapPlaceholder = hideMapPlaceholder;
})();
