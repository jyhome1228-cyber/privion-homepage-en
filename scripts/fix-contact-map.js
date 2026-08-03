const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const filePath = path.resolve(__dirname, '..', 'contact.html');
const source = fs.readFileSync(filePath, 'utf8');
const $ = cheerio.load(source, { decodeEntities: false });

const labels = {
  N: 'Naver Map',
  K: 'Kakao Map',
  G: 'Google Maps'
};

$('.pv-map-btn').each((_, element) => {
  const button = $(element);
  const icon = button.find('.pv-map-btn-icon').first();
  const current = icon.text().trim();
  const key = current.charAt(0).toUpperCase();
  const label = labels[key];

  if (!label) return;

  icon.text(key);
  button.contents().filter((__, node) => node.type === 'text').remove();
  button.append(` ${label}`);
});

$('.pv-kakao-map-footer a').first().attr('aria-label', 'Open Kakao Map');
$('.pv-kakao-map-logo').attr('alt', 'Kakao Map');
$('.pv-kakao-map-link').text('Directions');

const output = '<!doctype html>\n' + $.html().replace(/^<!DOCTYPE html>\s*/i, '');
fs.writeFileSync(filePath, output, 'utf8');
console.log('Cleaned contact map labels');
