/**
 * ORS 상쇄등록부 방법론 크롤링 스크립트 v2
 * pagerOffset 파라미터로 페이지네이션
 */

import { writeFileSync } from "fs";

const BASE_URL = "https://ors.gir.go.kr/home/orme010/activeList.do";
const MAX_ITEMS = 330;
const PAGE_SIZE = 10;

const allMethodologies = [];

async function fetchPage(offset) {
  const url = `${BASE_URL}?maxPageItems=${PAGE_SIZE}&maxIndexPages=10&menuId=10&pagerOffset=${offset}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      Accept: "text/html",
      "Accept-Language": "ko-KR,ko;q=0.9",
    },
  });

  const html = await res.text();
  return parseMethodologies(html);
}

function parseMethodologies(html) {
  const results = [];

  // <tbody> 내부의 <tr> 파싱
  const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/);
  if (!tbodyMatch) return results;

  const tbody = tbodyMatch[1];
  // 각 행 추출
  const rows = tbody.split(/<tr[^>]*>/);

  for (const row of rows) {
    if (!row.trim() || row.indexOf("<td") < 0) continue;

    // <td> 내용 추출
    const tds = [];
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
    let m;
    while ((m = tdRegex.exec(row)) !== null) {
      tds.push(m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    }

    if (tds.length >= 5 && /^\d+$/.test(tds[0])) {
      // 링크에서 상세 ID 추출
      const linkMatch = row.match(/fn_detail\(['"]([^'"]+)['"]\)/);
      const detailId = linkMatch ? linkMatch[1] : null;

      results.push({
        rowNum: parseInt(tds[0]),
        name: tds[1],
        sectoralScope: tds[2],
        status: tds[3],
        effectiveDate: tds[4],
        detailId,
      });
    }
  }

  return results;
}

async function crawlAll() {
  console.log("=== ORS 방법론 크롤링 v2 (pagerOffset) ===\n");

  for (let offset = 0; offset < MAX_ITEMS; offset += PAGE_SIZE) {
    const items = await fetchPage(offset);
    if (items.length === 0) {
      console.log(`offset=${offset}: 데이터 없음 - 종료`);
      break;
    }

    allMethodologies.push(...items);
    const first = items[0]?.rowNum;
    const last = items[items.length - 1]?.rowNum;
    console.log(
      `offset=${offset}: ${items.length}건 (${first}~${last})`
    );

    // 서버 부하 방지
    await new Promise((r) => setTimeout(r, 300));
  }

  // 중복 제거
  const seen = new Set();
  const unique = allMethodologies.filter((m) => {
    const key = m.rowNum;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`\n총 수집: ${unique.length}건 (중복 제거 후)`);

  // JSON 저장
  writeFileSync(
    "/tmp/ors-methodologies-real.json",
    JSON.stringify(unique, null, 2)
  );
  console.log("저장: /tmp/ors-methodologies-real.json");

  // 통계 출력
  const scopes = {};
  for (const m of unique) {
    const s = m.sectoralScope || "미분류";
    scopes[s] = (scopes[s] || 0) + 1;
  }
  console.log("\n--- 사업분야별 분포 ---");
  Object.entries(scopes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`  ${v}건: ${k}`));
}

crawlAll().catch(console.error);
