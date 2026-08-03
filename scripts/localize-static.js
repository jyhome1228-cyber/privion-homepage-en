const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.resolve(__dirname, '..');
const PAGES = [
  'index.html',
  'technology.html',
  'product.html',
  'product-dl100.html',
  'product-dl100s.html',
  'product-dl150.html',
  'product-dl150s.html',
  'application.html',
  'contact.html',
  'search.html',
  'terms.html',
  'privacy.html'
];

const ADDRESS_EN = 'Suite 604, 6F, Building B, Pangyo Innovalley, 621 Sampyeong-dong, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea';

const META = {
  'index.html': ['PRIVION | Industrial FMCW LiDAR by Dongwon Group', 'PRIVION delivers compact and reliable industrial FMCW LiDAR solutions for automation, robotics, autonomous mobility, and smart infrastructure.'],
  'product.html': ['Products | PRIVION Industrial FMCW LiDAR', 'Explore the PRIVION DL Series industrial FMCW LiDAR lineup, including DL100, DL100S, DL150, and DL150S.'],
  'technology.html': ['FMCW LiDAR Technology | PRIVION', 'Discover PRIVION FMCW LiDAR technology for simultaneous distance and velocity measurement, interference resistance, and reliable industrial sensing.'],
  'application.html': ['Industrial Applications | PRIVION FMCW LiDAR', 'Explore PRIVION FMCW LiDAR applications across AMR and AGV, OHT, port cranes, smart farms, heavy machinery, and smart cities.'],
  'contact.html': ['Contact | PRIVION', 'Contact PRIVION for industrial FMCW LiDAR products, technical consultation, demonstrations, and partnership inquiries.'],
  'search.html': ['Search | PRIVION', 'Search PRIVION products, technology, applications, downloads, and company information.'],
  'terms.html': ['Terms of Use | PRIVION', 'Terms of use for the PRIVION website.'],
  'privacy.html': ['Privacy Policy | PRIVION', 'Privacy policy for the PRIVION website.'],
  'product-dl100.html': ['LiDAR DL100 | PRIVION', 'DL100 is a compact industrial detection-type FMCW LiDAR for indoor AGV and AMR safety applications.'],
  'product-dl100s.html': ['LiDAR DL100S | PRIVION', 'DL100S is a compact industrial detection and scanning FMCW LiDAR with point-cloud data output.'],
  'product-dl150.html': ['LiDAR DL150 | PRIVION', 'DL150 is an IP67 industrial detection-type FMCW LiDAR engineered for reliable outdoor sensing up to 20 meters.'],
  'product-dl150s.html': ['LiDAR DL150S | PRIVION', 'DL150S is an IP67 industrial detection and scanning FMCW LiDAR with point-cloud output for outdoor systems.']
};

const APPLICATION_COPY = {
  'AMR / AGV': 'Supports stable autonomous navigation for AMRs and AGVs. In indoor industrial environments and SLAM-based navigation systems, it provides precise perception for both mobility and operational safety.',
  OHT: 'Provides reliable sensing for overhead transport systems in precision manufacturing environments. Fine positional differences can be detected to support stable OHT operation.',
  'Port Cranes': 'Provides precise sensing around port cranes and large structures, enabling stable recognition of surrounding structures and crane positions even in outdoor environments with multiple reflectors.',
  'Smart Farm': 'Delivers stable sensing data for agricultural machinery and automated equipment in environments with elevation changes, vegetation, and complex reflective conditions.',
  'Heavy Machinery': 'Detects surrounding obstacles and operating zones in demanding mining, construction, and civil-engineering environments, supporting both operator safety and automated equipment operation.',
  'Smart City': 'Recognizes people, vehicles, and infrastructure within complex urban environments and supports precision sensing systems for smart-city infrastructure.'
};

