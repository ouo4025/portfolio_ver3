gsap.registerPlugin(ScrollTrigger);

// Lenis 부드러운 스크롤 효과
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value) : window.scrollY;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.body.style.transform ? "transform" : "fixed"
});

lenis.on("scroll", ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: document.body });

// Lenis 효과 끝


$(document).ready(function(){

  // 처음 상태에서 .cerificate, .education, .activity, .skill 숨김
  $(".cerificate, .education, .activity, .skill").hide();

  //처음 상태에서는 .folder-open 숨기고 .folder-close만 보이도록
  $(".folder-open").hide();

  // .graphic 전체 숨기기
  $(".graphic").hide();

  // project-folder 두 번째 li 숨기기
  $(".project-folder > ul > li:nth-child(2)").hide();

  //폴더 클릭 이벤트
  $(".folder-flex01 > li, .folder-flex02 > li").on("click", function(){

    // introduce 숨기기
    $(".introduce").hide();

    // proffile 모든 박스 숨김
    $(".cerificate, .education, .activity, .skill").hide();

    // 모든 li에서 active 제거 + 아이콘 초기화
    $(".folder-flex01 > li, .folder-flex02 > li").removeClass("active");
    $(".folder-open").hide();
    $(".folder-close").show();

    // 클릭한 li에 active 추가 + 폴더가 open 상태로 유지
    $(this).addClass("active");
    $(this).find(".folder-close").hide();
    $(this).find(".folder-open").show();

    // 클릭된 li에 따라 해당 폴더 보이기
    let idx = $(this).index();
    let parentClass = $(this).parent().attr("class");

    if(parentClass.includes("folder-flex01")){
      if(idx === 0){
        $(".cerificate").show();
      } else if(idx === 1){
        $(".education").show();
      }
    } else if(parentClass.includes("folder-flex02")){
      if(idx === 0){
        $(".activity").show();
      } else if(idx === 1){
        $(".skill").show();
      }
    }
  });

  //hover 시 폴더 아이콘 변경
  $(".folder-flex01 > li, .folder-flex02 > li").hover(
    function(){
      // 클릭된 게 아니면 hover 시 open으로
      if(!$(this).hasClass("active")){
        $(this).find(".folder-close").hide();
        $(this).find(".folder-open").show();
      }
    },
    function(){
      // 클릭된 게 아니면 hover 해제 시 원래대로 close로
      if(!$(this).hasClass("active")){
        $(this).find(".folder-open").hide();
        $(this).find(".folder-close").show();
      }
    }
  );

  // X 버튼 클릭 시 introduce 다시 보이게 + 박스 닫기 + 아이콘 초기화
  $(".profile-head .fa-xmark").on("click", function(){
    $(".introduce").show(); // introduce 다시 표시
    $(".cerificate, .education, .activity, .skill").hide(); // 박스 닫기

    // 모든 폴더 아이콘 초기화
    $(".folder-flex01 > li, .folder-flex02 > li").removeClass("active");
    $(".folder-open").hide();
    $(".folder-close").show();
  });

  //처음 상태: .apple만 보이고 나머지 .work는 숨김
  $(".work").hide();
  $(".apple").show();

  // 처음 상태: 모든 open 숨기고 close만 보임
  $(".p-folder-open").hide();
  $(".p-folder-close").show();

  // 처음 상태: 첫 번째 li 활성화 상태
  $(".project-folder > ul > li").removeClass("active");
  $(".project-folder > ul > li").eq(0).addClass("active")
    .find(".p-folder-close").hide()
    .siblings(".p-folder-open").show();

  // 폴더 hover 이벤트
  $(".project-folder > ul > li").hover(
    function(){
      if(!$(this).hasClass("active")){
        $(this).find(".p-folder-close").hide();
        $(this).find(".p-folder-open").show();
      }
    },
    function(){
      if(!$(this).hasClass("active")){
        $(this).find(".p-folder-open").hide();
        $(this).find(".p-folder-close").show();
      }
    }
  );

// 폴더 클릭 이벤트
$(".project-folder > ul > li").on("click", function () {
  const index = $(this).index();
  const works = $(".work");

  // 모든 work 숨기기
  works.hide();

  // 클릭한 work만 보이게
  const targetWork = works.eq(index);
  targetWork.show();

  // .work fade-right 애니메이션 실행
  gsap.fromTo(
    targetWork.find(".project-card, .main-tit-wrap"),
    { x: 100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1 //순차적으로 애니메이션이 되도록
    }
  );

    gsap.fromTo(
    targetWork.find(".mobile-wrap"),
    { x: 100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1 
    }
  );

  // project 폴더 아이콘 
  $(".project-folder > ul > li .p-folder-open").hide();
  $(".project-folder > ul > li .p-folder-close").show();
  $(this).find(".p-folder-close").hide();
  $(this).find(".p-folder-open").show();
});


  
// display hover 시 이미지 스크롤 애니메이션
$(document).on("mouseenter", ".work .main-tit", function(){
  let $mainTit = $(this);
  let $img = $mainTit.find(".display img");
  let $box = $mainTit.find(".display");

  let imgHeight = $img[0].naturalHeight || $img.height(); 
  let boxHeight = $box.height();
  let moveY = boxHeight - imgHeight; 

  if(moveY < 0){

    if($img.data("tween")) $img.data("tween").kill();

    let tween = gsap.to($img, {
      y: moveY,
      duration: 25,
      ease: "none",
      repeat: -1,
      yoyo: true
    });
    $img.data("tween", tween);
  }
});

// 마우스 나갔을 때 애니메이션 중지 + 원래 위치로 복귀
$(document).on("mouseleave", ".work .main-tit", function(){
  let $img = $(this).find(".display img");
  if($img.data("tween")) $img.data("tween").kill();
  gsap.to($img, { y: 0, duration: 1 });
});

//display hover 시 이미지 스크롤 애니메이션(모바일)
$(document).on("mouseenter", ".mobile", function(){
  let $mobile = $(this);
  let $img = $mobile.find(".mobile-home img");
  if($img.length === 0) return; 
  let $box = $mobile.find(".mobile-home");

  let imgHeight = $img[0].naturalHeight || $img.height();
  let boxHeight = $box.height();
  let moveY = boxHeight - imgHeight; 

  if(moveY < 0){
   
    if($img.data("tween")) $img.data("tween").kill();

    
    let tween = gsap.to($img, {
      y: moveY,
      duration: 10,   // 이동 속도
      ease: "none",
      repeat: -1,
      yoyo: true
    });
    $img.data("tween", tween);
  }
});

// 마우스 나갔을 때 애니메이션 중지 + 원래 위치로 복귀
$(document).on("mouseleave", ".mobile", function(){
  let $img = $(this).find(".mobile-home img");
  if($img.length === 0) return;
  if($img.data("tween")) $img.data("tween").kill();
  gsap.to($img, { y: 0, duration: 1 });
});


//.main-visual 반짝이는 효과 
gsap.set(".twinkle-left, .twinkle-right", { opacity: 0 }); // 시작은 투명
gsap.to(".twinkle-left, .twinkle-right", {
  opacity: 1,
  duration: 0,        
  repeat: -1,
  yoyo: true,
  repeatDelay: 0.4    // 깜빡이는 간격
});


//.profile 반짝이는 효과
gsap.set(".twinkle2-left, .twinkle2-right", { opacity: 0 }); 
gsap.to(".twinkle2-left, .twinkle2-right", {
  opacity: 1,
  duration: 0,        
  repeat: -1,
  yoyo: true,
  repeatDelay: 0.8   
});

   //.start-btn 반짝이는 효과 + hover 시 멈춤
  let startBtnTween = gsap.to(".start-btn", {
    opacity: 0.4,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
  });

  $(".start-btn").hover(
    function() {
      // hover시 멈춤
      startBtnTween.pause();
      gsap.to(".start-btn", { opacity: 1, duration: 0.3 });
    },
    function() {
      // hover out시 다시 실행
      startBtnTween.resume();
    }
  );

 //.start-btn 클릭 시 .profile로 이동
  $(".start-btn").on("click", function() {
    gsap.to(window, {
      duration: 1,
      scrollTo: ".profile",
      ease: "power2.inOut"
    });
  });



 //.main-tit-intro 텍스트 타이핑 효과 + 끝나면 start-btn 보이기
let introEl = $(".main-tit-intro");
let introText = introEl.text().trim();
introEl.text(""); 

$(".start-btn").hide();

gsap.to({}, {
  duration: 3,
  repeat: 0,
  onUpdate: function() {
    let progress = this.progress();
    let charCount = Math.floor(progress * introText.length);
    introEl.text(introText.substring(0, charCount));
  },
  onComplete: function() {
    // 타이핑 끝나면 start-btn 나타남
    gsap.to(".start-btn", { autoAlpha: 1, duration: 1, display: "block" });
  }
});

// main-visual pin고정
ScrollTrigger.create({
  trigger: ".main-visual",
  start: "bottom bottom", 
  endTrigger: ".profile",
  end: "top top",         
  pin: true,
  pinSpacing: false,
  scrub: true
});

// .introduce 애니메이션 + introduce-txt 타이핑
ScrollTrigger.create({
  trigger: ".profile",
  start: "top 80%",
  once: true,
  onEnter: () => {
    const introduceEl = document.querySelector(".introduce");
    const introduceTxtEl = document.querySelector(".introduce-txt p");

    
    gsap.set(introduceEl, { 
      scaleX: 0,
      scaleY: 0.05,
      opacity: 0,
      transformOrigin: "center center"
    });

    // introduce-txt는 처음에 숨김
    gsap.set(".introduce-txt", { autoAlpha: 0 });

    // CRT 애니메이션
    gsap.timeline()
      // 깜빡 켜짐
      .to(introduceEl, { opacity: 1, duration: 0.1 })
      .to(introduceEl, { opacity: 0, duration: 0.1 })
      .to(introduceEl, { opacity: 1, duration: 0.1 })
      // 가로선 생김
      .to(introduceEl, { scaleX: 1, duration: 0.4, ease: "steps(8)" })
      // 세로로 확장
      .to(introduceEl, { scaleY: 1, duration: 0.4, ease: "steps(10)" })
      .to(introduceEl, {
        opacity: 1,
        duration: 0.2,
        onComplete: () => {
          // introduce-txt 보이게
          gsap.to(".introduce-txt", { autoAlpha: 1, duration: 0.3 });

          // introduce-txt 타이핑 애니메이션
          if (introduceTxtEl) {
            const originalHTML = introduceTxtEl.innerHTML;
            introduceTxtEl.innerHTML = "";

            const parts = originalHTML.split(/(<br\s*\/?>)/i); 
            let partIndex = 0;

            function processPart() {
              if (partIndex < parts.length) {
                const part = parts[partIndex];
                if (part.toLowerCase().includes("<br")) {
                  introduceTxtEl.innerHTML += "<br>";
                  partIndex++;
                  processPart();
                } else {
                  let charIndex = 0;
                  function typing() {
                    if (charIndex < part.length) {
                      introduceTxtEl.innerHTML += part.charAt(charIndex);
                      charIndex++;
                      setTimeout(typing, 60); // 속도 조절
                    } else {
                      partIndex++;
                      processPart();
                    }
                  }
                  typing();
                }
              }
            }
            processPart();
          }
        }
      });
  }
});

// CRT 애니메이션 (텍스트 타이핑 제외)
function crtBoxAnimation(targetBox) {
  if(!targetBox || targetBox.length === 0) return;

  gsap.set(targetBox, { 
    scaleX: 0,
    scaleY: 0.05,
    opacity: 0,
    transformOrigin: "center center"
  });

  gsap.timeline()
    .to(targetBox, { opacity: 1, duration: 0.1 })
    .to(targetBox, { opacity: 0, duration: 0.1 })
    .to(targetBox, { opacity: 1, duration: 0.1 })
    .to(targetBox, { scaleX: 1, duration: 0.4, ease: "steps(8)" })
    .to(targetBox, { scaleY: 1, duration: 0.4, ease: "steps(10)" })
    .to(targetBox, { opacity: 1, duration: 0.2 })
    .to(targetBox, {
      opacity: 1,
      duration: 0.2,
      onComplete: () => {
        // skill일 때만 프로그레스바 애니메이션 실행
        if (targetBox.hasClass("skill")) {
          animateProgressBars();
        }
      }
    });



    
}

// 폴더 클릭 이벤트
$(".folder-flex01 > li, .folder-flex02 > li").on("click", function(){
  $(".introduce").hide(); 
  $(".cerificate, .education, .activity, .skill").hide();

  let idx = $(this).index();
  let parentClass = $(this).parent().attr("class");
  let targetBox = null;

  if(parentClass.includes("folder-flex01")){
    if(idx === 0){
      targetBox = $(".cerificate");
    } else if(idx === 1){
      targetBox = $(".education");
    }
  } else if(parentClass.includes("folder-flex02")){
    if(idx === 0){
      targetBox = $(".activity");
    } else if(idx === 1){
      targetBox = $(".skill");
    }
  }

  if(targetBox){
    targetBox.show();       // 보이게 하고
    crtBoxAnimation(targetBox); // CRT 애니메이션 실행
  }
});


// skill-bar 채우기 애니메이션 
function animateProgressBars() {
  document.querySelectorAll(".skill-txt .progress").forEach(bar => {
    const targetWidth = window.getComputedStyle(bar).width;

    // 시작 상태: 안 보이게(width 0)
    gsap.set(bar, { width: 0, autoAlpha: 0 });

    // 나타나면서 width 늘어나기
    gsap.to(bar, {
      autoAlpha: 1,
      width: targetWidth,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.1
    });
  });
}

// profile pin고정
ScrollTrigger.create({
  trigger: ".profile",
  start: "bottom bottom", 
  endTrigger: ".project",
  end: "top top",         
  pin: true,
  pinSpacing: false,
  scrub: true
});



// .project-folder 원 메모양 커지는 애니이션
ScrollTrigger.create({
  trigger: ".project",
  start: "top 80%", // .project가 화면 80% 지점에 들어올 때 실행
  once: true,       // 한 번만 실행
  onEnter: () => {
    gsap.fromTo(".project-circle", 
      { scale: 0, opacity: 0 }, 
      { 
        scale: 1, 
        opacity: 1, 
        duration: 2,   
        delay: 0.5,    
        ease: "power2.out" 
      }
    );

      // ul 나타나기 (조금 늦게 시작)
    gsap.to(".project-folder > ul", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 1.7,   // 원 커지기 애니메이션 끝난 후 자연스럽게 실행
      ease: "power2.out"
    });
  }
});

// .project에 스크롤이 왔을 때 ::before, ::after 반짝이기 (딜레이 추가)
ScrollTrigger.create({
  trigger: ".project",
  start: "top 80%",
  onEnter: () => {
    setTimeout(() => {
      $(".project-folder").addClass("blink");
    }, 800); // 0.8초 딜레이 후 실행
  },
  onLeaveBack: () => {
    $(".project-folder").removeClass("blink");
  }
});

// project pin고정
ScrollTrigger.create({
  trigger: ".project",
  start: "bottom bottom", 
  endTrigger: ".graphic",
  end: "top top",         
  pin: true,
  pinSpacing: false,
  scrub: true
});




//.project fade-right
gsap.set(".project .project-card, .project .main-tit-wrap", { opacity: 0, x: 50 });

ScrollTrigger.batch(".project .work", {
  start: "top 80%",
  onEnter: (batch) => {
   
    batch.forEach(section => {
      const cards = section.querySelectorAll(".project-card");
      const titles = section.querySelectorAll(".main-tit-wrap");

      gsap.to(titles, {
        opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
        stagger: 0.1,
        overwrite: true
      });

      gsap.to(cards, {
        opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
        stagger: 0.1,
        delay: 0.1,
        overwrite: true
      });
    });
  }
});


//.graphic-tit-wrap 원 커지기
ScrollTrigger.create({
  trigger: ".graphic",
  start: "top 80%",
  once: true,
  onEnter: () => {
    gsap.fromTo(".graphic-tit-wrap",
      { scale: 0, opacity: 0, transformOrigin: "center center" },
      { scale: 1, opacity: 1, duration: 2, delay: 0.5, ease: "power2.out" }
    );
  }
});


//.graphic-wrap02 slide in → .graphic-wrap02 fade-right
gsap.set(".graphic-wrap02", { opacity: 0, right: "-100%", position: "absolute" });
gsap.set(".graphic-wrap", { opacity: 0, x: 50 }); // 이후에 fade-right로 등장

ScrollTrigger.create({
  trigger: ".graphic",
  start: "top 80%",
  once: true,
  onEnter: () => {
    // 오른쪽에서 밀고 들어오기
    gsap.to(".graphic-wrap02", {
      opacity: 1,
      right: 0,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => {
        // 끝나고 .graphic-wrap fade-right로 등장
        gsap.to(".graphic-wrap", {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out"
        });
      }
    });
  }
});


// .graphic card 스크롤링
function loopVerticalList(selector, duration = 30, direction = "up") {
  const $ul = $(selector);
  const $lis = $ul.children("li");

  if ($ul.data("cloned")) return;
  $ul.data("cloned", true);

  // li 복제 (두 배 길이)
  $lis.clone().appendTo($ul);

  const listHeight = $lis.outerHeight(true) * $lis.length;

  if (direction === "up") {
    // 위로 롤링
    gsap.to($ul, {
      y: -listHeight,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize(y => (parseFloat(y) % listHeight))
      }
    });
  } else {
    // 아래로 롤링
    gsap.to($ul, {
      y: listHeight,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize(y => (parseFloat(y) % listHeight) - listHeight)
      }
    });
  }
}




