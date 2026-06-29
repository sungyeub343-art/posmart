// 여비POS — script.js

// ── Header scroll shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile nav toggle
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');
ham.addEventListener('click', () => mobileNav.classList.toggle('open'));
document.querySelectorAll('.mnav-link').forEach(el =>
  el.addEventListener('click', () => mobileNav.classList.remove('open'))
);
document.addEventListener('click', e => {
  if (!header.contains(e.target)) mobileNav.classList.remove('open');
});

// ── Solution tabs
document.querySelectorAll('.sol-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.tab;
    document.querySelectorAll('.sol-tab').forEach(b => b.classList.remove('on'));
    document.querySelectorAll('.sol-panel').forEach(p => p.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('sol-' + id).classList.add('on');
  });
});

// ── FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const ans  = item.querySelector('.faq-a');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!open) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 48 + 'px';
    }
  });
});

// ── Scroll-reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    io.unobserve(e.target);
  });
}, { threshold: 0.08 });
document.querySelectorAll(
  '.prod-card, .why-card, .price-card, .rv-card, .faq-item, .hero-card'
).forEach((el, i) => {
  el.style.transitionDelay = (i % 5) * 60 + 'ms';
  el.classList.add('reveal');
  io.observe(el);
});
const s = document.createElement('style');
s.textContent = `.reveal{opacity:0;transform:translateY(24px);transition:opacity .5s ease,transform .5s ease}.reveal.visible{opacity:1;transform:none}`;
document.head.appendChild(s);

// ============================================================
//  지역별 설치 안내
// ============================================================

const SIDO_DATA = {
  '서울': {
    label: '서울특별시',
    districts: ['강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구']
  },
  '인천': {
    label: '인천광역시',
    districts: ['중구','동구','미추홀구','연수구','남동구','부평구','계양구','서구','강화군','옹진군']
  },
  '경기': {
    label: '경기도',
    districts: [
      '수원시 장안구','수원시 권선구','수원시 팔달구','수원시 영통구',
      '성남시 수정구','성남시 중원구','성남시 분당구',
      '의정부시',
      '안양시 만안구','안양시 동안구',
      '부천시','광명시','평택시','동두천시',
      '안산시 상록구','안산시 단원구',
      '고양시 덕양구','고양시 일산동구','고양시 일산서구',
      '과천시','구리시','남양주시','오산시','시흥시','군포시','의왕시','하남시',
      '용인시 처인구','용인시 기흥구','용인시 수지구',
      '파주시','이천시','안성시','김포시','화성시','광주시','양주시','포천시','여주시'
    ]
  },
  '부산': {
    label: '부산광역시',
    districts: ['중구','서구','동구','영도구','부산진구','동래구','남구','북구','해운대구','사하구','금정구','강서구','연제구','수영구','사상구','기장군']
  },
  '대구': {
    label: '대구광역시',
    districts: ['중구','동구','서구','남구','북구','수성구','달서구','달성군']
  },
  '대전': {
    label: '대전광역시',
    districts: ['동구','중구','서구','유성구','대덕구']
  },
  '광주': {
    label: '광주광역시',
    districts: ['동구','서구','남구','북구','광산구']
  },
  '울산': {
    label: '울산광역시',
    districts: ['중구','남구','동구','북구','울주군']
  },
  '세종': {
    label: '세종특별자치시',
    districts: ['세종시']
  },
  '경북': {
    label: '경상북도',
    districts: [
      '포항시 남구','포항시 북구',
      '경주시','김천시','안동시','구미시','영주시','영천시','상주시','문경시','경산시',
      '군위군','의성군','청송군','영양군','영덕군','청도군','고령군','성주군','칠곡군','예천군','봉화군','울진군','울릉군'
    ]
  },
  '경남': {
    label: '경상남도',
    districts: [
      '창원시 의창구','창원시 성산구','창원시 마산합포구','창원시 마산회원구','창원시 진해구',
      '진주시','통영시','사천시','김해시','밀양시','거제시','양산시',
      '의령군','함안군','창녕군','고성군','남해군','하동군','산청군','함양군','거창군','합천군'
    ]
  },
  '전북': {
    label: '전라북도',
    districts: [
      '전주시 완산구','전주시 덕진구',
      '군산시','익산시','정읍시','남원시','김제시',
      '완주군','진안군','무주군','장수군','임실군','순창군','고창군','부안군'
    ]
  },
  '전남': {
    label: '전라남도',
    districts: ['목포시','여수시','순천시','나주시','광양시','담양군','곡성군','구례군','고흥군','보성군','화순군','장흥군','강진군','해남군','영암군','무안군','함평군','영광군','장성군','완도군','진도군','신안군']
  },
  '충북': {
    label: '충청북도',
    districts: [
      '청주시 상당구','청주시 서원구','청주시 흥덕구','청주시 청원구',
      '충주시','제천시','보은군','옥천군','영동군','증평군','진천군','괴산군','음성군','단양군'
    ]
  },
  '충남': {
    label: '충청남도',
    districts: [
      '천안시 동남구','천안시 서북구',
      '공주시','보령시','아산시','서산시','논산시','계룡시','당진시',
      '금산군','부여군','서천군','청양군','홍성군','예산군','태안군'
    ]
  },
  '강원': {
    label: '강원특별자치도',
    districts: ['춘천시','원주시','강릉시','동해시','태백시','속초시','삼척시','홍천군','횡성군','영월군','평창군','정선군','철원군','화천군','양구군','인제군','고성군','양양군']
  },
  '제주': {
    label: '제주특별자치도',
    districts: ['제주시','서귀포시']
  }
};