const PRODUCT_CONFIGS = {
  'product-dl100.html': {
    sub: 'Compact Industrial Detection-Type LiDAR',
    desc: 'DL100 provides reliable obstacle detection for indoor automation environments where AGVs and AMRs operate.<br>It maintains consistent performance against potential indoor false-detection factors such as dust and sunlight entering through windows.<br>With a detection range of up to 10 meters, it is well suited to mobile-robot safety-zone monitoring.',
    sectionTitle: 'FMCW LiDAR Solutions for Diverse Industrial Applications',
    sectionDesc: 'PRIVION LiDAR products are designed around the structures and requirements of real industrial applications. DL100 delivers stable obstacle detection for indoor automation and robotic systems with a compact footprint and a detection range of up to 10 meters.'
  },
  'product-dl100s.html': {
    sub: 'Compact Industrial Detection and Scanning LiDAR',
    desc: 'DL100S combines the obstacle-detection capabilities of DL100 with direct raw point-cloud data output.<br>It is suited to data-driven applications such as SLAM mapping and spatial perception as well as obstacle detection.<br>It supports both reliable sensing and spatial-data utilization in indoor AGV and AMR environments.',
    sectionTitle: 'FMCW LiDAR Solutions for Diverse Industrial Applications',
    sectionDesc: 'PRIVION LiDAR products are designed around the structures and requirements of real industrial applications. DL100S supports both obstacle detection and point-cloud output for SLAM, spatial perception, and mapping systems.'
  },
  'product-dl150.html': {
    sub: 'Outdoor Industrial Detection-Type LiDAR',
    desc: 'DL150 provides reliable detection in outdoor environments through its IP67 dust- and water-resistant design.<br>It maintains a detection range of up to 20 meters under demanding conditions including snow, rain, and strong sunlight.<br>It is suited to outdoor mobile robots, cranes, and fixed industrial equipment.',
    sectionTitle: 'FMCW LiDAR Solutions for Diverse Outdoor Applications',
    sectionDesc: 'DL150 combines IP67 protection with a detection range of up to 20 meters, making it suitable for outdoor mobile robots, cranes, fixed equipment, and other systems that require reliable obstacle detection in external environments.'
  },
  'product-dl150s.html': {
    sub: 'Outdoor Industrial Detection and Scanning LiDAR',
    desc: 'DL150S combines the detection capabilities of DL150 with direct raw point-cloud data output.<br>Outdoor mobile robots, mobile cranes, and other equipment can use distance, velocity, and spatial data together with obstacle detection.<br>It is suited to advanced systems that require mapping and localization.',
    sectionTitle: 'FMCW LiDAR Solutions for Diverse Outdoor Applications',
    sectionDesc: 'DL150S combines IP67 protection, a detection range of up to 20 meters, and point-cloud data output for outdoor systems that require both obstacle detection and spatial-data processing.'
  }
};

const SPEC_LABELS = {
  '전원': 'Power Supply',
  '계측 방식': 'Measurement Method',
  '광원': 'Light Source',
  '수평 시야각': 'Horizontal Field of View',
  '스캔 주파수': 'Scan Frequency',
  '각 분해능': 'Angular Resolution',
  '검출 거리': 'Detection Range',
  '인터페이스': 'Interface',
  '표시등': 'Indicators',
  '보호 등급': 'Protection Rating',
  '동작 온도': 'Operating Temperature',
  '저장 온도': 'Storage Temperature',
  '사이즈': 'Dimensions',
  '무게': 'Weight'
};

function ensureMeta($, attr, key, value) {
  let node = $(`meta[${attr}="${key}"]`).first();
  if (!node.length) {
    $('head').append(`<meta ${attr}="${key}">`);
    node = $(`meta[${attr}="${key}"]`).first();
  }
  node.attr('content', value);
}