ScrollTrigger.create({
  trigger: ".graphic",
  start: "top 80%",
  once: true,
  onEnter: () => {
    setTimeout(() => {
      // 위로 무한 롤링
      loopVerticalList(".card-left .card-inner ul", 70, "up");
      // 아래로 무한 롤링
      loopVerticalList(".card-right .card-inner ul", 70, "down");
    }, 1000);
  }
});

// graphic pin고정
ScrollTrigger.create({
  trigger: ".graphic",
  start: "bottom bottom", 
  endTrigger: "footer",
  end: "top top",         
  pin: true,
  pinSpacing: false,
  scrub: true
});


//footer 텍스트 타이핑 + 아이콘 fade up
$(document).ready(function(){

  // footer 숨김 
  gsap.set("footer .footer-tit p, footer .footer-icons", { autoAlpha: 0 });

  function typeText($el, text, speed = 80, onComplete) {
    $el.text("");
    let i = 0;
    function typing() {
      if (i < text.length) {
        $el.text($el.text() + text.charAt(i));
        i++;
        setTimeout(typing, speed);
      } else if (onComplete) {
        onComplete();
      }
    }
    typing();
  }

  ScrollTrigger.create({
    trigger: "footer",
    start: "top 80%", 
    once: true,
    onEnter: () => {
      const $p1 = $("footer .footer-tit p:nth-of-type(1)");
      const $p2 = $("footer .footer-tit p:nth-of-type(2)");
      const $icons = $("footer .footer-icons");

      let text1 = $p1.text().trim();
      let text2 = $p2.text().trim();

      // 초기화
      $p1.text("");
      $p2.text("");

       //첫 번째 문장은 느리게
      typeText($p1, text1, 150, () => {
        
        typeText($p2, text2, 60, () => {
          // 두 번째 문장 끝나면 아이콘 fade-up
          gsap.fromTo($icons,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        });
      });

      gsap.to([$p1, $p2], { autoAlpha: 1, duration: 0.3 });
    }
  });

});

//footer 아이콘 클릭시 복사 + 토스트 메시지
function copyToClipboard(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  }).catch(err => {
    console.error("복사 실패:", err);
  });
}

function showToast(message) {
  let $toast = $("<div class='toast-message'></div>").text(message);
  $("body").append($toast);

  gsap.fromTo($toast,
    { autoAlpha: 0, y: 30 },
    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
  );

  // 1.5초 후 사라지기
  setTimeout(() => {
    gsap.to($toast, {
      autoAlpha: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => $toast.remove()
    });
  }, 1500);
}

// 메일 아이콘 클릭 
$(document).on("click", "footer .footer-icons > li:nth-child(2)", function() {
  copyToClipboard("jgb09130@gmail.com", "메일을 복사했습니다.");
});

// 전화 아이콘 클릭
$(document).on("click", "footer .footer-icons > li:nth-child(3)", function() {
  copyToClipboard("01040253842", "전화번호를 복사했습니다.");
});








});
