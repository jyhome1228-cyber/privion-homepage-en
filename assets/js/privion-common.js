/* =========================================================
   PRIVION COMMON JS — ENGLISH SITE
   - Navigation state
   - Shared English localization
   - Page metadata
   - Download and map links
========================================================= */

(function () {
  "use strict";

  var ADDRESS_KO = "경기도 성남시 분당구 삼평동 621 판교이노밸리 제B동 6층 604호";
  var ADDRESS_EN = "Suite 604, 6F, Building B, Pangyo Innovalley, 621 Sampyeong-dong, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea";

  function getPath() {
    var name = window.location.pathname.split("/").pop();
    return name || "index.html";
  }

  function all(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function one(selector) {
    return document.querySelector(selector);
  }

  function text(selector, value, index) {
    var nodes = all(selector);
    var node = nodes[typeof index === "number" ? index : 0];
    if (node && typeof value === "string") node.textContent = value;
  }

  function html(selector, value, index) {
    var nodes = all(selector);
    var node = nodes[typeof index === "number" ? index : 0];
    if (node && typeof value === "string") node.innerHTML = value;
  }

  function setMeta(name, content, propertyMode) {
    var selector = propertyMode
      ? 'meta[property="' + name + '"]'
      : 'meta[name="' + name + '"]';
    var meta = document.querySelector(selector);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(propertyMode ? "property" : "name", name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  }

  function setPageMetadata() {
    var path = getPath();
    var config = {
      "index.html": {
        title: "PRIVION | Industrial FMCW LiDAR by Dongwon Group",
        description: "PRIVION delivers compact and reliable industrial FMCW LiDAR solutions for automation, robotics, autonomous mobility, and smart infrastructure."
      },
      "product.html": {
        title: "Products | PRIVION Industrial FMCW LiDAR",
        description: "Explore the PRIVION DL Series industrial FMCW LiDAR lineup, including DL100, DL100S, DL150, and DL150S."
      },
      "technology.html": {
        title: "FMCW LiDAR Technology | PRIVION",
        description: "Discover PRIVION FMCW LiDAR technology for simultaneous distance and velocity measurement, interference resistance, and reliable industrial sensing."
      },
      "application.html": {
        title: "Industrial Applications | PRIVION FMCW LiDAR",
        description: "Explore PRIVION FMCW LiDAR applications across AMR and AGV, OHT, port cranes, smart farms, heavy machinery, and smart cities."
      },
      "contact.html": {
        title: "Contact | PRIVION",
        description: "Contact PRIVION for industrial FMCW LiDAR products, technical consultation, demonstrations, and partnership inquiries."
      },
      "search.html": {
        title: "Search | PRIVION",
        description: "Search PRIVION products, technology, applications, downloads, and company information."
      },
      "terms.html": {
        title: "Terms of Use | PRIVION",
        description: "Terms of use for the PRIVION website."
      },
      "privacy.html": {
        title: "Privacy Policy | PRIVION",
        description: "Privacy policy for the PRIVION website."
      },
      "product-dl100.html": {
        title: "LiDAR DL100 | PRIVION",
        description: "DL100 is a compact industrial detection-type FMCW LiDAR for indoor AGV and AMR safety applications."
      },
      "product-dl100s.html": {
        title: "LiDAR DL100S | PRIVION",
        description: "DL100S is a compact industrial detection and scanning FMCW LiDAR with point-cloud data output."
      },
      "product-dl150.html": {
        title: "LiDAR DL150 | PRIVION",
        description: "DL150 is an IP67 industrial detection-type FMCW LiDAR engineered for reliable outdoor sensing up to 20 meters."
      },
      "product-dl150s.html": {
        title: "LiDAR DL150S | PRIVION",
        description: "DL150S is an IP67 industrial detection and scanning FMCW LiDAR with point-cloud output for outdoor systems."
      }
    }[path] || null;

    if (!config) return;

    document.title = config.title;
    setMeta("description", config.description, false);
    setMeta("keywords", "PRIVION, FMCW LiDAR, industrial LiDAR, LiDAR sensor, automation, robotics, AGV, AMR", false);
    setMeta("author", "PRIVION", false);
    setMeta("telephone", "+82-2-589-2312", false);
    setMeta("og:title", config.title, true);
    setMeta("og:description", config.description, true);
    setMeta("og:site_name", "PRIVION", true);
    setMeta("twitter:title", config.title, false);
    setMeta("twitter:description", config.description, false);
  }

  function injectEnglishStyles() {
    document.documentElement.lang = "en";

    if (!document.querySelector('link[href="assets/css/privion-en.css"]')) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "assets/css/privion-en.css";
      document.head.appendChild(link);
    }
  }

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

      if (normalizedHref !== "/" && normalizedPath.includes(normalizedHref.replace("/", ""))) {
        link.classList.add("is-active");
      }
    });
  }

  function translateCommon() {
    var navLabels = {
      "technology.html": "Technology",
      "product.html": "Products",
      "application.html": "Applications",
      "contact.html": "Contact"
    };

    all(".pv-nav a").forEach(function (link) {
      var href = (link.getAttribute("href") || "").split("/").pop();
      if (navLabels[href]) link.textContent = navLabels[href];
    });

    all(".pv-logo").forEach(function (logo) {
      logo.setAttribute("aria-label", "PRIVION Home");
    });

    all(".pv-logo-image").forEach(function (image) {
      image.alt = "PRIVION";
    });

    all(".pv-footer-info").forEach(function (info) {
      info.innerHTML =
        "Dongwon Industries Co., Ltd.<br>" +
        "Web www.privionlidar.com<br>" +
        "Tel +82-2-589-2312<br>" +
        "Email privion-lidar@dongwon.com<br>" +
        "Address " + ADDRESS_EN;
    });

    all('.pv-footer-links a[href="terms.html"]').forEach(function (link) {
      link.textContent = "Terms of Use";
    });
    all('.pv-footer-links a[href="privacy.html"]').forEach(function (link) {
      link.textContent = "Privacy Policy";
    });

    all(".pv-copy").forEach(function (copy) {
      copy.textContent = "Copyright © PRIVION. All rights reserved.";
    });

    all(".pv-btn").forEach(function (button) {
      if (button.textContent.trim().toLowerCase() === "view more") button.textContent = "View More";
    });

    all(".pv-feature-icon-item span, .pv-other-icon-item span, .pv-home-product-icon-item span").forEach(function (item) {
      var value = item.textContent.trim();
      if (value === "감지") item.textContent = "Detection";
      if (value === "스캔") item.textContent = "Scanning";
    });

    all("img").forEach(function (image) {
      if (image.alt === "감지 아이콘") image.alt = "Detection icon";
      if (image.alt === "스캔 아이콘") image.alt = "Scanning icon";
      if (image.alt === "privion") image.alt = "PRIVION";
    });
  }

  function translateHomeLikePage() {
    if (!one(".pv-home-intro")) return;

    text(".pv-home-intro-sub", "Engineered for Industrial Environments");
    html(
      ".pv-home-intro-desc",
      "The DL Series is an FMCW LiDAR platform engineered for reliable detection in complex industrial environments.<br>" +
        "Its robust architecture and precise signal-processing technology deliver stable sensing performance for automation and robotic systems.<br>" +
        "It is designed to capture both distance and velocity data with greater accuracy."
    );

    var descriptions = [
      "Compact industrial detection-type LiDAR",
      "Compact industrial detection and scanning LiDAR",
      "Outdoor industrial detection-type LiDAR",
      "Outdoor industrial detection and scanning LiDAR"
    ];
    all(".pv-home-product-desc").forEach(function (node, index) {
      if (descriptions[index]) node.textContent = descriptions[index];
    });

    text(".pv-home-feature-title", "Reliable Detection Performance in Complex Industrial Environments");
    html(
      ".pv-home-feature-desc",
      "The DL Series is engineered to maintain stable sensing performance across demanding industrial conditions.<br>" +
        "Its robust architecture and precision signal processing provide accurate distance and velocity data."
    );

    var features = [
      "Stable detection under changing environmental conditions",
      "Simultaneous distance and velocity measurement",
      "Optimized for industrial automation systems"
    ];
    all(".pv-home-feature-box").forEach(function (node, index) {
      if (features[index]) node.textContent = features[index];
    });
  }

  function translateTechnology() {
    if (getPath() !== "technology.html") return;

    text(".pv-tech-subtitle", "PRIVION DL Series — FMCW LiDAR for Industrial Environments");
    html(
      ".pv-tech-desc",
      "The DL Series maintains reliable detection performance in conditions where conventional LiDAR may be vulnerable, including snow, rain, intense sunlight, dust, and smoke.<br>" +
        "Based on frequency-modulated continuous-wave technology, it analyzes the frequency characteristics of reflected signals to measure distance and velocity simultaneously."
    );

    var rows = [
      {
        title: "01 Optimized for Large-Scale Automation",
        desc: "Each DL Series LiDAR uses a unique signal pattern. Even when many AGVs and AMRs operate in a dense environment, the sensors remain resistant to mutual interference regardless of fleet size. Systems can be deployed freely without additional anti-interference design or restrictive sensor placement."
      },
      {
        title: "02 Distance and Velocity from a Single Sensor",
        desc: "Distance and velocity of moving objects are measured simultaneously, eliminating the need for a separate velocity sensor. This simplifies system architecture and improves response speed in applications such as cranes and AMRs."
      },
      {
        title: "03 Reliable Detection of Challenging Materials",
        desc: "The DL Series addresses common LiDAR challenges such as diffuse reflections from metal surfaces and low reflectivity from black materials through a high-power 1550 nm wavelength and precise FMCW signal analysis. Objects can be detected accurately even when reflected signals are weak or irregular."
      }
    ];
    all(".pv-tech-row").forEach(function (row, index) {
      var item = rows[index];
      if (!item) return;
      var titleNode = row.querySelector(".pv-tech-row-title");
      var descNode = row.querySelector(".pv-tech-row-text");
      if (titleNode) titleNode.textContent = item.title;
      if (descNode) descNode.textContent = item.desc;
    });

    text(
      ".pv-tech-note",
      "Industrial LiDAR must maintain reliable detection not only under simple test conditions but also around complex metal structures and difficult environments. Fog, external light sources, mirror-like surfaces, strong ambient light, and multiple reflectors can reduce detection performance and introduce signal interference in conventional ToF LiDAR. These limitations require sensing and signal-processing architectures designed specifically for industrial environments."
    );

    var labels = ["Operating Principle", "Velocity Measurement", "Interference Immunity", "Resolution / Accuracy", "Adverse Weather", "Primary Wavelength"];
    all(".pv-compare-labels span").forEach(function (node, index) {
      if (labels[index]) node.textContent = labels[index];
    });

    var fmcw = [
      ["Frequency-Modulated Continuous Wave", "A continuously emitted laser changes frequency linearly. Distance and velocity are calculated simultaneously from the frequency difference between the transmitted and reflected waves."],
      ["Velocity Measurement Using the Doppler Effect", "Distance and velocity information are precisely separated and extracted from the frequency difference between the transmitted and reflected signals."],
      ["Strong Interference Immunity", "Coherent detection provides robust resistance to ambient light and mutual interference between sensors."],
      ["High Resolution and Accuracy", "High-resolution, high-accuracy distance measurement supports stable detection in industrial environments."],
      ["Performance in Adverse Conditions", "Signal processing remains comparatively stable in fog, external light, and complex reflective environments."],
      ["1550 nm", "This eye-safe wavelength range enables higher optical power and robust signal processing in outdoor environments."]
    ];
    var tof = [
      ["Pulsed Time-of-Flight", "Laser pulses are emitted and distance is calculated from the time required for the reflected light to return from an object."],
      ["Time-Based Distance Calculation", "Processing is primarily based on distance data and can be affected by environmental conditions."],
      ["More Susceptible to Interference", "Performance may be affected by reflected-light frequencies or pulses from other LiDAR sensors."],
      ["Limitations in Long-Range Precision", "Maintaining precision over long distances can be difficult and performance may be affected by external conditions."],
      ["Affected by Environmental Changes", "Fog, intense ambient light, and environments with many reflectors can introduce scattering and absorption."],
      ["905 nm", "Signal absorption and scattering may reduce performance under certain environmental conditions."]
    ];

    all(".pv-compare-card").forEach(function (card, cardIndex) {
      var data = cardIndex === 0 ? fmcw : tof;
      all.call;
      Array.prototype.slice.call(card.querySelectorAll(".pv-compare-item")).forEach(function (item, index) {
        if (!data[index]) return;
        var strong = item.querySelector("strong");
        var p = item.querySelector("p");
        if (strong) strong.textContent = data[index][0];
        if (p) p.textContent = data[index][1];
      });
    });

    html(
      ".pv-compare-footnote",
      "Doppler effect: The apparent change in frequency and wavelength caused by relative motion between a wave source and an observer.<br>" +
        "Coherent detection: A receiving method that recognizes a signal's unique self-interference pattern, enabling stable detection under ambient-light and interference conditions."
    );
  }

  var applicationCopy = {
    "AMR / AGV": "Supports stable autonomous navigation for AMRs and AGVs. In indoor industrial environments and SLAM-based navigation systems, it provides precise perception for both mobility and operational safety.",
    "OHT": "Provides reliable sensing for overhead transport systems in precision manufacturing environments. Fine positional differences can be detected to support stable OHT operation.",
    "Port Cranes": "Provides precise sensing around port cranes and large structures, enabling stable recognition of surrounding structures and crane positions even in outdoor environments with multiple reflectors.",
    "Smart Farm": "Delivers stable sensing data for agricultural machinery and automated equipment in environments with elevation changes, vegetation, and complex reflective conditions.",
    "Heavy Machinery": "Detects surrounding obstacles and operating zones in demanding mining, construction, and civil-engineering environments, supporting both operator safety and automated equipment operation.",
    "Smart City": "Recognizes people, vehicles, and infrastructure within complex urban environments and supports precision sensing systems for smart-city infrastructure."
  };

  function translateApplicationCards(selector) {
    all(selector).forEach(function (card) {
      var titleNode = card.querySelector("h2, h3");
      var descNode = card.querySelector("p");
      if (!titleNode || !descNode) return;
      var titleValue = titleNode.textContent.trim();
      if (applicationCopy[titleValue]) descNode.textContent = applicationCopy[titleValue];
    });
  }

  function translateApplication() {
    if (getPath() !== "application.html") return;

    html(".pv-application-title", "Industrial FMCW LiDAR Solutions<br>for Diverse Applications");
    html(
      ".pv-application-desc",
      "PRIVION LiDAR products are engineered around the structural and operational requirements of real industrial applications.<br>" +
        "Advanced FMCW sensing provides accurate distance and velocity data for complex automation environments across indoor and outdoor conditions.<br><br>" +
        "From AMR-based automation and material-handling systems to agricultural, construction, and urban infrastructure, each solution is designed around the functions and usability required in the field."
    );
    translateApplicationCards(".pv-application-item");
    text(".pv-download-title", "Precision Sensing Solutions for Industrial Environments");
    html(
      ".pv-download-desc",
      "Explore PRIVION technology and the complete DL Series product lineup in one document.<br><br>" +
        "The catalog covers detection stability, precision sensing performance, major applications, and product features developed for real industrial environments."
    );
  }

  var productConfigs = {
    "product-dl100.html": {
      sub: "Compact Industrial Detection-Type LiDAR",
      desc: "DL100 provides reliable obstacle detection for indoor automation environments where AGVs and AMRs operate.<br>It maintains consistent performance against potential indoor false-detection factors such as dust and sunlight entering through windows.<br>With a detection range of up to 10 meters, it is well suited to mobile-robot safety-zone monitoring.",
      sectionTitle: "Korean FMCW LiDAR for Diverse Industrial Applications",
      sectionDesc: "PRIVION LiDAR products are designed around the structures and requirements of real industrial applications. DL100 delivers stable obstacle detection for indoor automation and robotic systems with a compact footprint and a detection range of up to 10 meters."
    },
    "product-dl100s.html": {
      sub: "Compact Industrial Detection and Scanning LiDAR",
      desc: "DL100S combines the obstacle-detection capabilities of DL100 with direct raw point-cloud data output.<br>It is suited to data-driven applications such as SLAM mapping and spatial perception as well as obstacle detection.<br>It supports both reliable sensing and spatial-data utilization in indoor AGV and AMR environments.",
      sectionTitle: "Korean FMCW LiDAR for Diverse Industrial Applications",
      sectionDesc: "PRIVION LiDAR products are designed around the structures and requirements of real industrial applications. DL100S supports both obstacle detection and point-cloud output for SLAM, spatial perception, and mapping systems."
    },
    "product-dl150.html": {
      sub: "Outdoor Industrial Detection-Type LiDAR",
      desc: "DL150 provides reliable detection in outdoor environments through its IP67 dust- and water-resistant design.<br>It maintains a detection range of up to 20 meters under demanding conditions including snow, rain, and strong sunlight.<br>It is suited to outdoor mobile robots, cranes, and fixed industrial equipment.",
      sectionTitle: "Korean FMCW LiDAR for Diverse Outdoor Applications",
      sectionDesc: "DL150 combines IP67 protection with a detection range of up to 20 meters, making it suitable for outdoor mobile robots, cranes, fixed equipment, and other systems that require reliable obstacle detection in external environments."
    },
    "product-dl150s.html": {
      sub: "Outdoor Industrial Detection and Scanning LiDAR",
      desc: "DL150S combines the detection capabilities of DL150 with direct raw point-cloud data output.<br>Outdoor mobile robots, mobile cranes, and other equipment can use distance, velocity, and spatial data together with obstacle detection.<br>It is suited to advanced systems that require mapping and localization.",
      sectionTitle: "Korean FMCW LiDAR for Diverse Outdoor Applications",
      sectionDesc: "DL150S combines IP67 protection, a detection range of up to 20 meters, and point-cloud data output for outdoor systems that require both obstacle detection and spatial-data processing."
    }
  };

  var specLabels = {
    "전원": "Power Supply",
    "계측 방식": "Measurement Method",
    "광원": "Light Source",
    "수평 시야각": "Horizontal Field of View",
    "스캔 주파수": "Scan Frequency",
    "각 분해능": "Angular Resolution",
    "검출 거리": "Detection Range",
    "인터페이스": "Interface",
    "표시등": "Indicators",
    "보호 등급": "Protection Rating",
    "동작 온도": "Operating Temperature",
    "저장 온도": "Storage Temperature",
    "사이즈": "Dimensions",
    "무게": "Weight"
  };

  function translateProductDetail() {
    var config = productConfigs[getPath()];
    if (!config) return;

    text(".pv-product-sub", config.sub);
    html(".pv-product-desc", config.desc);
    text(".pv-section-head .pv-section-title", config.sectionTitle);
    text(".pv-section-head .pv-section-desc", config.sectionDesc);

    all(".pv-spec-table th").forEach(function (cell) {
      var value = cell.textContent.trim();
      if (specLabels[value]) cell.textContent = specLabels[value];
    });

    all(".pv-spec-table td").forEach(function (cell) {
      var value = cell.textContent.trim();
      var replacements = {
        "4 LEDs(전원, 동작 상태 표시)": "4 LEDs (power and operating status)",
        "5 LEDs(전원, 동작 상태 표시), 7-Segment": "5 LEDs (power and operating status), 7-segment display",
        "5 Input / 최대 3개 감지 영역 설정": "5 inputs / up to 3 detection zones",
        "4 Output(감지 영역 3, 장애 발생 1)": "4 outputs (3 detection zones, 1 fault output)",
        "라이다 출력 설정(시야각, 스캔 주파수, 검출대상)": "LiDAR output configuration (field of view, scan frequency, detection target)",
        "측정 거리 데이터(Point Cloud Data)": "Measured distance data (point-cloud data)"
      };
      if (replacements[value]) cell.textContent = replacements[value];
    });

    translateApplicationCards(".pv-app-card");
    text(".pv-catalog-title", "FMCW LiDAR Solutions for Industrial Environments");
    text(
      ".pv-catalog-desc",
      "Explore PRIVION technology and the complete DL Series lineup. The catalog introduces sensing stability, precision performance, major applications, and practical deployment directions for industrial automation and robotic systems."
    );

    all(".pv-other-card").forEach(function (card) {
      var name = card.querySelector(".pv-other-name");
      var desc = card.querySelector(".pv-other-desc");
      if (!name || !desc) return;
      var model = name.textContent.replace(/\s+/g, "").toUpperCase();
      if (model.indexOf("DL100S") > -1) desc.textContent = "Compact industrial detection and scanning LiDAR";
      else if (model.indexOf("DL100") > -1) desc.textContent = "Compact industrial detection-type LiDAR";
      else if (model.indexOf("DL150S") > -1) desc.textContent = "Outdoor industrial detection and scanning LiDAR";
      else if (model.indexOf("DL150") > -1) desc.textContent = "Outdoor industrial detection-type LiDAR";
    });
  }

  function translateContact() {
    if (getPath() !== "contact.html") return;

    var contactItems = all(".pv-contact-item p");
    if (contactItems[0]) contactItems[0].innerHTML = ADDRESS_EN;
    if (contactItems[1]) contactItems[1].innerHTML = '<a href="tel:+8225892312">+82-2-589-2312</a>';

    all(".pv-map-btn").forEach(function (button) {
      var value = button.textContent.replace(/\s+/g, " ").trim();
      if (value.indexOf("N") === 0) button.lastChild.textContent = " Naver Map";
      if (value.indexOf("K") === 0) button.lastChild.textContent = " Kakao Map";
      if (value.indexOf("G") === 0) button.lastChild.textContent = " Google Maps";
    });

    var mapImage = one(".pv-kakao-map-image");
    if (mapImage) mapImage.setAttribute("aria-label", "View PRIVION location on Kakao Map");
    var mapImg = one(".pv-kakao-map-image img");
    if (mapImg) mapImg.alt = "Map showing the PRIVION office in Pangyo, Seongnam";
    text(".pv-kakao-map-link", "Directions");

    text(".pv-download-title", "Precision Sensing Solutions for Industrial Environments");
    html(
      ".pv-download-desc",
      "Explore PRIVION technology and the complete DL Series product lineup in one document.<br><br>" +
        "The catalog covers detection stability, precision sensing performance, major applications, and product features developed for real industrial environments."
    );
  }

  function translateTerms() {
    if (getPath() !== "terms.html") return;

    text(".pv-policy-title", "Terms of Use");
    var headings = [
      "Article 1. Purpose",
      "Article 2. Services",
      "Article 3. User Obligations",
      "Article 4. Intellectual Property",
      "Article 5. Downloads and Use of Materials",
      "Article 6. Inquiry Services",
      "Article 7. Disclaimer",
      "Article 8. Amendments",
      "Article 9. Governing Law and Jurisdiction"
    ];
    var paragraphs = [
      "These Terms govern the conditions and procedures for using information and services provided through the website operated by PRIVION, as well as the rights, obligations, and responsibilities of users and the company.",
      "The company provides corporate information, technology and product information, application information, inquiry services, and downloadable materials through this website. The company may modify the content, operation, or scope of services when necessary.",
      "Users must comply with applicable laws and these Terms and must not interfere with normal website operation or infringe the rights of others.",
      "All text, images, videos, documents, designs, logos, product information, and other content on this website are owned by the company or their respective rights holders. Users may not reproduce, distribute, modify, transmit, publish, or commercially use such content without prior authorization.",
      "Catalogs, brochures, technical documents, and other materials are provided for informational purposes. Unauthorized modification, redistribution, or commercial use may be restricted. Prior permission is required for uses beyond their intended purpose.",
      "Users may contact the company regarding products, technology, demonstrations, and collaboration through the contact information or inquiry functions provided on the website. The company will respond within a reasonable scope, although responses may be limited depending on the nature of the inquiry.",
      "The company is not liable for service interruptions caused by natural disasters, communications failures, system failures, server maintenance, or other circumstances beyond its reasonable control. Website information may also change without prior notice due to product improvements, technology updates, or operating policies.",
      "The company may amend these Terms when necessary, provided that such amendments do not violate applicable law. Amended Terms become effective when posted on the website.",
      "These Terms are governed by the laws of the Republic of Korea. Disputes arising from website use will be handled in accordance with procedures prescribed by applicable law."
    ];
    all(".pv-policy-content h2").forEach(function (node, index) {
      if (headings[index]) node.textContent = headings[index];
    });
    all(".pv-policy-content p").forEach(function (node, index) {
      if (paragraphs[index]) node.textContent = paragraphs[index];
    });
  }

  function translatePrivacy() {
    if (getPath() !== "privacy.html") return;

    text(".pv-policy-title", "Privacy Policy");
    var headings = [
      "1. Purpose of Processing Personal Information",
      "2. Personal Information Collected",
      "3. Collection Methods",
      "4. Retention and Use Period",
      "5. Disclosure to Third Parties",
      "6. Outsourcing of Personal Information Processing",
      "7. Destruction Procedures and Methods",
      "8. User Rights",
      "9. Security Measures",
      "10. Use of Cookies",
      "11. Privacy Contact",
      "12. Changes to This Privacy Policy"
    ];
    var paragraphs = [
      "PRIVION processes personal information only to the extent necessary to respond to inquiries, provide product and technical materials, improve services, and support customers.",
      "During inquiries and other communications, the company may collect information directly provided by users, including name, company name, contact details, email address, and inquiry content. General browsing does not require account registration.",
      "Personal information is collected when users directly submit information through website inquiry functions, email, telephone, or requests for materials.",
      "Personal information is destroyed without undue delay after the purpose of collection and use has been fulfilled. Information may be retained for periods required by applicable law.",
      "The company does not disclose personal information to third parties as a general rule, except with prior user consent or when disclosure is required by applicable law.",
      "When necessary for website operation, system management, or inquiry support, the company may outsource part of its personal-information processing. Any outsourcing is managed and disclosed in accordance with applicable law.",
      "When the retention period expires or the processing purpose has been fulfilled, personal information is securely destroyed. Electronic files are permanently deleted, and paper documents are shredded or destroyed using equivalent methods.",
      "Users may request access to, correction of, deletion of, or suspension of processing of their personal information. The company will review and process requests in accordance with applicable law.",
      "The company applies appropriate safeguards, including access-control management, security software, and limitations on personnel authorized to handle personal information.",
      "The company may use cookies to analyze website usage and improve services. Users may reject or delete cookies through browser settings, although certain services may be limited when cookies are disabled.",
      "Questions regarding personal-information processing may be submitted to the following contact.<br>Tel +82-2-589-2312<br>Email privion-lidar@dongwon.com",
      "This Privacy Policy may be updated to reflect changes in applicable law, company policy, or website operation. Updates will be announced through the website."
    ];
    all(".pv-policy-content h2").forEach(function (node, index) {
      if (headings[index]) node.textContent = headings[index];
    });
    all(".pv-policy-content p").forEach(function (node, index) {
      if (!paragraphs[index]) return;
      if (index === 10) node.innerHTML = paragraphs[index];
      else node.textContent = paragraphs[index];
    });
  }

  function translateSearch() {
    if (getPath() !== "search.html") return;
    var input = one("#pv-search-input");
    if (input) {
      input.placeholder = "Enter a keyword";
      input.setAttribute("aria-label", "Site search");
    }
    text(".pv-search-empty", "Enter a keyword to view relevant pages.");
  }

  function hideMapPlaceholder() {
    var placeholder = document.querySelector(".pv-map-placeholder");
    if (placeholder) placeholder.style.display = "none";
  }

  function setDownloadLinks() {
    var catalogPath = "assets/download/privion-dl-series-catalog.pdf";
    var downloadLinks = document.querySelectorAll('a[href="/download"], a[href="download"]');
    downloadLinks.forEach(function (link) {
      link.setAttribute("href", catalogPath);
      link.setAttribute("download", "");
    });
  }

  function setMapLinks() {
    var address = encodeURIComponent(ADDRESS_EN);
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
      google.setAttribute("href", "https://www.google.com/maps/search/?api=1&query=" + address);
      google.setAttribute("target", "_blank");
      google.setAttribute("rel", "noopener noreferrer");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectEnglishStyles();
    setPageMetadata();
    translateCommon();
    translateHomeLikePage();
    translateTechnology();
    translateApplication();
    translateProductDetail();
    translateContact();
    translateTerms();
    translatePrivacy();
    translateSearch();
    setActiveNavigation();
    setDownloadLinks();
    setMapLinks();
  });

  window.privionHideMapPlaceholder = hideMapPlaceholder;
})();