function common($, file) {
  $('html').attr('lang', 'en');

  if (!$('link[href="assets/css/privion-en.css"]').length) {
    $('head').append('\n<link rel="stylesheet" href="assets/css/privion-en.css">\n');
  }

  const meta = META[file];
  if (meta) {
    $('title').text(meta[0]);
    ensureMeta($, 'name', 'description', meta[1]);
    ensureMeta($, 'name', 'keywords', 'PRIVION, FMCW LiDAR, industrial LiDAR, LiDAR sensor, automation, robotics, AGV, AMR');
    ensureMeta($, 'name', 'author', 'PRIVION');
    ensureMeta($, 'name', 'telephone', '+82-2-589-2312');
    ensureMeta($, 'property', 'og:title', meta[0]);
    ensureMeta($, 'property', 'og:description', meta[1]);
    ensureMeta($, 'property', 'og:site_name', 'PRIVION');
    ensureMeta($, 'name', 'twitter:title', meta[0]);
    ensureMeta($, 'name', 'twitter:description', meta[1]);
  }

  const nav = {
    'technology.html': 'Technology',
    'product.html': 'Products',
    'application.html': 'Applications',
    'contact.html': 'Contact'
  };
  $('.pv-nav a').each((_, el) => {
    const href = ($(el).attr('href') || '').split('/').pop();
    if (nav[href]) $(el).text(nav[href]);
  });

  $('.pv-logo').attr('aria-label', 'PRIVION Home');
  $('.pv-logo-image').attr('alt', 'PRIVION');
  $('.pv-footer-info').html(`Dongwon Industries Co., Ltd.<br>Web www.privionlidar.com<br>Tel +82-2-589-2312<br>Email privion-lidar@dongwon.com<br>Address ${ADDRESS_EN}`);
  $('.pv-footer-links a[href="terms.html"]').text('Terms of Use');
  $('.pv-footer-links a[href="privacy.html"]').text('Privacy Policy');
  $('.pv-copy').text('Copyright © PRIVION. All rights reserved.');

  $('.pv-btn').each((_, el) => {
    if ($(el).text().trim().toLowerCase() === 'view more') $(el).text('View More');
  });

  $('.pv-feature-icon-item span, .pv-other-icon-item span, .pv-home-product-icon-item span').each((_, el) => {
    const value = $(el).text().trim();
    if (value === '감지') $(el).text('Detection');
    if (value === '스캔') $(el).text('Scanning');
  });
  $('img[alt="감지 아이콘"]').attr('alt', 'Detection icon');
  $('img[alt="스캔 아이콘"]').attr('alt', 'Scanning icon');
}

function home($) {
  if (!$('.pv-home-intro').length) return;
  $('.pv-home-intro-sub').first().text('Engineered for Industrial Environments');
  $('.pv-home-intro-desc').first().html('The DL Series is an FMCW LiDAR platform engineered for reliable detection in complex industrial environments.<br>Its robust architecture and precise signal-processing technology deliver stable sensing performance for automation and robotic systems.<br>It is designed to capture both distance and velocity data with greater accuracy.');

  const descriptions = [
    'Compact industrial detection-type LiDAR',
    'Compact industrial detection and scanning LiDAR',
    'Outdoor industrial detection-type LiDAR',
    'Outdoor industrial detection and scanning LiDAR'
  ];
  $('.pv-home-product-desc').each((i, el) => {
    if (descriptions[i]) $(el).text(descriptions[i]);
  });

  $('.pv-home-feature-title').first().text('Reliable Detection Performance in Complex Industrial Environments');
  $('.pv-home-feature-desc').first().html('The DL Series is engineered to maintain stable sensing performance across demanding industrial conditions.<br>Its robust architecture and precision signal processing provide accurate distance and velocity data.');
  const features = [
    'Stable detection under changing environmental conditions',
    'Simultaneous distance and velocity measurement',
    'Optimized for industrial automation systems'
  ];
  $('.pv-home-feature-box').each((i, el) => {
    if (features[i]) $(el).text(features[i]);
  });
}