// 제품 탭별 이미지 매핑
const PROD_IMG = {
  'pos':     'img-pos.jfif',
  'table':   'img-table.jfif',
  'kiosk':   'img-vending.jfif'
};

// 현재 선택 상태
let currentSido = null;
let currentCity = null;

const rgSigungu     = document.getElementById('rgSigungu');
const rgSigunguTitle = document.getElementById('rgSigunguTitle');
const rgSigunguCount = document.getElementById('rgSigunguCount');
const rgSigunguTags  = document.getElementById('rgSigunguTags');
const rgDetail      = document.getElementById('rgDetail');

// 시·도 버튼 클릭
document.querySelectorAll('.sido-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sido = btn.dataset.sido;
    if (currentSido === sido) {
      // 같은 버튼 재클릭 → 닫기
      btn.classList.remove('on');
      rgSigungu.style.display = 'none';
      rgDetail.style.display  = 'none';
      currentSido = null;
      currentCity = null;
      return;
    }
    document.querySelectorAll('.sido-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    currentSido = sido;
    currentCity = null;

    const data = SIDO_DATA[sido];
    rgSigunguTitle.textContent = data.label;
    rgSigunguCount.textContent = data.districts.length + '개 시·군·구';

    rgSigunguTags.innerHTML = data.districts.map(d =>
      `<button class="sigungu-tag" data-sido="${sido}" data-city="${d}">${d}</button>`
    ).join('');

    rgSigunguTags.querySelectorAll('.sigungu-tag').forEach(t =>
      t.addEventListener('click', () => {
        const prodKey = getActiveProdKey();
        window.location.href =
          'region.html?sido=' + encodeURIComponent(t.dataset.sido) +
          '&city='            + encodeURIComponent(t.dataset.city) +
          '&prod='            + prodKey;
      })
    );

    rgSigungu.style.display = 'block';
    rgDetail.style.display  = 'none';
    rgSigungu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

// 제품 탭 key 반환
function getActiveProdKey() {
  return document.querySelector('.rg-ptab.on')?.dataset.prod || 'pos';
}

// 상세 이미지 업데이트
function updateDetailImg() {
  const img = document.getElementById('rgDetailImg');
  if (!img) return;
  const key = getActiveProdKey();
  img.src = PROD_IMG[key] || PROD_IMG['pos'];
  const labels = { pos: '포스기 설치', table: '테이블오더 설치', kiosk: '무인자판기 설치' };
  img.alt = labels[key] || '설치 사진';
}

// 도시 상세 표시
function showCityDetail(sido, city) {
  const data = SIDO_DATA[sido];
  currentCity = city;

  // 선택 강조
  document.querySelectorAll('.sigungu-tag').forEach(t =>
    t.style.background = t.dataset.city === city ? 'var(--blue)' : ''
  );
  document.querySelectorAll('.sigungu-tag').forEach(t =>
    t.style.color = t.dataset.city === city ? '#fff' : ''
  );
  document.querySelectorAll('.sigungu-tag').forEach(t =>
    t.style.borderColor = t.dataset.city === city ? 'var(--blue)' : ''
  );

  // 현재 제품 탭
  const activeProd = document.querySelector('.rg-ptab.on')?.textContent.trim() || '포스기·카드단말기';
  const prodName = activeProd.replace(/^[^\s]+\s/, '');

  document.getElementById('rgDetailSido').textContent  = data.label;
  document.getElementById('rgDetailCity').textContent  = city;
  document.getElementById('rgDetailBadge').textContent = data.label + ' ' + city;
  const prodKey = getActiveProdKey();
  const PROD_TEXT = {
    pos: {
      title: city + ' 카드단말기·포스기 설치 전문',
      desc:  city + ' 전역에 카드단말기·포스기·키오스크·토스페이결제기·무인자판기를 설치비 무료, 평균 4일 이내 방문 설치해 드립니다.'
    },
    table: {
      title: city + ' 테이블오더 설치 전문',
      desc:  city + ' 전역에 테이블오더를 설치비 무료, 평균 4일 이내 방문 설치해 드립니다. QR 셀프 주문·결제로 인건비를 절감하고 운영 효율을 높여 드립니다.'
    },
    kiosk: {
      title: city + ' 무인자판기 설치 전문',
      desc:  city + ' 전역에 무인자판기를 설치비 무료, 평균 4일 이내 방문 설치해 드립니다. 24시간 무인 운영으로 인건비 없이 안정적인 수익을 창출할 수 있습니다.'
    }
  };
  const pt = PROD_TEXT[prodKey] || PROD_TEXT.pos;
  document.getElementById('rgDetailTitle').textContent = pt.title;
  document.getElementById('rgDetailDesc').textContent  = pt.desc;

  // 실시간 상담 랜덤 (8~23)
  document.getElementById('rgLiveCount').textContent = Math.floor(Math.random() * 16) + 8;

  // 키워드
  const keywords = [
    city + ' 카드단말기', city + ' 포스기', city + ' 키오스크',
    city + ' 무인자판기', city + ' 무선 단말기', city + ' 블루투스 단말기',
    city + ' 토스페이', city + ' 토스페이결제', city + ' 토스결제기',
    city + ' 이동식단말기', city + ' 휴대용단말기', city + ' 테이블오더'
  ];
  document.getElementById('rgKeywords').innerHTML =
    keywords.map(k => `<span class="rg-kw" onclick="location.href='tel:010-2928-3614'">${k}</span>`).join('');

  updateDetailImg();
  rgDetail.style.display = 'block';
  rgDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// breadcrumb 홈 클릭 → 초기화
function resetRegion() {
  document.querySelectorAll('.sido-btn').forEach(b => b.classList.remove('on'));
  rgSigungu.style.display = 'none';
  rgDetail.style.display  = 'none';
  currentSido = null;
  currentCity = null;
  document.getElementById('regions').scrollIntoView({ behavior: 'smooth' });
}

// 검색 자동완성
const rgSearch  = document.getElementById('rgSearch');
const rgSuggest = document.getElementById('rgSuggest');

const allDistricts = Object.entries(SIDO_DATA).flatMap(([sido, d]) =>
  d.districts.map(city => ({ sido, city, label: d.label + ' ' + city }))
);

rgSearch.addEventListener('input', () => {
  const q = rgSearch.value.trim();
  if (!q) { rgSuggest.classList.remove('show'); return; }
  const results = allDistricts.filter(x =>
    x.city.includes(q) || x.label.includes(q) || x.sido.includes(q)
  ).slice(0, 8);
  if (!results.length) { rgSuggest.classList.remove('show'); return; }
  rgSuggest.innerHTML = results.map(r =>
    `<li data-sido="${r.sido}" data-city="${r.city}">${r.label}</li>`
  ).join('');
  rgSuggest.querySelectorAll('li').forEach(li =>
    li.addEventListener('click', () => {
      rgSearch.value = '';
      rgSuggest.classList.remove('show');
      const prodKey = getActiveProdKey();
      window.location.href =
        'region.html?sido=' + encodeURIComponent(li.dataset.sido) +
        '&city='            + encodeURIComponent(li.dataset.city) +
        '&prod='            + prodKey;
    })
  );
  rgSuggest.classList.add('show');
});
document.addEventListener('click', e => {
  if (!e.target.closest('.rg-search-wrap')) rgSuggest.classList.remove('show');
});

// 제품 탭 전환
document.querySelectorAll('.rg-ptab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rg-ptab').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    if (currentCity && currentSido) {
      showCityDetail(currentSido, currentCity);
    } else {
      updateDetailImg();
    }
  });
});
