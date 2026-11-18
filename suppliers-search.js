const copy = {
  en: {
    operations:'OPERATIONS', planning:'PLANNING', dashboard:'Dashboard', alerts:'Alerts', inventory:'Inventory', products:'Products', forecast:'AI forecast', orders:'Purchase orders', suppliers:'Suppliers', reports:'Reports', mainNavigation:'Main navigation', language:'Language', accountName:'Warehouse Manager', initials:'WM', manager:'Manager', popupRole:'Admin', usersTitle:'Active users', usersSubtitle:'Signed in to the website', connected:'online', employee:'Employee', trader:'Merchant', active:'Active now', lastSeen:'Active', minutes:'min ago', logout:'Log out', back:'Back', title:'Search suppliers', searchBy:'SEARCH BY', allFields:'All fields', productName:'Product name', sku:'SKU', company:'Company name', orderNumber:'Order number', category:'Category', footer:'© 2027 Smart Warehouse. All rights reserved.', seedByField:{allFields:'',productName:'Product',sku:'SKU',company:'Product',orderNumber:'PO',category:'Category'}, supplierName:'Company name', supplies:'Supplies', lastOrder:'Last order', view:'View', results:(q,f,n)=>`Showing results for “<strong>${esc(q||'…')}</strong>” in <strong>${f}</strong> · <strong><bdi dir="ltr">${n}</bdi></strong> results`, empty:'No results found'
  },
  ar: {
    operations:'العمليات', planning:'التخطيط', dashboard:'لوحة التحكم', alerts:'التنبيهات', inventory:'المخزون', products:'المنتجات', forecast:'توقعات الذكاء الاصطناعي', orders:'أوامر الشراء', suppliers:'الموردون', reports:'التقارير', mainNavigation:'التنقل الرئيسي', language:'اللغة', accountName:'مدير المخزن', initials:'م ا', manager:'مدير', popupRole:'مدير', usersTitle:'المستخدمون النشطون', usersSubtitle:'سجلوا الدخول إلى الموقع', connected:'متصلون', employee:'موظف', trader:'تاجر', active:'نشط الآن', lastSeen:'نشطة قبل', minutes:'دقائق', logout:'تسجيل الخروج', back:'رجوع', title:'البحث عن الموردين', searchBy:'البحث حسب', allFields:'كل الحقول', productName:'اسم المنتج', sku:'SKU', company:'اسم الشركة', orderNumber:'رقم الطلب', category:'الفئة', footer:'© ٢٠٢٧ Smart Warehouse. جميع الحقوق محفوظة.', seedByField:{allFields:'',productName:'منتج',sku:'SKU',company:'منتج',orderNumber:'PO',category:'الفئة'}, supplierName:'اسم الشركة', supplies:'يورّد', lastOrder:'آخر أمر', view:'عرض', results:(q,f,n)=>`عرض نتائج «${esc(q||'…')}» في <strong>${f}</strong> · <strong><bdi dir="ltr">${n}</bdi></strong> نتائج`, empty:'لا توجد نتائج'
  }
};
const records = [
  {company:'Company name',arCompany:'اسم الشركة',product:'Product 1',arProduct:'المنتج 1',sku:'SKU-001',po:'PO-1048',category:'Food'},
  {company:'Company name',arCompany:'اسم الشركة',product:'Product 2',arProduct:'المنتج 2',sku:'SKU-002',po:'PO-1050',category:'Hardware'},
  {company:'Company name',arCompany:'اسم الشركة',product:'Product 3',arProduct:'المنتج 3',sku:'SKU-003',po:'PO-1045',category:'Packaging'}
];
const users = [
  {en:'Ahmed Hassan',ar:'أحمد حسن',email:'ahmed@smartwh.com',enInitials:'AH',arInitials:'أح',role:'employee',online:true},
  {en:'Sara Mostafa',ar:'سارة مصطفى',email:'sara@smartwh.com',enInitials:'SM',arInitials:'س م',role:'employee',online:true},
  {en:'Karim Adel',ar:'كريم عادل',email:'karim@supplier.com',enInitials:'KA',arInitials:'ك ع',role:'trader',online:true},
  {en:'Nour Youssef',ar:'نور يوسف',email:'nour@smartwh.com',enInitials:'NY',arInitials:'ن ي',role:'employee',online:true},
  {en:'Mona Tarek',ar:'منى طارق',email:'mona@smartwh.com',enInitials:'MT',arInitials:'م ط',role:'trader',online:true}
];
const $ = selector => document.querySelector(selector);
let field = 'company';
function esc(value){return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function mark(value,term){const index=value.toLocaleLowerCase().indexOf(term.toLocaleLowerCase());if(!term||index<0)return esc(value);return esc(value.slice(0,index))+'<mark class="match">'+esc(value.slice(index,index+term.length))+'</mark>'+esc(value.slice(index+term.length))}
function seedFor(dictionary){return dictionary.seedByField[field]||''}
function valueFor(record,key,lang){if(key==='company')return lang==='ar'?record.arCompany:record.company;if(key==='productName')return lang==='ar'?record.arProduct:record.product;if(key==='orderNumber')return record.po;if(key==='sku')return record.sku;if(key==='category')return record.category;return [lang==='ar'?record.arCompany:record.company,lang==='ar'?record.arProduct:record.product,record.sku,record.po,lang==='ar'?(record.category==='Food'?'طعام':record.category==='Hardware'?'أجهزة':'تغليف'):record.category].join(' ')}
function renderUsers(){
  const lang=document.documentElement.lang,d=copy[lang];
  $('#usersList').innerHTML=users.map((user,index)=>{
    const status=user.online?d.active:`${d.lastSeen} 8 ${d.minutes}`;
    const detail=user.online?`<bdi dir="ltr">${user.email}</bdi>`:`<span class="last-seen">${d.lastSeen} <bdi dir="ltr">8</bdi> ${d.minutes}</span>`;
    return `<li class="user-row"><span class="user-avatar user-tone-${index+1}">${lang==='ar'?user.arInitials:user.enInitials}<i class="presence ${user.online?'is-online':'is-offline'}" role="img" aria-label="${status}" title="${status}"></i></span><span class="user-details"><strong>${lang==='ar'?user.ar:user.en}</strong><span class="user-detail">${detail}</span></span><span class="user-role ${user.role}">${d[user.role]}</span></li>`;
  }).join('');
  $('#usersList').setAttribute('aria-label',lang==='ar'?'المستخدمون':'Users');
  $('.online-count').textContent=String(users.filter(user=>user.online).length);
}
function render(){
  const lang=document.documentElement.lang,d=copy[lang],query=$('#query').value.trim(),seed=seedFor(d),isSeed=query.toLocaleLowerCase()===seed.toLocaleLowerCase(),needle=isSeed?'':query.toLocaleLowerCase();
  const items=records.filter(record=>!needle||valueFor(record,field,lang).toLocaleLowerCase().includes(needle));
  $('.summary').innerHTML=d.results(query,d[field],items.length);
  $('.results').innerHTML=items.length?items.map(record=>{
    const company=lang==='ar'?record.arCompany:record.company,product=lang==='ar'?record.arProduct:record.product;
    const companyTerm=(field==='company'||field==='allFields')&&company.toLocaleLowerCase().includes(needle)?needle:'';
    const productTerm=(field==='productName'||field==='allFields')&&product.toLocaleLowerCase().includes(needle)?needle:'';
    const orderTerm=(field==='orderNumber'||field==='allFields')&&record.po.toLocaleLowerCase().includes(needle)?needle:'';
    const productText=lang==='ar'?mark(product,productTerm):`${d.supplies} ${mark(product,productTerm)}`;
    return `<li class="result"><span class="company-icon" aria-hidden="true">C</span><div class="result-copy"><strong>${mark(company,companyTerm)}</strong><p>${productText} · ${d.lastOrder} <bdi dir="ltr">${mark(record.po,orderTerm)}</bdi></p></div><a class="view" href="#">${d.view}</a></li>`
  }).join(''):`<li class="result empty">${d.empty}</li>`;
}
function setLanguage(lang){
  const d=copy[lang];document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.title=lang==='ar'?'البحث عن الموردين | المستودع الذكي':'Search suppliers | Smart Warehouse';
  document.querySelectorAll('[data-i18n]').forEach(element=>{if(typeof d[element.dataset.i18n]==='string')element.textContent=d[element.dataset.i18n]});
  document.querySelectorAll('[data-lang]').forEach(button=>{const active=button.dataset.lang===lang;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  $('.selected-field').textContent=d[field];$('#query').value=seedFor(d);$('#query').placeholder=seedFor(d);$('#query').setAttribute('aria-label',lang==='ar'?'البحث عن الموردين':'Search suppliers');$('.back').setAttribute('aria-label',d.back);$('.bell').setAttribute('aria-label',lang==='ar'?'التنبيهات':'Notifications');$('nav').setAttribute('aria-label',d.mainNavigation);$('.language').setAttribute('aria-label',d.language);$('.users').setAttribute('aria-label',lang==='ar'?'5 مستخدمين':'5 users');renderUsers();localStorage.setItem('supplier-search-lang',lang);render();
}
const usersToggle=$('#usersToggle'),usersPanel=$('#usersPanel');
function closeUsersPanel(returnFocus=false){usersPanel.hidden=true;usersToggle.setAttribute('aria-expanded','false');if(returnFocus)usersToggle.focus()}
usersToggle.addEventListener('click',event=>{event.stopPropagation();const open=usersPanel.hidden;usersPanel.hidden=!open;usersToggle.setAttribute('aria-expanded',String(open))});
document.addEventListener('click',event=>{if(!usersPanel.hidden&&!event.target.closest('#usersPanel')&&!event.target.closest('#usersToggle'))closeUsersPanel()});
$('.back').addEventListener('click',()=>history.back());
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
$('#query').addEventListener('input',render);
$('.search-by').addEventListener('click',()=>{const menu=$('.menu'),open=menu.hidden;menu.hidden=!open;$('.search-by').setAttribute('aria-expanded',String(open));document.querySelectorAll('.menu [data-field]').forEach(option=>option.setAttribute('aria-selected',String(option.dataset.field===field)))});
$('.menu').addEventListener('click',event=>{const option=event.target.closest('[data-field]');if(!option)return;field=option.dataset.field;document.querySelectorAll('.menu [data-field]').forEach(item=>item.setAttribute('aria-selected',String(item===option)));const d=copy[document.documentElement.lang];$('.selected-field').textContent=d[field];$('#query').value=seedFor(d);$('#query').placeholder=seedFor(d);$('.menu').hidden=true;$('.search-by').setAttribute('aria-expanded','false');render()});
document.addEventListener('click',event=>{if(!event.target.closest('.select-wrap')){$('.menu').hidden=true;$('.search-by').setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(!usersPanel.hidden){closeUsersPanel(true);return}if(!$('.menu').hidden){$('.menu').hidden=true;$('.search-by').setAttribute('aria-expanded','false');$('.search-by').focus()}});
let saved='en';try{saved=localStorage.getItem('supplier-search-lang')==='ar'?'ar':'en'}catch{}setLanguage(saved);