function technology($) {
  $('.pv-tech-subtitle').text('PRIVION DL Series — FMCW LiDAR for Industrial Environments');
  $('.pv-tech-desc').html('The DL Series maintains reliable detection performance in conditions where conventional LiDAR may be vulnerable, including snow, rain, intense sunlight, dust, and smoke.<br>Based on frequency-modulated continuous-wave technology, it analyzes the frequency characteristics of reflected signals to measure distance and velocity simultaneously.');

  const rows = [
    ['01 Optimized for Large-Scale Automation', 'Each DL Series LiDAR uses a unique signal pattern. Even when many AGVs and AMRs operate in a dense environment, the sensors remain resistant to mutual interference regardless of fleet size. Systems can be deployed freely without additional anti-interference design or restrictive sensor placement.'],
    ['02 Distance and Velocity from a Single Sensor', 'Distance and velocity of moving objects are measured simultaneously, eliminating the need for a separate velocity sensor. This simplifies system architecture and improves response speed in applications such as cranes and AMRs.'],
    ['03 Reliable Detection of Challenging Materials', 'The DL Series addresses common LiDAR challenges such as diffuse reflections from metal surfaces and low reflectivity from black materials through a high-power 1550 nm wavelength and precise FMCW signal analysis. Objects can be detected accurately even when reflected signals are weak or irregular.']
  ];
  $('.pv-tech-row').each((i, el) => {
    if (!rows[i]) return;
    $(el).find('.pv-tech-row-title').text(rows[i][0]);
    $(el).find('.pv-tech-row-text').text(rows[i][1]);
  });

  $('.pv-tech-note').text('Industrial LiDAR must maintain reliable detection not only under simple test conditions but also around complex metal structures and difficult environments. Fog, external light sources, mirror-like surfaces, strong ambient light, and multiple reflectors can reduce detection performance and introduce signal interference in conventional ToF LiDAR. These limitations require sensing and signal-processing architectures designed specifically for industrial environments.');

  const labels = ['Operating Principle', 'Velocity Measurement', 'Interference Immunity', 'Resolution / Accuracy', 'Adverse Weather', 'Primary Wavelength'];
  $('.pv-compare-labels span').each((i, el) => {
    if (labels[i]) $(el).text(labels[i]);
  });

  const compare = [
    [
      ['Frequency-Modulated Continuous Wave', 'A continuously emitted laser changes frequency linearly. Distance and velocity are calculated simultaneously from the frequency difference between the transmitted and reflected waves.'],
      ['Velocity Measurement Using the Doppler Effect', 'Distance and velocity information are precisely separated and extracted from the frequency difference between the transmitted and reflected signals.'],
      ['Strong Interference Immunity', 'Coherent detection provides robust resistance to ambient light and mutual interference between sensors.'],
      ['High Resolution and Accuracy', 'High-resolution, high-accuracy distance measurement supports stable detection in industrial environments.'],
      ['Performance in Adverse Conditions', 'Signal processing remains comparatively stable in fog, external light, and complex reflective environments.'],
      ['1550 nm', 'This eye-safe wavelength range enables higher optical power and robust signal processing in outdoor environments.']
    ],
    [
      ['Pulsed Time-of-Flight', 'Laser pulses are emitted and distance is calculated from the time required for the reflected light to return from an object.'],
      ['Time-Based Distance Calculation', 'Processing is primarily based on distance data and can be affected by environmental conditions.'],
      ['More Susceptible to Interference', 'Performance may be affected by reflected-light frequencies or pulses from other LiDAR sensors.'],
      ['Limitations in Long-Range Precision', 'Maintaining precision over long distances can be difficult and performance may be affected by external conditions.'],
      ['Affected by Environmental Changes', 'Fog, intense ambient light, and environments with many reflectors can introduce scattering and absorption.'],
      ['905 nm', 'Signal absorption and scattering may reduce performance under certain environmental conditions.']
    ]
  ];
  $('.pv-compare-card').each((cardIndex, card) => {
    $(card).find('.pv-compare-item').each((i, item) => {
      const value = compare[cardIndex] && compare[cardIndex][i];
      if (!value) return;
      $(item).find('strong').text(value[0]);
      $(item).find('p').text(value[1]);
    });
  });
  $('.pv-compare-footnote').html("Doppler effect: The apparent change in frequency and wavelength caused by relative motion between a wave source and an observer.<br>Coherent detection: A receiving method that recognizes a signal's unique self-interference pattern, enabling stable detection under ambient-light and interference conditions.");
}

function applicationCards($, selector) {
  $(selector).each((_, card) => {
    const title = $(card).find('h2, h3').first().text().trim();
    if (APPLICATION_COPY[title]) $(card).find('p').first().text(APPLICATION_COPY[title]);
  });
}

function application($) {
  $('.pv-application-title').html('Industrial FMCW LiDAR Solutions<br>for Diverse Applications');
  $('.pv-application-desc').html('PRIVION LiDAR products are engineered around the structural and operational requirements of real industrial applications.<br>Advanced FMCW sensing provides accurate distance and velocity data for complex automation environments across indoor and outdoor conditions.<br><br>From AMR-based automation and material-handling systems to agricultural, construction, and urban infrastructure, each solution is designed around the functions and usability required in the field.');
  applicationCards($, '.pv-application-item');
  $('.pv-download-title').text('Precision Sensing Solutions for Industrial Environments');
  $('.pv-download-desc').html('Explore PRIVION technology and the complete DL Series product lineup in one document.<br><br>The catalog covers detection stability, precision sensing performance, major applications, and product features developed for real industrial environments.');
}

