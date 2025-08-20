<script>
/** -------- Storage helpers -------- */
const LS = {
  get(key, fallback){
    try{ const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; }catch{ return fallback; }
  },
  set(key, value){ localStorage.setItem(key, JSON.stringify(value)); },
  push(key, item){
    const arr = LS.get(key, []);
    arr.push(item);
    LS.set(key, arr);
  }
};

/** -------- Auth guard (แนบในทุกหน้า) -------- */
function guard(){
  if(sessionStorage.getItem("loggedIn") !== "true"){
    location.href = "login.html";
  }
}

/** -------- Notifications / Activity Log -------- */
function logEvent(type, message, meta={}){
  const item = {
    id: Date.now().toString(36),
    ts: new Date().toISOString(),
    type, message, meta
  };
  LS.push("logs", item);
  // ตัวอย่าง: แจ้งเตือนเบา ๆ ในหน้า
  try{
    const toast = document.getElementById("toast");
    if(toast){ toast.innerText = message; toast.classList.add("show");
      setTimeout(()=>toast.classList.remove("show"), 2000);
    }
  }catch{}
}

/** -------- ID helper -------- */
function uid(prefix="id"){ return prefix + "_" + Math.random().toString(36).slice(2,9); }

/** -------- Number format -------- */
function num(v){ return Number(v||0); }

/** -------- Seed data (ครั้งแรก) -------- */
(function seed(){
  if(!localStorage.getItem("__seed_v1__")){
    LS.set("trees", [
      {id: uid("tree"), code:"A-01", zone:"A", ageMonth:24, note:"สุขภาพดี"},
      {id: uid("tree"), code:"A-02", zone:"A", ageMonth:18, note:"แตกยอดใหม่"},
      {id: uid("tree"), code:"B-01", zone:"B", ageMonth:30, note:"ต้องตัดแต่ง"},
    ]);
    LS.set("zones", [
      {id: uid("zone"), name:"โซน A", points:[
        {id: uid("pt"), name:"A1", manual:false, status:"off"},
        {id: uid("pt"), name:"A2", manual:false, status:"off"},
      ]},
      {id: uid("zone"), name:"โซน B", points:[
        {id: uid("pt"), name:"B1", manual:false, status:"off"},
      ]},
    ]);
    LS.set("inventory", [
      {id: uid("inv"), name:"ปุ๋ยเร่งโต 15-15-15", unit:"กระสอบ", qty:6, min:3, price:500},
      {id: uid("inv"), name:"ยาป้องกันเชื้อรา", unit:"ลิตร", qty:2, min:2, price:250},
    ]);
    LS.set("tasks", [
      {id: uid("task"), title:"ให้น้ำโซน A", date:new Date().toISOString().slice(0,10), time:"06:00", note:"30 นาที"},
      {id: uid("task"), title:"ใส่ปุ๋ยรอบเดือน", date:new Date().toISOString().slice(0,10), time:"08:00", note:"15-15-15"},
    ]);
    LS.set("logs", []);
    localStorage.setItem("__seed_v1__", "1");
  }
})();
</script>