function productDetail($, file) {
  const config = PRODUCT_CONFIGS[file];
  if (!config) return;

  $('.pv-product-sub').text(config.sub);
  $('.pv-product-desc').html(config.desc);
  $('.pv-section-head .pv-section-title').first().text(config.sectionTitle);
  $('.pv-section-head .pv-section-desc').first().text(config.sectionDesc);

  $('.pv-spec-table th').each((_, el) => {
    const value = $(el).text().trim();
    if (SPEC_LABELS[value]) $(el).text(SPEC_LABELS[value]);
  });

  const values = {
    '4 LEDs(전원, 동작 상태 표시)': '4 LEDs (power and operating status)',
    '5 LEDs(전원, 동작 상태 표시), 7-Segment': '5 LEDs (power and operating status), 7-segment display',
    '5 Input / 최대 3개 감지 영역 설정': '5 inputs / up to 3 detection zones',
    '4 Output(감지 영역 3, 장애 발생 1)': '4 outputs (3 detection zones, 1 fault output)',
    '라이다 출력 설정(시야각, 스캔 주파수, 검출대상)': 'LiDAR output configuration (field of view, scan frequency, detection target)',
    '측정 거리 데이터(Point Cloud Data)': 'Measured distance data (point-cloud data)'
  };
  $('.pv-spec-table td').each((_, el) => {
    const value = $(el).text().trim();
    if (values[value]) $(el).text(values[value]);
  });

  applicationCards($, '.pv-app-card');
  $('.pv-catalog-title').text('FMCW LiDAR Solutions for Industrial Environments');
  $('.pv-catalog-desc').text('Explore PRIVION technology and the complete DL Series lineup. The catalog introduces sensing stability, precision performance, major applications, and practical deployment directions for industrial automation and robotic systems.');

  $('.pv-other-card').each((_, card) => {
    const model = $(card).find('.pv-other-name').text().replace(/\s+/g, '').toUpperCase();
    const target = $(card).find('.pv-other-desc');
    if (model.includes('DL100S')) target.text('Compact industrial detection and scanning LiDAR');
    else if (model.includes('DL100')) target.text('Compact industrial detection-type LiDAR');
    else if (model.includes('DL150S')) target.text('Outdoor industrial detection and scanning LiDAR');
    else if (model.includes('DL150')) target.text('Outdoor industrial detection-type LiDAR');
  });
}

function contact($) {
  const items = $('.pv-contact-item p');
  if (items.eq(0).length) items.eq(0).text(ADDRESS_EN);
  if (items.eq(1).length) items.eq(1).html('<a href="tel:+8225892312">+82-2-589-2312</a>');

  $('.pv-map-btn').each((_, el) => {
    const icon = $(el).find('.pv-map-btn-icon').text().trim();
    if (icon === 'N') $(el).contents().filter((__, n) => n.type === 'text').remove().end().append(' Naver Map');
    if (icon === 'K') $(el).contents().filter((__, n) => n.type === 'text').remove().end().append(' Kakao Map');
    if (icon === 'G') $(el).contents().filter((__, n) => n.type === 'text').remove().end().append(' Google Maps');
  });

  $('.pv-kakao-map-image').attr('aria-label', 'View PRIVION location on Kakao Map');
  $('.pv-kakao-map-image img').attr('alt', 'Map showing the PRIVION office in Pangyo, Seongnam');
  $('.pv-kakao-map-link').text('Directions');
  $('.pv-download-title').text('Precision Sensing Solutions for Industrial Environments');
  $('.pv-download-desc').html('Explore PRIVION technology and the complete DL Series product lineup in one document.<br><br>The catalog covers detection stability, precision sensing performance, major applications, and product features developed for real industrial environments.');
}

function terms($) {
  $('.pv-policy-title').text('Terms of Use');
  const headings = ['Article 1. Purpose', 'Article 2. Services', 'Article 3. User Obligations', 'Article 4. Intellectual Property', 'Article 5. Downloads and Use of Materials', 'Article 6. Inquiry Services', 'Article 7. Disclaimer', 'Article 8. Amendments', 'Article 9. Governing Law and Jurisdiction'];
  const paragraphs = [
    'These Terms govern the conditions and procedures for using information and services provided through the website operated by PRIVION, as well as the rights, obligations, and responsibilities of users and the company.',
    'The company provides corporate information, technology and product information, application information, inquiry services, and downloadable materials through this website. The company may modify the content, operation, or scope of services when necessary.',
    'Users must comply with applicable laws and these Terms and must not interfere with normal website operation or infringe the rights of others.',
    'All text, images, videos, documents, designs, logos, product information, and other content on this website are owned by the company or their respective rights holders. Users may not reproduce, distribute, modify, transmit, publish, or commercially use such content without prior authorization.',
    'Catalogs, brochures, technical documents, and other materials are provided for informational purposes. Unauthorized modification, redistribution, or commercial use may be restricted. Prior permission is required for uses beyond their intended purpose.',
    'Users may contact the company regarding products, technology, demonstrations, and collaboration through the contact information or inquiry functions provided on the website. The company will respond within a reasonable scope, although responses may be limited depending on the nature of the inquiry.',
    'The company is not liable for service interruptions caused by natural disasters, communications failures, system failures, server maintenance, or other circumstances beyond its reasonable control. Website information may also change without prior notice due to product improvements, technology updates, or operating policies.',
    'The company may amend these Terms when necessary, provided that such amendments do not violate applicable law. Amended Terms become effective when posted on the website.',
    'These Terms are governed by the laws of the Republic of Korea. Disputes arising from website use will be handled in accordance with procedures prescribed by applicable law.'
  ];
  $('.pv-policy-content h2').each((i, el) => { if (headings[i]) $(el).text(headings[i]); });
  $('.pv-policy-content p').each((i, el) => { if (paragraphs[i]) $(el).text(paragraphs[i]); });
}

function privacy($) {
  $('.pv-policy-title').text('Privacy Policy');
  const headings = ['1. Purpose of Processing Personal Information', '2. Personal Information Collected', '3. Collection Methods', '4. Retention and Use Period', '5. Disclosure to Third Parties', '6. Outsourcing of Personal Information Processing', '7. Destruction Procedures and Methods', '8. User Rights', '9. Security Measures', '10. Use of Cookies', '11. Privacy Contact', '12. Changes to This Privacy Policy'];
  const paragraphs = [
    'PRIVION processes personal information only to the extent necessary to respond to inquiries, provide product and technical materials, improve services, and support customers.',
    'During inquiries and other communications, the company may collect information directly provided by users, including name, company name, contact details, email address, and inquiry content. General browsing does not require account registration.',
    'Personal information is collected when users directly submit information through website inquiry functions, email, telephone, or requests for materials.',
    'Personal information is destroyed without undue delay after the purpose of collection and use has been fulfilled. Information may be retained for periods required by applicable law.',
    'The company does not disclose personal information to third parties as a general rule, except with prior user consent or when disclosure is required by applicable law.',
    'When necessary for website operation, system management, or inquiry support, the company may outsource part of its personal-information processing. Any outsourcing is managed and disclosed in accordance with applicable law.',
    'When the retention period expires or the processing purpose has been fulfilled, personal information is securely destroyed. Electronic files are permanently deleted, and paper documents are shredded or destroyed using equivalent methods.',
    'Users may request access to, correction of, deletion of, or suspension of processing of their personal information. The company will review and process requests in accordance with applicable law.',
    'The company applies appropriate safeguards, including access-control management, security software, and limitations on personnel authorized to handle personal information.',
    'The company may use cookies to analyze website usage and improve services. Users may reject or delete cookies through browser settings, although certain services may be limited when cookies are disabled.',
    'Questions regarding personal-information processing may be submitted to the following contact.<br>Tel +82-2-589-2312<br>Email privion-lidar@dongwon.com',
    'This Privacy Policy may be updated to reflect changes in applicable law, company policy, or website operation. Updates will be announced through the website.'
  ];
  $('.pv-policy-content h2').each((i, el) => { if (headings[i]) $(el).text(headings[i]); });
  $('.pv-policy-content p').each((i, el) => {
    if (!paragraphs[i]) return;
    if (i === 10) $(el).html(paragraphs[i]);
    else $(el).text(paragraphs[i]);
  });
}

function search($) {
  $('#pv-search-input').attr({ placeholder: 'Enter a keyword', 'aria-label': 'Site search' });
  $('.pv-search-empty').text('Enter a keyword to view relevant pages.');
}

for (const file of PAGES) {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) continue;
  const source = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(source, { decodeEntities: false });

  common($, file);
  home($);
  if (file === 'technology.html') technology($);
  if (file === 'application.html') application($);
  if (PRODUCT_CONFIGS[file]) productDetail($, file);
  if (file === 'contact.html') contact($);
  if (file === 'terms.html') terms($);
  if (file === 'privacy.html') privacy($);
  if (file === 'search.html') search($);

  const output = '<!doctype html>\n' + $.html().replace(/^<!DOCTYPE html>\s*/i, '');
  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`Localized ${file}`);
}
