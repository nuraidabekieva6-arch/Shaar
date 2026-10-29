import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs, addDoc, increment, onSnapshot, runTransaction, updateDoc }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8SIU09xnMbRgDInxGMp1aNkgDaBrDI2o",
  authDomain: "shaar-app.firebaseapp.com",
  projectId: "shaar-app",
  messagingSenderId: "36634153675",
  appId: "1:36634153675:web:8d5ab23579c9cfebe0014e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ---------- Переводы ---------- */
const D = {
ru:{title:"Shaar: платформа городских проблем",h1:"Заметили проблему? Решите её вместе с городом",lead:"Shaar помогает отмечать проблемы, находить тех, кто готов их исправить, и благодарить за работу.",su:"Зарегистрироваться",li:"Войти",back:"← Назад",cr:"Создать аккаунт",crl:"Выберите, как зарегистрироваться.",goog:"Продолжить с Google",appl:"Продолжить с Apple",soon:"скоро",orm:"или по электронной почте",nm:"Имя",nmp:"Как вас зовут",em:"Электронная почта",pw:"Пароль",pwp:"Минимум 6 символов",crb:"Создать аккаунт",gh:"Аккаунт Gmail можно использовать и с Google, и с паролем.",ha:"Уже есть аккаунт?",lg:"Вход в аккаунт",lgl:"Рады видеть вас снова.",fg:"Забыли пароль?",pwp2:"Ваш пароль",oro:"не получается? войдите другим способом",gi:"Войти через Google",na:"Нет аккаунта?",rsl:"Введите почту, и мы отправим ссылку для нового пароля. Если вы входили через Google, нажмите «Войти через Google».",snd:"Отправить ссылку",bl:"← Назад ко входу",
 ah:"Удобный город начинается с небольших дел",ap:"Shaar — платформа, где жители отмечают проблемы рядом с домом: разбитую дорогу, мусор, неработающий фонарь. Любой может взять задачу на себя, исправить её и показать результат на фото.",
 av:"Почему Shaar",a1h:"Всё на карте",a1p:"Проблемы видны всем и не теряются в жалобах.",a2h:"Решают сами жители",a2p:"Волонтёры и спонсоры берут задачи на себя.",a3h:"Честный результат",a3p:"Фото «до» и «после» и оценки жителей.",
 ch:"Как получить сертификат Shaar",c1:"Решите проблему и покажите результат на фото. Жители оценят вашу работу звёздами.",c2:"Если оценили не менее пяти человек и средняя оценка не ниже 4,5, сертификат появится в личном кабинете автоматически. Его можно скачать в PDF и добавить в портфолио.",cw:"Сертификат",cs:"выдан платформой Shaar",cf:"за решение городской проблемы",
 sh:"Как работает Shaar",s1h:"Отметьте проблему",s1p:"Фото, описание и точка на карте.",s2h:"Возьмите задачу",s2p:"Волонтёр или спонсор берёт её на себя.",s3h:"Покажите результат",s3p:"Фото «до» и «после», оценки жителей.",s4h:"Получите сертификат",s4p:"Он останется в вашем кабинете навсегда.",
 ph:"Партнёры",pp:"Мы приглашаем транспортные компании, организации и городские службы стать партнёрами Shaar.",pb:"Стать партнёром",uh:"Служба поддержки",up:"Есть вопросы? Обращайтесь, мы поможем.",fo:"Основатель",
 plh:"Выберите место",pll:"Найдите адрес, нажмите на карту или определите, где вы сейчас.",sph:"Город, улица, район или место",fnd:"Найти",loc:"Определить меня",conf:"Подтвердить место",out:"Выйти из аккаунта",lo:"Выйти",t1:"Новые",t2:"В работе",t3:"Решены",
 wait:"Определяем ваше местоположение…",finding:"Определяем адрес…",noGeo:"Браузер не умеет определять место. Найдите адрес или нажмите на карту.",geoFail:"Не удалось определить автоматически. Найдите адрес или нажмите на карту.",noAddr:"Здесь нет адреса. Выберите место на суше.",noRes:"Ничего не найдено. Попробуйте написать иначе.",resetOk:"Если такой аккаунт есть, письмо уже отправлено. Проверьте почту и папку «Спам».",
 cont:"Продолжить как",guest:"гость",shw:"Показать",hid:"Скрыть",hi:"Привет",you:"Ваше место",untitled:"Без названия",
 em1:"Новых проблем пока нет. Скоро здесь можно будет отметить первую.",em2:"Сейчас никто ничего не чинит. Взять проблему можно будет из списка новых.",em3:"Решённых проблем пока нет. Они появятся здесь с фото «до» и «после».",
 eInUse:"Эта почта уже зарегистрирована. Нажмите «Войти».",eEmail:"Проверьте адрес почты: он указан неверно.",eWeak:"Пароль слишком простой. Нужно минимум 6 символов.",eCred:"Неверная почта или пароль.",eNoUser:"Аккаунт с такой почтой не найден.",eMany:"Слишком много попыток. Подождите немного и повторите.",eNet:"Нет интернета. Проверьте соединение.",eOp:"Этот способ входа не включён в Firebase.",ePop:"Браузер заблокировал окно входа. Разрешите всплывающие окна.",eGen:"Что-то пошло не так. Проверьте интернет и попробуйте ещё раз."},
en:{title:"Shaar: a platform for city problems",h1:"Spotted a problem? Fix it together with your city",lead:"Shaar helps people report problems, find those ready to fix them, and say thank you for the work.",su:"Sign up",li:"Log in",back:"← Back",cr:"Create an account",crl:"Choose how to sign up.",goog:"Continue with Google",appl:"Continue with Apple",soon:"soon",orm:"or with email",nm:"Name",nmp:"Your name",em:"Email",pw:"Password",pwp:"At least 6 characters",crb:"Create account",gh:"A Gmail account works with both Google and a password.",ha:"Already have an account?",lg:"Log in",lgl:"Good to see you again.",fg:"Forgot password?",pwp2:"Your password",oro:"not working? try another way",gi:"Log in with Google",na:"No account yet?",rsl:"Enter your email and we will send a link to set a new password. If you signed in with Google, choose “Log in with Google”.",snd:"Send link",bl:"← Back to log in",
 ah:"A comfortable city starts with small deeds",ap:"Shaar is a platform where residents report problems near their homes: a broken road, litter, a dead street light. Anyone can take a task, fix it and show the result in photos.",
 av:"Why Shaar",a1h:"Everything on the map",a1p:"Problems are visible to everyone and never get lost in complaints.",a2h:"Residents solve them",a2p:"Volunteers and sponsors take tasks on themselves.",a3h:"Honest results",a3p:"Before and after photos and ratings from residents.",
 ch:"How to get a Shaar certificate",c1:"Solve a problem and show the result in photos. Residents rate your work with stars.",c2:"If at least five people rate it and the average is 4.5 or higher, the certificate appears in your account automatically. You can download it as a PDF and add it to your portfolio.",cw:"Certificate",cs:"issued by the Shaar platform",cf:"for solving a city problem",
 sh:"How Shaar works",s1h:"Report a problem",s1p:"A photo, a description and a point on the map.",s2h:"Take the task",s2p:"A volunteer or sponsor takes it on.",s3h:"Show the result",s3p:"Before and after photos, ratings from residents.",s4h:"Get a certificate",s4p:"It stays in your account forever.",
 ph:"Partners",pp:"We invite transport companies, organizations and city services to become Shaar partners.",pb:"Become a partner",uh:"Support",up:"Have questions? Get in touch, we will help.",fo:"Founder",
 plh:"Choose a place",pll:"Search for an address, tap the map or detect where you are now.",sph:"City, street, district or place",fnd:"Search",loc:"Find me",conf:"Confirm place",out:"Log out",lo:"Log out",t1:"New",t2:"In progress",t3:"Solved",
 wait:"Finding your location…",finding:"Finding the address…",noGeo:"Your browser cannot detect location. Search for an address or tap the map.",geoFail:"Could not detect automatically. Search for an address or tap the map.",noAddr:"No address here. Pick a place on land.",noRes:"Nothing found. Try a different wording.",resetOk:"If this account exists, the email has been sent. Check your inbox and spam folder.",
 cont:"Continue as",guest:"guest",shw:"Show",hid:"Hide",hi:"Hello",you:"Your place",untitled:"Untitled",
 em1:"No new problems yet. You will be able to report the first one soon.",em2:"Nobody is fixing anything right now. You will be able to take a task from the new list.",em3:"No solved problems yet. They will appear here with before and after photos.",
 eInUse:"This email is already registered. Press “Log in”.",eEmail:"Please check the email address.",eWeak:"The password is too weak. Use at least 6 characters.",eCred:"Wrong email or password.",eNoUser:"No account with this email.",eMany:"Too many attempts. Wait a bit and try again.",eNet:"No internet connection.",eOp:"This sign-in method is not enabled in Firebase.",ePop:"The browser blocked the sign-in window. Allow pop-ups.",eGen:"Something went wrong. Check your internet and try again."},
ky:{title:"Shaar: шаардык көйгөйлөр платформасы",h1:"Көйгөйдү байкадыңызбы? Аны шаар менен чогуу чечиңиз",lead:"Shaar көйгөйлөрдү белгилөөгө, аларды оңдоого даяр адамдарды табууга жана эмгек үчүн ыраазычылык билдирүүгө жардам берет.",su:"Катталуу",li:"Кирүү",back:"← Артка",cr:"Аккаунт түзүү",crl:"Кантип катталарыңызды тандаңыз.",goog:"Google менен улантуу",appl:"Apple менен улантуу",soon:"жакында",orm:"же электрондук почта менен",nm:"Аты",nmp:"Атыңыз",em:"Электрондук почта",pw:"Сырсөз",pwp:"Кеминде 6 символ",crb:"Аккаунт түзүү",gh:"Gmail аккаунтун Google менен да, сырсөз менен да колдонсо болот.",ha:"Аккаунтуңуз барбы?",lg:"Аккаунтка кирүү",lgl:"Сизди кайра көрүп турганыбызга кубанычтабыз.",fg:"Сырсөздү унуттуңузбу?",pwp2:"Сырсөзүңүз",oro:"болбой жатабы? башка жол менен кириңиз",gi:"Google аркылуу кирүү",na:"Аккаунтуңуз жокпу?",rsl:"Почтаңызды киргизиңиз, биз жаңы сырсөз үчүн шилтеме жиберебиз. Эгер Google аркылуу кирсеңиз, «Google аркылуу кирүү» баскычын басыңыз.",snd:"Шилтеме жиберүү",bl:"← Кирүүгө кайтуу",
 ah:"Ыңгайлуу шаар кичинекей иштерден башталат",ap:"Shaar — тургундар үйүнүн жанындагы көйгөйлөрдү белгилеген платформа: сынган жол, таштанды, күйбөгөн чырак. Ар бир адам милдетти өзүнө алып, оңдоп, натыйжаны сүрөттө көрсөтө алат.",
 av:"Эмне үчүн Shaar",a1h:"Баары картада",a1p:"Көйгөйлөр баарына көрүнөт жана даттануулардын арасында жоголбойт.",a2h:"Тургундардын өзү чечет",a2p:"Ыктыярчылар жана демөөрчүлөр милдеттерди өзүнө алышат.",a3h:"Чынчыл натыйжа",a3p:"«Мурун» жана «кийин» сүрөттөрү, тургундардын баасы.",
 ch:"Shaar сертификатын кантип алса болот",c1:"Көйгөйдү чечип, натыйжаны сүрөт менен көрсөтүңүз. Тургундар жумушуңузду жылдызчалар менен баалашат.",c2:"Эгер кеминде беш адам баалап, орточо баа 4,5тен төмөн болбосо, сертификат жеке кабинетиңизде автоматтык түрдө пайда болот. Аны PDF форматында жүктөп алып, портфолиого кошсоңуз болот.",cw:"Сертификат",cs:"Shaar платформасы тарабынан берилди",cf:"шаардык көйгөйдү чечкени үчүн",
 sh:"Shaar кантип иштейт",s1h:"Көйгөйдү белгилеңиз",s1p:"Сүрөт, сүрөттөмө жана картадагы чекит.",s2h:"Милдетти алыңыз",s2p:"Ыктыярчы же демөөрчү аны өзүнө алат.",s3h:"Натыйжаны көрсөтүңүз",s3p:"«Мурун» жана «кийин» сүрөттөрү, тургундардын баасы.",s4h:"Сертификат алыңыз",s4p:"Ал кабинетиңизде түбөлүккө сакталат.",
 ph:"Өнөктөштөр",pp:"Транспорт компанияларын, уюмдарды жана шаардык кызматтарды Shaar өнөктөшү болууга чакырабыз.",pb:"Өнөктөш болуу",uh:"Колдоо кызматы",up:"Суроолоруңуз барбы? Кайрылыңыз, жардам беребиз.",fo:"Негиздөөчү",
 plh:"Жерди тандаңыз",pll:"Дарек издеңиз, картаны басыңыз же азыр кайда экениңизди аныктаңыз.",sph:"Шаар, көчө, район же жер",fnd:"Издөө",loc:"Мени аныктоо",conf:"Жерди ырастоо",out:"Аккаунттан чыгуу",lo:"Чыгуу",t1:"Жаңы",t2:"Иштелүүдө",t3:"Чечилди",
 wait:"Жайгашкан жериңиз аныкталууда…",finding:"Дарек аныкталууда…",noGeo:"Браузер жайгашкан жерди аныктай албайт. Дарек издеңиз же картаны басыңыз.",geoFail:"Автоматтык аныктоо болгон жок. Дарек издеңиз же картаны басыңыз.",noAddr:"Бул жерде дарек жок. Кургактыктан жер тандаңыз.",noRes:"Эч нерсе табылган жок. Башкача жазып көрүңүз.",resetOk:"Мындай аккаунт бар болсо, кат жиберилди. Почтаңызды жана «Спам» папкасын текшериңиз.",
 cont:"Улантуу:",guest:"конок",shw:"Көрсөтүү",hid:"Жашыруу",hi:"Салам",you:"Сиздин жериңиз",untitled:"Аталышы жок",
 em1:"Жаңы көйгөйлөр азырынча жок. Жакында биринчисин белгилей аласыз.",em2:"Азыр эч ким эч нерсе оңдоп жаткан жок. Милдетти жаңылардын тизмесинен алсаңыз болот.",em3:"Чечилген көйгөйлөр азырынча жок. Алар бул жерде «мурун» жана «кийин» сүрөттөрү менен чыгат.",
 eInUse:"Бул почта мурунтан катталган. «Кирүү» баскычын басыңыз.",eEmail:"Почтанын дарегин текшериңиз.",eWeak:"Сырсөз өтө жөнөкөй. Кеминде 6 символ керек.",eCred:"Почта же сырсөз туура эмес.",eNoUser:"Мындай почта менен аккаунт табылган жок.",eMany:"Өтө көп аракет. Бир аз күтүп, кайра аракет кылыңыз.",eNet:"Интернет жок. Байланышты текшериңиз.",eOp:"Бул кирүү ыкмасы Firebase'де иштетилген эмес.",ePop:"Браузер кирүү терезесин бөгөттөдү. Калкыма терезелерге уруксат бериңиз.",eGen:"Бир нерсе туура эмес болду. Интернетти текшерип, кайра аракет кылыңыз."},
uz:{title:"Shaar: shahar muammolari platformasi",h1:"Muammoni payqadingizmi? Uni shahar bilan birga hal qiling",lead:"Shaar muammolarni belgilashga, ularni tuzatishga tayyor odamlarni topishga va mehnat uchun minnatdorchilik bildirishga yordam beradi.",su:"Ro‘yxatdan o‘tish",li:"Kirish",back:"← Orqaga",cr:"Akkaunt yaratish",crl:"Qanday ro‘yxatdan o‘tishni tanlang.",goog:"Google bilan davom etish",appl:"Apple bilan davom etish",soon:"tez orada",orm:"yoki elektron pochta orqali",nm:"Ism",nmp:"Ismingiz",em:"Elektron pochta",pw:"Parol",pwp:"Kamida 6 ta belgi",crb:"Akkaunt yaratish",gh:"Gmail akkauntini Google bilan ham, parol bilan ham ishlatish mumkin.",ha:"Akkauntingiz bormi?",lg:"Akkauntga kirish",lgl:"Sizni yana ko‘rib turganimizdan xursandmiz.",fg:"Parolni unutdingizmi?",pwp2:"Parolingiz",oro:"bo‘lmayaptimi? boshqa usulda kiring",gi:"Google orqali kirish",na:"Akkauntingiz yo‘qmi?",rsl:"Pochtangizni kiriting, biz yangi parol uchun havola yuboramiz. Agar Google orqali kirgan bo‘lsangiz, «Google orqali kirish» tugmasini bosing.",snd:"Havola yuborish",bl:"← Kirishga qaytish",
 ah:"Qulay shahar kichik ishlardan boshlanadi",ap:"Shaar — aholi uy yonidagi muammolarni belgilaydigan platforma: buzilgan yo‘l, axlat, yonmaydigan chiroq. Har kim vazifani o‘z zimmasiga olib, tuzatib, natijani rasmda ko‘rsatishi mumkin.",
 av:"Nega Shaar",a1h:"Hammasi xaritada",a1p:"Muammolar hammaga ko‘rinadi va shikoyatlar orasida yo‘qolmaydi.",a2h:"Aholining o‘zi hal qiladi",a2p:"Ko‘ngillilar va homiylar vazifalarni o‘z zimmasiga oladi.",a3h:"Halol natija",a3p:"«Oldin» va «keyin» rasmlari, aholi baholari.",
 ch:"Shaar sertifikatini qanday olish mumkin",c1:"Muammoni hal qiling va natijani rasmda ko‘rsating. Aholi ishingizni yulduzchalar bilan baholaydi.",c2:"Kamida besh kishi baholasa va o‘rtacha baho 4,5 dan past bo‘lmasa, sertifikat shaxsiy kabinetingizda avtomatik paydo bo‘ladi. Uni PDF formatida yuklab olib, portfolioga qo‘shishingiz mumkin.",cw:"Sertifikat",cs:"Shaar platformasi tomonidan berildi",cf:"shahar muammosini hal qilgani uchun",
 sh:"Shaar qanday ishlaydi",s1h:"Muammoni belgilang",s1p:"Rasm, tavsif va xaritadagi nuqta.",s2h:"Vazifani oling",s2p:"Ko‘ngilli yoki homiy uni o‘z zimmasiga oladi.",s3h:"Natijani ko‘rsating",s3p:"«Oldin» va «keyin» rasmlari, aholi baholari.",s4h:"Sertifikat oling",s4p:"U kabinetingizda abadiy saqlanadi.",
 ph:"Hamkorlar",pp:"Transport kompaniyalari, tashkilotlar va shahar xizmatlarini Shaar hamkori bo‘lishga taklif qilamiz.",pb:"Hamkor bo‘lish",uh:"Qo‘llab-quvvatlash xizmati",up:"Savollaringiz bormi? Murojaat qiling, yordam beramiz.",fo:"Asoschi",
 plh:"Joyni tanlang",pll:"Manzilni qidiring, xaritani bosing yoki hozir qayerdaligingizni aniqlang.",sph:"Shahar, ko‘cha, tuman yoki joy",fnd:"Qidirish",loc:"Meni aniqlash",conf:"Joyni tasdiqlash",out:"Akkauntdan chiqish",lo:"Chiqish",t1:"Yangi",t2:"Jarayonda",t3:"Hal qilingan",
 wait:"Joylashuvingiz aniqlanmoqda…",finding:"Manzil aniqlanmoqda…",noGeo:"Brauzer joylashuvni aniqlay olmaydi. Manzilni qidiring yoki xaritani bosing.",geoFail:"Avtomatik aniqlab bo‘lmadi. Manzilni qidiring yoki xaritani bosing.",noAddr:"Bu yerda manzil yo‘q. Quruqlikdan joy tanlang.",noRes:"Hech narsa topilmadi. Boshqacha yozib ko‘ring.",resetOk:"Bunday akkaunt bo‘lsa, xat yuborildi. Pochtangiz va «Spam» papkasini tekshiring.",
 cont:"Davom etish:",guest:"mehmon",shw:"Ko‘rsatish",hid:"Yashirish",hi:"Salom",you:"Sizning joyingiz",untitled:"Nomsiz",
 em1:"Yangi muammolar hozircha yo‘q. Tez orada birinchisini belgilay olasiz.",em2:"Hozir hech kim hech narsani tuzatayotgani yo‘q. Vazifani yangilar ro‘yxatidan olasiz.",em3:"Hal qilingan muammolar hozircha yo‘q. Ular bu yerda «oldin» va «keyin» rasmlari bilan chiqadi.",
 eInUse:"Bu pochta allaqachon ro‘yxatdan o‘tgan. «Kirish» tugmasini bosing.",eEmail:"Pochta manzilini tekshiring.",eWeak:"Parol juda oddiy. Kamida 6 ta belgi kerak.",eCred:"Pochta yoki parol noto‘g‘ri.",eNoUser:"Bunday pochta bilan akkaunt topilmadi.",eMany:"Urinishlar juda ko‘p. Biroz kutib, qayta urinib ko‘ring.",eNet:"Internet yo‘q. Aloqani tekshiring.",eOp:"Bu kirish usuli Firebase’da yoqilmagan.",ePop:"Brauzer kirish oynasini to‘sib qo‘ydi. Qalqib chiquvchi oynalarga ruxsat bering.",eGen:"Nimadir xato ketdi. Internetni tekshirib, qayta urinib ko‘ring."}
};
Object.assign(D.ru, { t1: "Запросы", t2: "В процессе", t3: "Завершённые" });
Object.assign(D.ru, { allTasks: "Все задачи" });
Object.assign(D.en, { allTasks: "All tasks" });
Object.assign(D.ky, { allTasks: "Бардык тапшырмалар" });
Object.assign(D.uz, { allTasks: "Barcha vazifalar" });
Object.assign(D.ru, { projectSection: "Задачи города" });
Object.assign(D.en, { projectSection: "City tasks" });
Object.assign(D.ky, { projectSection: "Шаар тапшырмалары" });
Object.assign(D.uz, { projectSection: "Shahar vazifalari" });
Object.assign(D.ru, { countryLabel:"Страна",cityLabel:"Город",countriesAll:"Все страны СНГ",citiesAll:"Все города",resetFilter:"Сбросить фильтр",mapLabel:"Карта",mapOpen:"Открыть карту",profileLabel:"Личный кабинет",showMe:"Показать меня",chooseTaskLocation:"Указать место задачи",likeLabel:"Нравится",commentsLabel:"Комментарии",shareLabel:"Поделиться",saveLabel:"Сохранить",takeTask:"Взять на себя",takenTask:"Взято на себя",progressView:"Ход работ",progressAdd:"Добавить отчёт",progressTitle:"Отчёт о ходе работы",progressText:"Что уже сделано?",progressPhoto:"Фотоотчёт (необязательно)",progressPublish:"Опубликовать отчёт",progressEmpty:"Пока отчётов нет.",commentPlaceholder:"Напишите комментарий…",sendLabel:"Отправить",rateLabel:"Оцените результат",addressLoading:"Определяем ваше местоположение…",addressUnavailable:"Местоположение не определено" });
Object.assign(D.en, { countryLabel:"Country",cityLabel:"City",countriesAll:"All CIS countries",citiesAll:"All cities",resetFilter:"Reset filters",mapLabel:"Map",mapOpen:"Open map",profileLabel:"My profile",showMe:"Show my location",chooseTaskLocation:"Choose task location",likeLabel:"Like",commentsLabel:"Comments",shareLabel:"Share",saveLabel:"Save",takeTask:"Take responsibility",takenTask:"Taken",progressView:"Work updates",progressAdd:"Add an update",progressTitle:"Work progress report",progressText:"What have you done so far?",progressPhoto:"Photo (optional)",progressPublish:"Publish update",progressEmpty:"No updates yet.",commentPlaceholder:"Write a comment…",sendLabel:"Send",rateLabel:"Rate the result",addressLoading:"Finding your location…",addressUnavailable:"Location unavailable",t1:"Requests",t2:"In progress",t3:"Completed" });
Object.assign(D.ky, { countryLabel:"Өлкө",cityLabel:"Шаар",countriesAll:"Бардык КМШ өлкөлөрү",citiesAll:"Бардык шаарлар",resetFilter:"Чыпканы тазалоо",mapLabel:"Карта",mapOpen:"Картаны ачуу",profileLabel:"Жеке кабинет",showMe:"Менин ордумду көрсөтүү",chooseTaskLocation:"Тапшырманын ордун тандоо",likeLabel:"Жакты",commentsLabel:"Комментарийлер",shareLabel:"Бөлүшүү",saveLabel:"Сактоо",takeTask:"Жоопкерчилик алуу",takenTask:"Алынды",progressView:"Иштин жүрүшү",progressAdd:"Отчёт кошуу",progressTitle:"Иштин жүрүшү жөнүндө отчёт",progressText:"Эмне аткарылды?",progressPhoto:"Сүрөт (милдеттүү эмес)",progressPublish:"Отчётту жарыялоо",progressEmpty:"Азырынча отчёт жок.",commentPlaceholder:"Комментарий жазыңыз…",sendLabel:"Жөнөтүү",rateLabel:"Натыйжага баа бериңиз",addressLoading:"Жайгашкан жериңиз аныкталууда…",addressUnavailable:"Жайгашкан жер аныкталган жок",t1:"Сурамдар",t2:"Аткарылууда",t3:"Аяктады" });
Object.assign(D.uz, { countryLabel:"Mamlakat",cityLabel:"Shahar",countriesAll:"Barcha MDH davlatlari",citiesAll:"Barcha shaharlar",resetFilter:"Filtrni tozalash",mapLabel:"Xarita",mapOpen:"Xaritani ochish",profileLabel:"Shaxsiy kabinet",showMe:"Joylashuvimni ko‘rsatish",chooseTaskLocation:"Vazifa joyini tanlash",likeLabel:"Yoqdi",commentsLabel:"Izohlar",shareLabel:"Ulashish",saveLabel:"Saqlash",takeTask:"Mas’uliyatni olish",takenTask:"Olingan",progressView:"Ish jarayoni",progressAdd:"Hisobot qo‘shish",progressTitle:"Ish jarayoni hisoboti",progressText:"Nimalar bajarildi?",progressPhoto:"Rasm (ixtiyoriy)",progressPublish:"Hisobotni e’lon qilish",progressEmpty:"Hozircha hisobotlar yo‘q.",commentPlaceholder:"Izoh yozing…",sendLabel:"Yuborish",rateLabel:"Natijani baholang",addressLoading:"Joylashuvingiz aniqlanmoqda…",addressUnavailable:"Joylashuv aniqlanmadi",t1:"So‘rovlar",t2:"Jarayonda",t3:"Yakunlangan" });
Object.assign(D.ru,{mapTitle:"Карта задач",mapDescription:"Посмотрите задачи рядом или укажите место новой публикации.",createTask:"Создать запрос",chooseOnMap:"Выбрать на карте",unknownAddress:"Местоположение не определено",likeDone:"Вам нравится эта задача",saveDone:"Задача сохранена",takeDone:"Вы взяли задачу на себя",updateDone:"Отчёт о ходе работы опубликован",cisOnly:"Сейчас публикации доступны только в странах СНГ.",shareCopied:"Ссылка скопирована.",taskAlreadyTaken:"Эту задачу уже взяли."});
Object.assign(D.en,{mapTitle:"Task map",mapDescription:"Explore nearby tasks or choose a location for a new report.",createTask:"Create a report",chooseOnMap:"Choose on map",unknownAddress:"Location not detected",likeDone:"You liked this task",saveDone:"Task saved",takeDone:"You took responsibility for this task",updateDone:"Work update published",cisOnly:"Reports are currently limited to CIS countries.",shareCopied:"Link copied.",taskAlreadyTaken:"This task has already been taken."});
Object.assign(D.ky,{mapTitle:"Тапшырмалар картасы",mapDescription:"Жакынкы тапшырмаларды көрүңүз же жаңы билдирүү үчүн жерди тандаңыз.",createTask:"Сурам түзүү",chooseOnMap:"Картадан тандоо",unknownAddress:"Жайгашкан жер аныкталган жок",likeDone:"Бул тапшырма сизге жакты",saveDone:"Тапшырма сакталды",takeDone:"Сиз тапшырманы жоопкерчиликке алдыңыз",updateDone:"Иш жүрүшү тууралуу отчёт жарыяланды",cisOnly:"Азырынча билдирүүлөр КМШ өлкөлөрүндө гана жеткиликтүү.",shareCopied:"Шилтеме көчүрүлдү.",taskAlreadyTaken:"Бул тапшырманы башка адам алды."});
Object.assign(D.uz,{mapTitle:"Vazifalar xaritasi",mapDescription:"Yaqin vazifalarni ko‘ring yoki yangi murojaat joyini tanlang.",createTask:"Murojaat yaratish",chooseOnMap:"Xaritadan tanlash",unknownAddress:"Joylashuv aniqlanmadi",likeDone:"Bu vazifa sizga yoqdi",saveDone:"Vazifa saqlandi",takeDone:"Siz vazifani mas’uliyatga oldingiz",updateDone:"Ish jarayoni hisoboti e’lon qilindi",cisOnly:"Hozircha murojaatlar faqat MDH davlatlarida qabul qilinadi.",shareCopied:"Havola nusxalandi.",taskAlreadyTaken:"Bu vazifa allaqachon olingan."});
Object.assign(D.ru,{beforeCaption:"До",afterCaption:"После",privateProfile:"Закрытый профиль",resident:"Житель города",noDescription:"Без описания",noAddress:"Место не указано",noComments:"Пока нет комментариев.",completeTask:"Отметить завершённой",progressPhotoCaption:"Фотоотчёт",updatesTitle:"Ход работы",updateBy:"Отчёт от",geoDenied:"Разрешите браузеру доступ к местоположению, чтобы показать текущий адрес.",mapHint:"Нажмите на карту, чтобы указать место задачи.",closeLabel:"Закрыть",cancelLabel:"Отмена",selectedPlace:"Место выбрано",locationInstruction:"Укажите место кнопкой или выберите точку на карте.",completeDenied:"Завершить задачу может её автор или исполнитель.",progressDenied:"Добавить отчёт может автор или исполнитель задачи."});
Object.assign(D.en,{beforeCaption:"Before",afterCaption:"After",privateProfile:"Private profile",resident:"City resident",noDescription:"No description",noAddress:"Location not specified",noComments:"No comments yet.",completeTask:"Mark as complete",progressPhotoCaption:"Progress photo",updatesTitle:"Work updates",updateBy:"Update by",geoDenied:"Allow location access in your browser to show your current address.",mapHint:"Click the map to set the task location.",closeLabel:"Close",cancelLabel:"Cancel",selectedPlace:"Location selected",locationInstruction:"Use the location button or choose a point on the map.",completeDenied:"Only the task owner or assignee can complete it.",progressDenied:"Only the task owner or assignee can add a report."});
Object.assign(D.ky,{beforeCaption:"Мурун",afterCaption:"Кийин",privateProfile:"Жабык профиль",resident:"Шаардын тургуну",noDescription:"Сүрөттөмө жок",noAddress:"Жайгашкан жер көрсөтүлгөн эмес",noComments:"Азырынча комментарий жок.",completeTask:"Аяктады деп белгилөө",progressPhotoCaption:"Иштин сүрөтү",updatesTitle:"Иштин жүрүшү",updateBy:"Отчёт автору",geoDenied:"Учурдагы даректи көрсөтүү үчүн браузерден жайгашкан жерге уруксат бериңиз.",mapHint:"Тапшырманын ордун белгилөө үчүн картаны басыңыз.",closeLabel:"Жабуу",cancelLabel:"Жокко чыгаруу",selectedPlace:"Жер тандалды",locationInstruction:"Жайгашуу баскычын колдонуңуз же картадан чекит тандаңыз.",completeDenied:"Тапшырманы автору же аткаруучусу гана бүтүрө алат.",progressDenied:"Отчётту тапшырманын автору же аткаруучусу гана кошо алат."});
Object.assign(D.uz,{beforeCaption:"Oldin",afterCaption:"Keyin",privateProfile:"Yopiq profil",resident:"Shahar fuqarosi",noDescription:"Tavsif yo‘q",noAddress:"Manzil ko‘rsatilmagan",noComments:"Hozircha izohlar yo‘q.",completeTask:"Bajarildi deb belgilash",progressPhotoCaption:"Jarayon rasmi",updatesTitle:"Ish jarayoni",updateBy:"Hisobot muallifi",geoDenied:"Joriy manzilni ko‘rsatish uchun brauzerda joylashuvga ruxsat bering.",mapHint:"Vazifa joyini belgilash uchun xaritani bosing.",closeLabel:"Yopish",cancelLabel:"Bekor qilish",selectedPlace:"Joy tanlandi",locationInstruction:"Joylashuv tugmasidan foydalaning yoki xaritadan nuqtani tanlang.",completeDenied:"Vazifani faqat muallif yoki ijrochi yakunlashi mumkin.",progressDenied:"Hisobotni faqat vazifa muallifi yoki ijrochisi qo‘sha oladi."});
Object.assign(D.ru,{ePermission:"Firebase Rules не разрешают это действие. Добавьте доступ к подколлекции updates в правила Firestore."});
Object.assign(D.en,{ePermission:"Firebase Rules blocked this action. Allow access to the updates subcollection in Firestore rules."});
Object.assign(D.ky,{ePermission:"Firebase Rules бул аракетке уруксат берген жок. Firestore эрежелеринде updates подколлекциясына уруксат бериңиз."});
Object.assign(D.uz,{ePermission:"Firebase Rules bu amalni blokladi. Firestore qoidalarida updates ichki to‘plamiga ruxsat bering."});
Object.assign(D.ru,{shareTitle:"Городская задача в Shaar",completeDone:"Задача завершена. Фото видно только до закрытия страницы."});
Object.assign(D.en,{shareTitle:"City task on Shaar",completeDone:"Task completed. The photo stays visible only until you close this page."});
Object.assign(D.ky,{shareTitle:"Shaar шаардык тапшырмасы",completeDone:"Тапшырма аяктады. Сүрөт барак жабылганга чейин гана көрүнөт."});
Object.assign(D.uz,{shareTitle:"Shaar shahar vazifasi",completeDone:"Vazifa yakunlandi. Rasm sahifa yopilguncha ko‘rinadi."});
Object.assign(D.ru,{profileSettings:"Настройки",profileTitle:"Личный кабинет",profilePhotoAlt:"Фото профиля",profilePostCount:"публикаций",profileCertCount:"сертификатов",myPosts:"Мои публикации",certificates:"Сертификаты",profileIntro:"Добавьте несколько слов о себе в настройках.",profileEmptyPosts:"Ваши запросы и выполненные задачи появятся здесь.",profileEmptyCerts:"Сертификаты появятся здесь после высокой оценки завершённой задачи.",certificateTitle:"СЕРТИФИКАТ",certificateFor:"За:",cityContribution:"вклад в улучшение города",profileSaved:"Профиль сохранён.",certIssued:"Сертификат выдан и добавлен в личный кабинет автора.",certLoadError:"Не удалось загрузить сертификаты. Проверьте правила Firestore.",settingsTitle:"Настройки профиля",nameLabel:"Имя",bioLabel:"О себе",bioPlaceholder:"Напишите коротко о себе",profilePhoto:"Фото профиля",tempPhotoHint:"Фото будет видно только до закрытия вкладки.",privacyLabel:"Конфиденциальность",publicProfileLabel:"Открытый профиль",privateProfileLabel:"Закрытый профиль",privacyHint:"Публикации городских проблем остаются видимыми всем.",themeLabel:"Оформление",lightTheme:"Светлая тема",darkTheme:"Тёмная тема",saveChanges:"Сохранить",taskTitle:"Новый запрос",taskLead:"Опишите, что нужно исправить, добавьте фото и точное место.",descriptionLabel:"Описание",descriptionPlaceholder:"Что произошло и какая помощь нужна?",addressLabel:"Точный адрес",addressPlaceholder:"Улица, дом, район",photoPlace:"Фото места",tempTaskPhotoHint:"Фото останется в этой вкладке до её закрытия и не отправляется в Firebase Storage.",publishTask:"Опубликовать запрос",tasksFilter:"Фильтр задач",languageLabel:"Язык",themeToggle:"Переключить тему",emAll:"Пока задач нет. Создайте первую городскую задачу.",eLoadTasks:"Не удалось загрузить запросы из Firebase. Проверьте правила Firestore.",eOpenProfile:"Не удалось открыть профиль. Проверьте подключение Firebase.",chooseLocation:"Выберите точку на карте или определите своё местоположение.",addPhoto:"Добавьте фотографию проблемы.",publishSuccess:"Запрос опубликован.",eCompletePhoto:"Не удалось загрузить фото завершённой работы.",eComment:"Не удалось отправить комментарий. Проверьте доступ Firebase.",ownRating:"Нельзя оценить собственную задачу."});
Object.assign(D.en,{profileSettings:"Settings",profileTitle:"My profile",profilePhotoAlt:"Profile photo",profilePostCount:"posts",profileCertCount:"certificates",myPosts:"My posts",certificates:"Certificates",profileIntro:"Add a few words about yourself in settings.",profileEmptyPosts:"Your reports and completed tasks will appear here.",profileEmptyCerts:"Certificates will appear here after a completed task receives a high rating.",certificateTitle:"CERTIFICATE",certificateFor:"For:",cityContribution:"contribution to improving the city",profileSaved:"Profile saved.",certIssued:"Certificate issued and added to the author's profile.",certLoadError:"Could not load certificates. Check your Firestore rules.",settingsTitle:"Profile settings",nameLabel:"Name",bioLabel:"About me",bioPlaceholder:"Write a short introduction",profilePhoto:"Profile photo",tempPhotoHint:"The photo stays visible until you close this tab.",privacyLabel:"Privacy",publicProfileLabel:"Public profile",privateProfileLabel:"Private profile",privacyHint:"City reports remain visible to everyone.",themeLabel:"Appearance",lightTheme:"Light theme",darkTheme:"Dark theme",saveChanges:"Save",taskTitle:"New report",taskLead:"Describe what needs fixing, add a photo and the exact location.",descriptionLabel:"Description",descriptionPlaceholder:"What happened and what help is needed?",addressLabel:"Exact address",addressPlaceholder:"Street, building, district",photoPlace:"Photo of the place",tempTaskPhotoHint:"The photo stays in this tab until it is closed and is not sent to Firebase Storage.",publishTask:"Publish report",tasksFilter:"Task filters",languageLabel:"Language",themeToggle:"Switch theme",emAll:"No tasks yet. Create the first city task.",eLoadTasks:"Could not load reports from Firebase. Check your Firestore rules.",eOpenProfile:"Could not open the profile. Check the Firebase connection.",chooseLocation:"Choose a point on the map or detect your current location.",addPhoto:"Add a photo of the problem.",publishSuccess:"Report published.",eCompletePhoto:"Could not upload the completion photo.",eComment:"Could not send the comment. Check Firebase access.",ownRating:"You cannot rate your own task."});
Object.assign(D.ky,{profileSettings:"Жөндөөлөр",profileTitle:"Жеке кабинет",profilePhotoAlt:"Профилдин сүрөтү",profilePostCount:"билдирүү",profileCertCount:"сертификат",myPosts:"Менин билдирүүлөрүм",certificates:"Сертификаттар",profileIntro:"Жөндөөлөрдөн өзүңүз жөнүндө кыскача жазыңыз.",profileEmptyPosts:"Сурамдарыңыз жана аткарылган тапшырмаларыңыз бул жерде көрүнөт.",profileEmptyCerts:"Аткарылган тапшырма жогору бааланганда сертификат бул жерде көрүнөт.",certificateTitle:"СЕРТИФИКАТ",certificateFor:"Үчүн:",cityContribution:"шаарды жакшыртууга кошкон салымы",profileSaved:"Профиль сакталды.",certIssued:"Сертификат берилип, автордун кабинетине кошулду.",certLoadError:"Сертификаттарды жүктөө мүмкүн болгон жок. Firestore эрежелерин текшериңиз.",settingsTitle:"Профиль жөндөөлөрү",nameLabel:"Аты",bioLabel:"Өзүм жөнүндө",bioPlaceholder:"Өзүңүз жөнүндө кыскача жазыңыз",profilePhoto:"Профилдин сүрөтү",tempPhotoHint:"Сүрөт бул өтмөк жабылганга чейин гана көрүнөт.",privacyLabel:"Купуялык",publicProfileLabel:"Ачык профиль",privateProfileLabel:"Жабык профиль",privacyHint:"Шаардык көйгөйлөр тууралуу билдирүүлөр баарына көрүнөт.",themeLabel:"Көрүнүшү",lightTheme:"Ачык тема",darkTheme:"Караңгы тема",saveChanges:"Сактоо",taskTitle:"Жаңы сурам",taskLead:"Эмнени оңдоо керектигин сүрөттөп, сүрөтүн жана так ордун кошуңуз.",descriptionLabel:"Сүрөттөмө",descriptionPlaceholder:"Эмне болду жана кандай жардам керек?",addressLabel:"Так дарек",addressPlaceholder:"Көчө, үй, район",photoPlace:"Орддун сүрөтү",tempTaskPhotoHint:"Сүрөт бул өтмөк жабылганга чейин гана көрүнөт жана Firebase Storage'га жүктөлбөйт.",publishTask:"Сурамды жарыялоо",tasksFilter:"Тапшырмалардын чыпкасы",languageLabel:"Тил",themeToggle:"Теманы которуу",emAll:"Азырынча тапшырмалар жок. Биринчи шаардык тапшырманы түзүңүз.",eLoadTasks:"Firebase'ден билдирүүлөрдү жүктөө мүмкүн болгон жок. Firestore эрежелерин текшериңиз.",eOpenProfile:"Профилди ачуу мүмкүн болгон жок. Firebase байланышын текшериңиз.",chooseLocation:"Картадан чекитти тандаңыз же учурдагы ордуңузду аныктаңыз.",addPhoto:"Көйгөйдүн сүрөтүн кошуңуз.",publishSuccess:"Билдирүү жарыяланды.",eCompletePhoto:"Аткарылган иштин сүрөтүн жүктөө мүмкүн болгон жок.",eComment:"Комментарий жөнөтүлгөн жок. Firebase уруксаттарын текшериңиз.",ownRating:"Өз тапшырмаңызга баа бере албайсыз."});
Object.assign(D.uz,{profileSettings:"Sozlamalar",profileTitle:"Shaxsiy kabinet",profilePhotoAlt:"Profil rasmi",profilePostCount:"murojaat",profileCertCount:"sertifikat",myPosts:"Mening murojaatlarim",certificates:"Sertifikatlar",profileIntro:"Sozlamalarda o‘zingiz haqingizda qisqacha yozing.",profileEmptyPosts:"Murojaatlaringiz va bajarilgan vazifalaringiz shu yerda ko‘rinadi.",profileEmptyCerts:"Bajarilgan vazifa yuqori baholangach, sertifikat shu yerda ko‘rinadi.",certificateTitle:"SERTIFIKAT",certificateFor:"Uchun:",cityContribution:"shaharni yaxshilashga qo‘shgan hissasi",profileSaved:"Profil saqlandi.",certIssued:"Sertifikat berildi va muallif kabinetiga qo‘shildi.",certLoadError:"Sertifikatlarni yuklab bo‘lmadi. Firestore qoidalarini tekshiring.",settingsTitle:"Profil sozlamalari",nameLabel:"Ism",bioLabel:"Men haqimda",bioPlaceholder:"O‘zingiz haqingizda qisqacha yozing",profilePhoto:"Profil rasmi",tempPhotoHint:"Rasm bu sahifa yopilguncha ko‘rinadi.",privacyLabel:"Maxfiylik",publicProfileLabel:"Ochiq profil",privateProfileLabel:"Yopiq profil",privacyHint:"Shahar muammolari haqidagi murojaatlar hammaga ko‘rinadi.",themeLabel:"Ko‘rinish",lightTheme:"Yorug‘ mavzu",darkTheme:"Qorong‘i mavzu",saveChanges:"Saqlash",taskTitle:"Yangi murojaat",taskLead:"Nimani tuzatish kerakligini yozing, rasm va aniq joyni qo‘shing.",descriptionLabel:"Tavsif",descriptionPlaceholder:"Nima bo‘ldi va qanday yordam kerak?",addressLabel:"Aniq manzil",addressPlaceholder:"Ko‘cha, uy, tuman",photoPlace:"Joy rasmi",tempTaskPhotoHint:"Rasm bu sahifa yopilguncha ko‘rinadi va Firebase Storage'ga yuborilmaydi.",publishTask:"Murojaatni e’lon qilish",tasksFilter:"Vazifalar filtri",languageLabel:"Til",themeToggle:"Mavzuni almashtirish",emAll:"Hozircha vazifalar yo‘q. Birinchi shahar vazifasini yarating.",eLoadTasks:"Firebase'dan murojaatlarni yuklab bo‘lmadi. Firestore qoidalarini tekshiring.",eOpenProfile:"Profilni ochib bo‘lmadi. Firebase ulanishini tekshiring.",chooseLocation:"Xaritadan nuqtani tanlang yoki joriy joylashuvni aniqlang.",addPhoto:"Muammo rasmini qo‘shing.",publishSuccess:"Murojaat e’lon qilindi.",eCompletePhoto:"Yakunlangan ish rasmini yuklab bo‘lmadi.",eComment:"Izoh yuborilmadi. Firebase ruxsatlarini tekshiring.",ownRating:"O‘z vazifangizga baho bera olmaysiz."});
Object.assign(D.ru, { viewResult:"Посмотреть результат", refreshLocation:"Обновить местоположение" });
Object.assign(D.en, { viewResult:"View result", refreshLocation:"Refresh my location" });
Object.assign(D.ky, { viewResult:"Натыйжаны көрүү", refreshLocation:"Жайгашкан жерди жаңыртуу", t1:"Кайрылуулар", t2:"Аткарылууда", t3:"Аяктаган", allTasks:"Бардык тапшырмалар", takeTask:"Жоопкерчиликти алуу", takenTask:"Сиз жоопкерчиликти алдыңыз", progressView:"Иштин жүрүшү", progressAdd:"Аткарылышы тууралуу отчёт кошуу", progressTitle:"Тапшырманын аткарылышы тууралуу отчёт", progressText:"Кандай иштер аткарылды?", progressPhoto:"Иштин сүрөтү (милдеттүү эмес)", photoPlace:"Окуя болгон жердин сүрөтү", progressPublish:"Отчётту жарыялоо" });
Object.assign(D.uz, { viewResult:"Natijani ko‘rish", refreshLocation:"Joylashuvni yangilash", t1:"Murojaatlar", t2:"Jarayonda", t3:"Yakunlangan", allTasks:"Barcha vazifalar", takeTask:"Vazifani zimmasiga olish", takenTask:"Vazifa mas’uliyatingizga olindi", progressView:"Ish jarayonini ko‘rish", progressAdd:"Jarayon haqida hisobot qo‘shish", progressTitle:"Ish jarayoni hisoboti", progressText:"Qanday ishlar bajarildi?", progressPhoto:"Ish jarayoni rasmi (ixtiyoriy)", photoPlace:"Muammo joyining rasmi", progressPublish:"Hisobotni e’lon qilish" });
Object.assign(D.ky,{viewResult:"Жыйынтыкты көрүү",refreshLocation:"Жайгашкан жерди жаңыртуу",t1:"Кайрылуулар",t2:"Аткарылууда",t3:"Аяктады",allTasks:"Бардык тапшырмалар",takeTask:"Жоопкерчиликти алуу",takenTask:"Сиз жоопкерчиликти алдыңыз",progressView:"Иштин жүрүшүн көрүү",progressAdd:"Аткарылышы тууралуу отчёт кошуу",progressTitle:"Тапшырманын аткарылышы тууралуу отчёт",progressText:"Кандай иштер аткарылды?",progressPhoto:"Иштин сүрөтү (милдеттүү эмес)",photoPlace:"Окуя болгон жердин сүрөтү",progressPublish:"Отчётту жарыялоо"});
Object.assign(D.uz,{viewResult:"Natijani ko‘rish",refreshLocation:"Joylashuvni yangilash",t1:"Murojaatlar",t2:"Jarayonda",t3:"Yakunlandi",allTasks:"Barcha vazifalar",takeTask:"Vazifani zimmasiga olish",takenTask:"Vazifa mas’uliyatingizga olindi",progressView:"Ish jarayonini ko‘rish",progressAdd:"Jarayon haqida hisobot qo‘shish",progressTitle:"Ish jarayoni hisoboti",progressText:"Qanday ishlar bajarildi?",progressPhoto:"Ish jarayoni rasmi (ixtiyoriy)",photoPlace:"Muammo joyining rasmi",progressPublish:"Hisobotni e’lon qilish"});
Object.assign(D.ru,{addRequest:"Создать запрос",addProgress:"Добавить отчёт",addCompleted:"Завершить задачу",selectProgressTitle:"Добавить отчёт о ходе работы",selectCompleteTitle:"Завершить задачу",selectProgressPrompt:"Выберите задачу, за которую вы отвечаете",selectCompletePrompt:"Выберите задачу для завершения",continueAction:"Продолжить",noProgressTasks:"У вас нет задач в работе, к которым можно добавить отчёт.",noCompleteTasks:"У вас нет задач, которые можно завершить."});
Object.assign(D.en,{addRequest:"Create a request",addProgress:"Add an update",addCompleted:"Complete a task",selectProgressTitle:"Add a work update",selectCompleteTitle:"Complete a task",selectProgressPrompt:"Choose a task you are responsible for",selectCompletePrompt:"Choose a task to complete",continueAction:"Continue",noProgressTasks:"You have no in-progress tasks you can update.",noCompleteTasks:"You have no tasks available to complete."});
Object.assign(D.ky,{addRequest:"Кайрылуу түзүү",addProgress:"Отчёт кошуу",addCompleted:"Тапшырманы аяктоо",selectProgressTitle:"Иштин жүрүшү тууралуу отчёт кошуу",selectCompleteTitle:"Тапшырманы аяктоо",selectProgressPrompt:"Жоопкерчилигиңиздеги тапшырманы тандаңыз",selectCompletePrompt:"Аяктагыңыз келген тапшырманы тандаңыз",continueAction:"Улантуу",noProgressTasks:"Отчёт кошо турган аткарылып жаткан тапшырмаңыз жок.",noCompleteTasks:"Аяктоого даяр тапшырмаңыз жок."});
Object.assign(D.uz,{addRequest:"Murojaat yaratish",addProgress:"Hisobot qo‘shish",addCompleted:"Vazifani yakunlash",selectProgressTitle:"Ish jarayoni haqida hisobot qo‘shish",selectCompleteTitle:"Vazifani yakunlash",selectProgressPrompt:"Mas’ul bo‘lgan vazifangizni tanlang",selectCompletePrompt:"Yakunlamoqchi bo‘lgan vazifani tanlang",continueAction:"Davom etish",noProgressTasks:"Hisobot qo‘shish mumkin bo‘lgan vazifangiz yo‘q.",noCompleteTasks:"Yakunlash mumkin bo‘lgan vazifangiz yo‘q."});
Object.assign(D.ky,{viewResult:"Жыйынтыкты көрүү",refreshLocation:"Жайгашкан жерди кайра аныктоо",t1:"Кайрылуулар",t2:"Аткарылууда",t3:"Аяктаган",allTasks:"Бардык тапшырмалар",takeTask:"Тапшырманы аткарууга алуу",takenTask:"Тапшырма сизге бекитилди",progressView:"Иштин жүрүшүн көрүү",progressAdd:"Аткарылган иштер тууралуу отчёт кошуу",progressTitle:"Иштин жүрүшү жөнүндө отчёт",progressText:"Кандай иштер аткарылды?",progressPhoto:"Сүрөт (милдеттүү эмес)",photoPlace:"Окуя болгон жердин сүрөтү",progressPublish:"Отчётту жарыялоо",coordinatesLabel:"Координаттар",geoFail:"Жайгашкан жерди аныктоо мүмкүн болгон жок. Кайра аракет кылыңыз.",finding:"Дарек аныкталууда…"});
Object.assign(D.uz,{viewResult:"Natijani ko‘rish",refreshLocation:"Joylashuvni qayta aniqlash",t1:"Murojaatlar",t2:"Jarayonda",t3:"Yakunlangan",allTasks:"Barcha vazifalar",takeTask:"Vazifani bajarishga olish",takenTask:"Vazifa sizga biriktirildi",progressView:"Ish jarayonini ko‘rish",progressAdd:"Bajarilgan ishlar haqida hisobot qo‘shish",progressTitle:"Ish jarayoni hisoboti",progressText:"Qanday ishlar bajarildi?",progressPhoto:"Rasm (ixtiyoriy)",photoPlace:"Muammo joyining rasmi",progressPublish:"Hisobotni e’lon qilish",coordinatesLabel:"Koordinatalar",geoFail:"Joylashuvni aniqlab bo‘lmadi. Qayta urinib ko‘ring.",finding:"Manzil aniqlanmoqda…"});
Object.assign(D.ru,{coordinatesLabel:"Координаты",taskRemoved:"Запрос уже удалён.",participant:"Участник",cityTask:"Городская задача"});
Object.assign(D.en,{coordinatesLabel:"Coordinates",taskRemoved:"This request has been deleted.",participant:"Participant",cityTask:"City task"});
Object.assign(D.en,{createTask:"Submit a request",taskTitle:"New request",taskLead:"Describe what needs attention, add a photo, and provide the exact location.",publishTask:"Submit request"});
Object.assign(D.ky,{projectSection:"Шаардагы тапшырмалар",createTask:"Кайрылуу түзүү",taskTitle:"Жаңы кайрылуу",taskLead:"Оңдолушу керек болгон нерсени сүрөттөп, сүрөтүн жана так дарегин кошуңуз.",publishTask:"Кайрылууну жарыялоо",photoPlace:"Көйгөй болгон жердин сүрөтү",locationInstruction:"Жайгашкан жерди аныктоо баскычын басыңыз же картадан чекит тандаңыз.",selectedPlace:"Жайгашкан жер тандалды",chooseLocation:"Картадан чекитти тандаңыз же учурдагы жайгашкан жериңизди аныктаңыз.",takeTask:"Тапшырманы өз мойнуңузга алуу",takenTask:"Тапшырма сиздин жоопкерчилигиңизде",completeTask:"Аткарылды деп белгилөө",progressTitle:"Иштин жүрүшү тууралуу отчёт",taskRemoved:"Кайрылуу өчүрүлдү.",participant:"Катышуучу",cityTask:"Шаардык тапшырма"});
Object.assign(D.uz,{createTask:"Murojaat yuborish",taskTitle:"Yangi murojaat",taskLead:"Muammoni tasvirlab, surat va aniq manzilni kiriting.",publishTask:"Murojaatni yuborish",takeTask:"Vazifani o‘z zimmasiga olish",takenTask:"Vazifa sizga biriktirildi",completeTask:"Bajarildi deb belgilash",locationInstruction:"Joylashuvni aniqlash tugmasini bosing yoki xaritadan nuqtani tanlang.",selectedPlace:"Manzil tanlandi",taskRemoved:"Murojaat o‘chirildi.",participant:"Ishtirokchi",cityTask:"Shahar vazifasi"});
Object.assign(D.ru,{eAuthorizedDomain:"Домен сайта не добавлен в список разрешённых доменов Firebase Authentication."});
Object.assign(D.en,{eAuthorizedDomain:"This site domain is not listed in Firebase Authentication's authorized domains."});
Object.assign(D.ky,{eAuthorizedDomain:"Сайттын домени Firebase Authentication'деги уруксат берилген домендердин тизмесинде жок."});
Object.assign(D.uz,{eAuthorizedDomain:"Sayt domeni Firebase Authentication'dagi ruxsat etilgan domenlar ro‘yxatida yo‘q."});
Object.assign(D.ru,{deletePost:"Удалить публикацию",deleteConfirm:"Удалить эту публикацию? Это действие нельзя отменить.",deleteSuccess:"Публикация удалена.",deleteDenied:"Удалить публикацию может только её автор.",geoLowAccuracy:"Геопозиция пока неточная. Уточняем местоположение…"});
Object.assign(D.en,{deletePost:"Delete post",deleteConfirm:"Delete this post? This cannot be undone.",deleteSuccess:"Post deleted.",deleteDenied:"Only the author can delete this post.",geoLowAccuracy:"Location is approximate. Refining your position…"});
Object.assign(D.ky,{deletePost:"Жарыяны өчүрүү",deleteConfirm:"Бул жарыяны өчүрөсүзбү? Аракетти артка кайтаруу мүмкүн эмес.",deleteSuccess:"Жарыя өчүрүлдү.",deleteDenied:"Жарыяны анын автору гана өчүрө алат.",geoLowAccuracy:"Жайгашкан жер так эмес. Тактап жатабыз…"});
Object.assign(D.uz,{deletePost:"Murojaatni o‘chirish",deleteConfirm:"Bu murojaat o‘chirilsinmi? Bu amalni bekor qilib bo‘lmaydi.",deleteSuccess:"Murojaat o‘chirildi.",deleteDenied:"Murojaatni faqat muallifi o‘chira oladi.",geoLowAccuracy:"Joylashuv taxminiy. Aniqlashtirilmoqda…"});
const ERR = { "auth/email-already-in-use": "eInUse", "auth/invalid-email": "eEmail", "auth/weak-password": "eWeak", "auth/invalid-credential": "eCred",
  "auth/wrong-password": "eCred", "auth/user-not-found": "eNoUser", "auth/too-many-requests": "eMany", "auth/network-request-failed": "eNet",
  "auth/operation-not-allowed": "eOp", "auth/popup-blocked": "ePop", "auth/unauthorized-domain": "eAuthorizedDomain", "permission-denied": "ePermission" };

let lang = "ru", theme = "light";
try {
  const s = localStorage.getItem("shaarLang"), n = (navigator.language || "").slice(0, 2);
  lang = D[s] ? s : (D[n] ? n : "ru");
  theme = localStorage.getItem("shaarTheme") || "light";
} catch {}
Object.assign(D.ru, { tempTaskPhotoHint:"Фото будет сжато и сохранено вместе с запросом, поэтому останется доступным после обновления страницы.", photoTooLarge:"Фото слишком большое. Выберите снимок меньшего размера." });
Object.assign(D.en, { tempTaskPhotoHint:"The photo will be compressed and saved with the report, so it stays available after refreshing the page.", photoTooLarge:"This photo is too large. Choose a smaller image." });
Object.assign(D.ky, { tempTaskPhotoHint:"Сүрөт кысылып, сурам менен кошо сакталат жана баракты жаңырткандан кийин да көрүнөт.", photoTooLarge:"Сүрөт өтө чоң. Кичирээк сүрөттү тандаңыз." });
Object.assign(D.uz, { tempTaskPhotoHint:"Rasm siqilib, murojaat bilan birga saqlanadi va sahifani yangilagandan keyin ham ko‘rinadi.", photoTooLarge:"Rasm juda katta. Kichikroq rasmni tanlang." });
const t = (k) => (D[lang] && D[lang][k]) || D.ru[k] || k;

/* ---------- Помощники ---------- */
const $ = (id) => document.getElementById(id);
const SCREENS = ["loading", "welcome", "place", "home"];
const VIEWS = ["vChoose", "vSignup", "vLogin", "vReset"];
const dashboardToolbar = document.querySelector(".dashboard-toolbar");
if (dashboardToolbar) {
  const categoryTabs = dashboardToolbar.querySelector(".tabs"), categoryRow = document.createElement("div");
  categoryRow.className = "toolbar-category-row";
  dashboardToolbar.prepend(categoryRow);
  if (categoryTabs) categoryRow.append(categoryTabs);
}
const addressChip = $("where")?.parentElement;
if (addressChip) {
  const refreshButton = document.createElement("button");
  refreshButton.type = "button"; refreshButton.id = "refreshAddressBtn"; refreshButton.className = "chip location-chip";
  refreshButton.setAttribute("data-aria-i18n", "refreshLocation"); refreshButton.setAttribute("aria-label", "Обновить местоположение");
  while (addressChip.firstChild) refreshButton.append(addressChip.firstChild);
  const refreshIcon = document.createElement("span"); refreshIcon.className = "location-refresh"; refreshIcon.setAttribute("aria-hidden", "true"); refreshIcon.textContent = "↻"; refreshButton.append(refreshIcon);
  addressChip.replaceWith(refreshButton);
}
const languageSelect = $("langSel");
if (languageSelect) {
  languageSelect.setAttribute("translate", "no"); languageSelect.setAttribute("lang", "en");
  const nativeLanguageNames = { ru: "Русский", en: "English", ky: "Кыргызча", uz: "O‘zbekcha" };
  [...languageSelect.options].forEach((option) => { option.textContent = nativeLanguageNames[option.value] || option.textContent; option.setAttribute("translate", "no"); });
}
const uniq = (a) => [...new Set(a.filter(Boolean))];
const countryName = (c) => {
  if (c === "KG") return ({ ru: "Кыргызстан", en: "Kyrgyzstan", ky: "Кыргызстан", uz: "Qirgʻiziston" })[lang] || "Кыргызстан";
  try { return new Intl.DisplayNames([lang], { type: "region" }).of(c); } catch { return c; }
};
let currentUser = null, me = null;
let pickMap = null, pickMarker = null, picked = null, pickToken = 0;

function show(name) { SCREENS.forEach((s) => ($(s).hidden = s !== name)); window.scrollTo(0, 0); }
function go(view) { VIEWS.forEach((v) => ($(v).hidden = v !== view)); $(view).classList.add("rise"); }
function toast(msg) { const el = $("toast"); el.textContent = msg; el.hidden = false; setTimeout(() => (el.hidden = true), 5000); }

function avatarFor(photo, name) {
  if (photo) return photo;
  const ch = (name || "").trim().charAt(0);
  const letter = /\p{L}/u.test(ch) ? ch.toUpperCase() : "S";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='#1f6b47'/><text x='48' y='63' font-size='46' font-family='Arial' font-weight='700' text-anchor='middle' fill='white'>${letter}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
async function busy(btn, fn) {
  btn.disabled = true;
  try { await fn(); }
  catch (e) {
    console.error(e);
    if (e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") toast(e.code ? t(ERR[e.code] || "eGen") : (e.message || t("eGen")));
  } finally { btn.disabled = false; }
}

/* ---------- Язык и тема ---------- */
function setTheme(x) {
  theme = x; document.documentElement.dataset.theme = x;
  $("themeBtn").textContent = x === "dark" ? "☀" : "☾";
  try { localStorage.setItem("shaarTheme", x); } catch {}
}
function applyLang() {
  document.documentElement.lang = lang; document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach((e) => (e.textContent = t(e.dataset.i18n)));
  document.querySelectorAll("[data-ph]").forEach((e) => (e.placeholder = t(e.dataset.ph)));
  document.querySelectorAll("[data-aria-i18n]").forEach((e) => e.setAttribute("aria-label", t(e.dataset.ariaI18n)));
  document.querySelectorAll("[data-alt-i18n]").forEach((e) => (e.alt = t(e.dataset.altI18n)));
  document.querySelectorAll(".eye").forEach((b) => (b.textContent = b.parentElement.querySelector("input").type === "password" ? t("shw") : t("hid")));
  renderLogin();
  if (!$("home").hidden && me) {
    fillHome(false);
    if ($("profileModal").classList.contains("open")) renderProfileContent().catch((error) => { console.error(error); toast(t("certLoadError")); });
    if (lastAddressCoords) { const point = [...lastAddressCoords], token = locationLookupToken; lookupPostLocation(point[0], point[1]).then((latest) => { if (token !== locationLookupToken || point[0] !== lastAddressCoords?.[0] || point[1] !== lastAddressCoords?.[1]) return; me = { ...me, ...latest }; locationStatusKey = latest.address ? "" : "geoFail"; fillHome(false); }).catch(() => { if (token === locationLookupToken && point[0] === lastAddressCoords?.[0] && point[1] === lastAddressCoords?.[1]) { locationStatusKey = "geoFail"; fillHome(false); } }); }
  }
  if (!$("place").hidden && picked) {
    const token = ++pickToken, lat = picked.lat, lng = picked.lng;
    $("addr").textContent = t("finding");
    lookupPostLocation(lat, lng).then((latest) => {
      if (token !== pickToken || $("place").hidden) return;
      picked = latest;
      $("addr").textContent = uniq([countryName(latest.country), latest.region, latest.city, latest.district]).join(", ") || latest.address || t("selectedPlace");
      $("saveBtn").disabled = !latest.country;
    }).catch((error) => {
      if (token !== pickToken || $("place").hidden) return;
      console.error("Could not translate the selected location.", error);
      $("addr").textContent = picked.address || t("geoFail");
    });
  } else if (!$("place").hidden) $("addr").textContent = t("wait");
}
$("langSel").value = lang;
$("langSel").onchange = (e) => { lang = e.target.value; try { localStorage.setItem("shaarLang", lang); } catch {} applyLang(); };
$("themeBtn").onclick = () => setTheme(theme === "dark" ? "light" : "dark");

/* ---------- Запомненный аккаунт ---------- */
function getLast() { try { return JSON.parse(localStorage.getItem("shaarLastUser")); } catch { return null; } }
function setLast(u) {
  try {
    localStorage.setItem("shaarLastUser", JSON.stringify({
      name: u.displayName || "", email: u.email || "", photo: u.photoURL || "",
      provider: (u.providerData[0] && u.providerData[0].providerId) || ""
    }));
  } catch {}
}
function renderLogin() {
  const last = getLast();
  $("returning").hidden = !last;
  if (last) {
    $("lastName").textContent = t("cont") + " " + (last.name.split(" ")[0] || last.email || t("guest"));
    $("lastEmail").textContent = last.email;
    $("lastPhoto").src = avatarFor(last.photo, last.name || last.email);
  }
}

/* ---------- Формы входа и регистрации ---------- */
document.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
$("toSignup").onclick = () => go("vSignup");
$("toLogin").onclick = () => go("vLogin");
document.querySelectorAll(".eye").forEach((b) => (b.onclick = () => {
  const inp = b.parentElement.querySelector("input");
  inp.type = inp.type === "password" ? "text" : "password";
  b.textContent = inp.type === "password" ? t("shw") : t("hid");
}));

function googleLogin(hint) {
  const p = new GoogleAuthProvider();
  p.setCustomParameters(hint ? { login_hint: hint } : { prompt: "select_account" });
  return signInWithPopup(auth, p).catch((error) => {
    if (["auth/popup-blocked", "auth/operation-not-supported-in-this-environment"].includes(error.code)) return signInWithRedirect(auth, p);
    throw error;
  });
}
document.querySelectorAll(".gbtn").forEach((b) => (b.onclick = () => busy(b, () => googleLogin())));
$("continueBtn").onclick = () => {
  const last = getLast();
  if (last && last.provider === "google.com") busy($("continueBtn"), () => googleLogin(last.email));
  else { go("vLogin"); $("liEmail").value = last ? last.email : ""; $("liPass").focus(); }
};
$("signupForm").onsubmit = (e) => {
  e.preventDefault();
  busy($("signupBtn"), async () => {
    const cred = await createUserWithEmailAndPassword(auth, $("suEmail").value.trim(), $("suPass").value);
    const name = $("suName").value.trim();
    if (name) await updateProfile(cred.user, { displayName: name });
    setLast(cred.user);
  });
};
$("loginForm").onsubmit = (e) => {
  e.preventDefault();
  busy($("loginBtn"), () => signInWithEmailAndPassword(auth, $("liEmail").value.trim(), $("liPass").value));
};
$("resetForm").onsubmit = (e) => {
  e.preventDefault();
  busy($("resetBtn"), async () => {
    await sendPasswordResetEmail(auth, $("rsEmail").value.trim());
    toast(t("resetOk"));
    $("liEmail").value = $("rsEmail").value.trim();
    go("vLogin");
  });
};
$("rsEmail").addEventListener("focus", () => { if (!$("rsEmail").value) $("rsEmail").value = $("liEmail").value; });

/* ---------- Выбор места ---------- */
const OSM = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTR = "&copy; OpenStreetMap";

function initPickMap() {
  if (!pickMap) {
    pickMap = L.map("pickMap").setView([41.2, 69.0], 4);
    L.tileLayer(OSM, { maxZoom: 19, attribution: ATTR }).addTo(pickMap);
    pickMap.on("click", (e) => { $("results").hidden = true; setPicked(e.latlng.lat, e.latlng.lng); });
  }
  setTimeout(() => pickMap.invalidateSize(), 80);
}
function locateMe() {
  if (!navigator.geolocation) { $("addr").textContent = t("noGeo"); return; }
  $("addr").textContent = t("wait");
  navigator.geolocation.getCurrentPosition(
    (p) => { pickMap.setView([p.coords.latitude, p.coords.longitude], 16); setPicked(p.coords.latitude, p.coords.longitude); },
    () => { $("addr").textContent = t("geoFail"); },
    { enableHighAccuracy: true, timeout: 12000 }
  );
}
async function setPicked(lat, lng) {
  const token = ++pickToken;
  if (pickMarker) pickMarker.setLatLng([lat, lng]);
  else pickMarker = L.circleMarker([lat, lng], { radius: 11, color: "#fff", weight: 3, fillColor: "#1f6b47", fillOpacity: 1 }).addTo(pickMap);
  $("addr").textContent = t("finding");
  $("saveBtn").disabled = true;
  const res = { lat, lng, country: "", region: "", city: "", district: "", address: "" };
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=${lang}&zoom=14&lat=${lat}&lon=${lng}`);
    const result = await r.json();
    const a = result.address || {};
    res.country = (a.country_code || "").toUpperCase();
    res.region = a.state || a.region || a.province || "";
    res.city = a.city || a.town || a.village || a.county || "";
    res.district = a.city_district || a.suburb || a.district || "";
    res.address = result.display_name || "";
  } catch (e) { console.error(e); }
  if (token !== pickToken) return;
  if (!res.country) { $("addr").textContent = t("noAddr"); return; }
  picked = res;
  $("addr").textContent = uniq([countryName(res.country), res.region, res.city, res.district]).join(", ");
  $("saveBtn").disabled = false;
}
$("searchForm").onsubmit = (e) => {
  e.preventDefault();
  const q = $("q").value.trim();
  if (!q) return;
  busy($("searchBtn"), async () => {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&accept-language=${lang}&limit=5&q=${encodeURIComponent(q)}`);
    const list = await r.json();
    const box = $("results");
    box.innerHTML = "";
    if (!list.length) { box.hidden = true; toast(t("noRes")); return; }
    list.forEach((it) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = it.display_name;
      b.onclick = () => { box.hidden = true; const la = parseFloat(it.lat), lo = parseFloat(it.lon); pickMap.setView([la, lo], 16); setPicked(la, lo); };
      box.appendChild(b);
    });
    box.hidden = false;
  });
};
function openPlace() {
  picked = null;
  $("saveBtn").disabled = true; $("results").hidden = true; $("q").value = "";
  show("place"); initPickMap();
  if (me && me.lat) { pickMap.setView([me.lat, me.lng], 14); setPicked(me.lat, me.lng); }
  else locateMe();
}
$("locateBtn").onclick = locateMe;
$("placeLogout").onclick = () => signOut(auth);
$("saveBtn").onclick = () => busy($("saveBtn"), async () => {
  const data = { ...picked };
  await setDoc(doc(db, "users", currentUser.uid), { name: currentUser.displayName || "", email: currentUser.email || "", ...data, updatedAt: Date.now() }, { merge: true });
  openHome(data);
});

/* ---------- Главный экран ---------- */
const STATUS = { new: { key: "t1", color: "#e5484d" }, progress: { key: "t2", color: "#f5a524" }, done: { key: "t3", color: "#30a46c" } };
let homeMap = null, homeLayer = null, draftMarker = null, problems = [], tab = "all", unsubscribeProblems = null, problemSnapshotVersion = 0, sharedLinkHandled = false, locationWatchId = null, locationRefineTimer = null, lastAddressLookupAt = 0, lastAddressCoords = null, locationPermissionNoticeShown = false, locationStatusKey = "", locationLookupToken = 0;
const CIS_COUNTRY_CODES = ["AM", "AZ", "BY", "KZ", "KG", "MD", "RU", "TJ", "TM", "UZ"];
// Seed the selector with cities before posts exist; cities found in real posts are
// added as well. Matching supports Latin transliterations of Russian city names.
const CIS_CITIES = {
  AM: ["Абовян", "Алаверди", "Армавир", "Арташат", "Вагаршапат", "Ванадзор", "Гавар", "Гюмри", "Горис", "Дилижан", "Ереван", "Капан", "Раздан", "Севан"],
  AZ: ["Баку", "Гянджа", "Ленкорань", "Мингечевир", "Нахичевань", "Сумгаит", "Шеки", "Ширван", "Евлах", "Шамкир", "Хачмаз", "Закаталы"],
  BY: ["Барановичи", "Бобруйск", "Борисов", "Брест", "Витебск", "Гомель", "Гродно", "Жлобин", "Лида", "Минск", "Могилёв", "Мозырь", "Орша", "Пинск", "Полоцк"],
  KZ: ["Актау", "Актобе", "Алматы", "Астана", "Атырау", "Жезказган", "Караганда", "Кокшетау", "Костанай", "Кызылорда", "Павлодар", "Петропавловск", "Семей", "Талдыкорган", "Тараз", "Туркестан", "Уральск", "Усть-Каменогорск", "Шымкент", "Экибастуз"],
  KG: ["Балыкчы", "Баткен", "Бишкек", "Джалал-Абад", "Кара-Балта", "Каракол", "Кант", "Кызыл-Кия", "Нарын", "Ош", "Талас", "Токмок", "Узген", "Чолпон-Ата"],
  MD: ["Бельцы", "Бендеры", "Кагул", "Комрат", "Кишинёв", "Оргеев", "Рыбница", "Сороки", "Тирасполь", "Унгены"],
  RU: ["Абакан", "Архангельск", "Астрахань", "Барнаул", "Белгород", "Владивосток", "Волгоград", "Воронеж", "Грозный", "Екатеринбург", "Иркутск", "Казань", "Калининград", "Кемерово", "Краснодар", "Красноярск", "Курск", "Липецк", "Москва", "Мурманск", "Набережные Челны", "Нижний Новгород", "Новосибирск", "Омск", "Оренбург", "Пермь", "Ростов-на-Дону", "Самара", "Санкт-Петербург", "Саратов", "Сочи", "Ставрополь", "Сургут", "Томск", "Тула", "Тюмень", "Улан-Удэ", "Уфа", "Хабаровск", "Челябинск", "Якутск", "Ярославль"],
  TJ: ["Бохтар", "Вахдат", "Душанбе", "Истаравшан", "Исфара", "Куляб", "Хорог", "Худжанд", "Турсунзаде"],
  TM: ["Ашхабад", "Балканабат", "Дашогуз", "Мары", "Туркменабат", "Туркменбаши"],
  UZ: ["Андижан", "Бухара", "Джизак", "Карши", "Коканд", "Навои", "Наманган", "Нукус", "Самарканд", "Ташкент", "Термез", "Ургенч", "Фергана", "Чирчик"]
};
const CIS_COUNTRY_NAMES = { AM: "Armenia", AZ: "Azerbaijan", BY: "Belarus", KZ: "Kazakhstan", KG: "Kyrgyzstan", MD: "Moldova", RU: "Russia", TJ: "Tajikistan", TM: "Turkmenistan", UZ: "Uzbekistan" };
let cityCatalogLoading = false, cityCatalogLoaded = false;
async function loadCisCityCatalog() {
  if (cityCatalogLoading || cityCatalogLoaded) return;
  cityCatalogLoading = true;
  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("City catalog unavailable");
    const result = await response.json();
    const countries = Array.isArray(result.data) ? result.data : [];
    CIS_COUNTRY_CODES.forEach((code) => {
      const country = countries.find((item) => item.country?.toLocaleLowerCase() === CIS_COUNTRY_NAMES[code].toLocaleLowerCase());
      if (Array.isArray(country?.cities)) CIS_CITIES[code] = [...new Set([...CIS_CITIES[code], ...country.cities.filter((city) => typeof city === "string" && city.trim())])];
    });
    cityCatalogLoaded = true;
    if (!$('home').hidden) renderFilters();
  } catch (error) {
    console.info("Using the built-in CIS city list because the optional public city catalog is unavailable.", error);
  } finally { cityCatalogLoading = false; }
}
const cityKey = (value) => String(value || "").toLocaleLowerCase().replaceAll("ё", "е").replace(/[а-я]/g, (c) => ({а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya"}[c])).replace(/[^a-z0-9]/g, "");
const sessionImages = new Map();
let sessionProfilePhoto = "";
function temporaryImageURL(file) {
  if (!file) return "";
  if (!file.type.startsWith("image/")) throw new Error(t("addPhoto"));
  return URL.createObjectURL(file);
}
async function persistableProblemImage(file) {
  if (!file?.type.startsWith("image/")) throw new Error(t("addPhoto"));
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d", { alpha: false });
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    let quality = 0.82, dataURL = "";
    do {
      dataURL = canvas.toDataURL("image/jpeg", quality);
      quality -= 0.12;
    } while (dataURL.length > 650_000 && quality >= 0.46);
    if (dataURL.length > 650_000) throw new Error(t("photoTooLarge"));
    return dataURL;
  } finally { bitmap.close(); }
}
function discardTemporaryImages() {
  sessionImages.forEach((images) => { if (images.before?.startsWith("blob:")) URL.revokeObjectURL(images.before); if (images.after?.startsWith("blob:")) URL.revokeObjectURL(images.after); (images.updates || []).forEach((item) => item.url?.startsWith("blob:") && URL.revokeObjectURL(item.url)); });
  sessionImages.clear();
  if (sessionProfilePhoto.startsWith("blob:")) URL.revokeObjectURL(sessionProfilePhoto);
  sessionProfilePhoto = "";
}
window.addEventListener("pagehide", discardTemporaryImages);
let postPickMode = false, draftLocation = null, profileTab = "posts";
const filteredProblems = () => {
  const country = $("countryFilter").value, city = $("cityFilter").value;
  return problems.filter((p) => CIS_COUNTRY_CODES.includes(p.country) && (!country || p.country === country) && (!city || cityKey(p.city) === cityKey(city)));
};
function fillSelect(select, values, firstLabel, selected) {
  select.replaceChildren(new Option(firstLabel, ""));
  values.forEach((value) => select.add(new Option(value.label, value.value)));
  if ([...select.options].some((o) => o.value === selected)) select.value = selected;
}
function renderFilters() {
  const countrySelect = $("countryFilter"), citySelect = $("cityFilter");
  const oldCountry = countrySelect.value, oldCity = citySelect.value;
  const countries = CIS_COUNTRY_CODES.map((code) => ({ value: code, label: countryName(code) }));
  fillSelect(countrySelect, countries, t("countriesAll"), oldCountry);
  const countryCodes = countrySelect.value ? [countrySelect.value] : CIS_COUNTRY_CODES;
  const cityNames = [...countryCodes.flatMap((code) => CIS_CITIES[code] || []), ...problems.filter((p) => CIS_COUNTRY_CODES.includes(p.country) && (!countrySelect.value || p.country === countrySelect.value)).map((p) => p.city), (CIS_COUNTRY_CODES.includes(me?.country) && (!countrySelect.value || me.country === countrySelect.value)) ? me?.city : ""].filter(Boolean);
  const uniqueCities = new Map(); cityNames.forEach((name) => { const key = cityKey(name); if (key && !uniqueCities.has(key)) uniqueCities.set(key, name); });
  const cities = [...uniqueCities.values()].sort((a, b) => a.localeCompare(b, lang));
  const cityOptions = cities.map((name) => ({ value: name, label: name }));
  fillSelect(citySelect, cityOptions, t("citiesAll"), oldCity);
}
function makeAction(label, action, id, active = false, extra = "", countValue = null) {
  const b = document.createElement("button"); b.type = "button"; b.className = `post-action ${extra} ${active ? "active" : ""}`; b.dataset.action = action; b.dataset.id = id; b.setAttribute("aria-label", label); b.title = label;
  const paths = { like:"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z", comments:"M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z", share:"M12 16V4m0 0L7 9m5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5", save:"M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z", take:"M5 12h13m-5-5 5 5-5 5", updates:"M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", complete:"M5 12l4 4L19 6", delete:"M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3" };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("aria-hidden", "true"); svg.classList.add("action-icon");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("d", paths[action] || paths.comments); svg.append(path); if (action === "like" && active) path.setAttribute("fill", "currentColor"); svg.setAttribute("fill", "none"); svg.setAttribute("stroke", "currentColor"); svg.setAttribute("stroke-width", "1.8"); svg.setAttribute("stroke-linecap", "round"); svg.setAttribute("stroke-linejoin", "round"); b.append(svg);
  if (typeof countValue === "number") { const count = document.createElement("span"); count.className = "action-count"; count.textContent = countValue; b.append(count); }
  if (["take", "updates", "complete"].includes(action)) { const text = document.createElement("span"); text.className = "action-label"; text.textContent = label; b.append(text); }
  return b;
}
function buildPostCard(p, compact = false) {
  const card = document.createElement("article"); card.className = "pc"; card.dataset.problemId = p.id;
  const head = document.createElement("div"); head.className = "post-head";
  const privateProfile = p.ownerPrivacy === "private" && p.ownerId !== currentUser.uid;
  const avatar = document.createElement("img"); avatar.className = "post-avatar"; avatar.src = avatarFor(privateProfile ? "" : p.ownerPhoto, privateProfile ? "" : p.ownerName); avatar.alt = "";
  const author = document.createElement("div"); author.className = "post-author";
  const name = document.createElement("b"); name.textContent = privateProfile ? t("privateProfile") : (p.ownerName && p.ownerName !== "Житель города" ? p.ownerName : t("resident"));
  const date = document.createElement("small"); date.textContent = uniq([p.city, p.district, p.createdAt ? new Date(p.createdAt).toLocaleDateString(lang) : ""]).join(" · "); author.append(name, date);
  const state = document.createElement("span"); state.className = `post-status ${p.status || "new"}`; state.textContent = t(STATUS[p.status]?.key || "t1"); head.append(avatar, author, state); card.append(head);
  const temporaryImages = sessionImages.get(p.id) || {};
  const beforePhoto = temporaryImages.before || p.photoURL;
  const afterPhoto = temporaryImages.after || p.afterPhotoURL;
  if (beforePhoto || afterPhoto) {
    const gallery = document.createElement("div"); gallery.className = `post-gallery ${afterPhoto ? "" : "single"}`;
    [[beforePhoto, t("beforeCaption")], ...(afterPhoto ? [[afterPhoto, t("afterCaption")]] : [])].filter(([url]) => url).forEach(([url, caption]) => { const figure = document.createElement("figure"); const image = document.createElement("img"); image.className = "post-photo"; image.src = url; image.alt = `${caption}: ${p.description || t("noDescription")}`; image.loading = "lazy"; const label = document.createElement("figcaption"); label.textContent = caption; figure.append(image, label); gallery.append(figure); }); card.append(gallery);
  }
  const body = document.createElement("div"); body.className = "post-body"; const description = document.createElement("p"); description.textContent = p.description || p.title || t("noDescription");
  const address = document.createElement("small"); address.className = "post-address"; address.textContent = "📍 " + (p.address || uniq([countryName(p.country), p.city, p.district]).join(", ") || t("noAddress")); body.append(description, address); card.append(body);
  if (!compact) {
    const actions = document.createElement("div"); actions.className = "post-actions";
    actions.append(makeAction(t("likeLabel"), "like", p.id, p.likedByMe, "like", p.likesCount || 0), makeAction(t("commentsLabel"), "comments", p.id, false, "", p.commentsCount || 0), makeAction(t("shareLabel"), "share", p.id));
    // Every open request gets the same actions, including the author's own
    // requests; newly published cards are rendered through the live snapshot.
    if (p.status === "new") actions.append(makeAction(t("takeTask"), "take", p.id, false, "take-action"));
    if (p.status === "done") actions.append(makeAction(t("progressView"), "updates", p.id, false, "progress-action"));
    actions.append(makeAction(t("saveLabel"), "save", p.id, p.savedByMe, "save-action"));
    if (p.ownerId === currentUser.uid) actions.append(makeAction(t("deletePost"), "delete", p.id, false, "delete-action"));
    card.append(actions);
    if (p.status !== "new") {
      const statusCta = document.createElement("button"); statusCta.type = "button"; statusCta.className = `post-status-cta ${p.status || "new"}`; statusCta.dataset.id = p.id;
      if (p.status === "progress") {
      const canUpdate = p.ownerId === currentUser.uid || p.assignedTo === currentUser.uid;
      statusCta.dataset.action = canUpdate ? "add-update" : "updates";
      statusCta.textContent = canUpdate ? t("progressAdd") : t("progressView");
      } else {
        const isOwner = p.ownerId === currentUser.uid;
        statusCta.dataset.action = isOwner ? "result" : "rate-open";
        statusCta.textContent = isOwner ? t("viewResult") : t("rateLabel");
      }
      card.append(statusCta);
    }
    if (p.status === "done") {
      const rating = document.createElement("div"); rating.className = "post-rating"; const summary = document.createElement("span"); summary.textContent = p.ratingCount ? `${t("rateLabel")}: ${Number(p.ratingAverage || 0).toFixed(1)} · ${p.ratingCount}` : `${t("rateLabel")}:`; rating.append(summary);
      if (p.ownerId !== currentUser.uid) for (let i = 1; i <= 5; i++) { const star = document.createElement("button"); star.type = "button"; star.className = `star-button ${i <= (p.myRating || 0) ? "on" : ""}`; star.dataset.action = "rate"; star.dataset.id = p.id; star.dataset.rating = i; star.textContent = "★"; star.setAttribute("aria-label", `${i} / 5`); star.title = `${i} / 5`; rating.append(star); }
      card.append(rating);
    }
    if (p.status === "progress" || p.status === "done") {
      const panel = document.createElement("section"); panel.className = "progress-updates"; panel.hidden = true; panel.dataset.updates = p.id;
      const panelHead = document.createElement("div"); panelHead.className = "updates-head"; const heading = document.createElement("b"); heading.textContent = t("updatesTitle"); panelHead.append(heading);
      if (p.status === "progress" && (p.ownerId === currentUser.uid || p.assignedTo === currentUser.uid)) { const add = document.createElement("button"); add.type = "button"; add.className = "post-empty-action"; add.dataset.action = "add-update"; add.dataset.id = p.id; add.textContent = "+ " + t("progressAdd"); panelHead.append(add); }
      const list = document.createElement("div"); list.className = "updates-list"; list.dataset.updateList = p.id; panel.append(panelHead, list); card.append(panel);
    }
    if ((p.status === "new" && p.ownerId !== currentUser.uid) || (p.status === "progress" && (p.ownerId === currentUser.uid || p.assignedTo === currentUser.uid))) {
      if (p.status === "progress") { const controls = document.createElement("div"); controls.className = "post-owner-actions"; const b = document.createElement("button"); b.type = "button"; b.className = "btn outline small"; b.dataset.action = "complete"; b.dataset.id = p.id; b.textContent = t("completeTask"); controls.append(b); card.append(controls); }
    }
    const comments = document.createElement("div"); comments.className = "post-comments"; comments.hidden = true; comments.dataset.comments = p.id;
    const commentList = document.createElement("div"); commentList.className = "post-comments-list"; commentList.dataset.commentList = p.id;
    const form = document.createElement("form"); form.className = "comment-form"; form.dataset.commentForm = p.id; const input = document.createElement("input"); input.type = "text"; input.maxLength = 500; input.placeholder = t("commentPlaceholder"); input.required = true; const submit = document.createElement("button"); submit.type = "submit"; submit.textContent = t("sendLabel"); form.append(input, submit); comments.append(commentList, form); card.append(comments);
  }
  return card;
}
function renderList() {
  renderFilters();
  const visible = filteredProblems();
  $("cAll").textContent = visible.length;
  ["new", "progress", "done"].forEach((s) => ($("c" + s[0].toUpperCase() + s.slice(1)).textContent = visible.filter((p) => p.status === s).length));
  document.querySelectorAll(".tab").forEach((x) => x.setAttribute("aria-selected", x.dataset.s === tab));
  const box = $("list"); box.replaceChildren();
  let items = visible.filter((p) => tab === "all" || p.status === tab);
  if (tab === "all") {
    const groups = { new: [], progress: [], done: [] }, order = ["new", "progress", "done"], mixed = [];
    items.forEach((p) => (groups[p.status] || groups.new).push(p));
    let round = 0;
    while (order.some((status) => groups[status].length)) {
      for (let offset = 0; offset < order.length; offset++) { const status = order[(round + offset) % order.length]; if (groups[status].length) mixed.push(groups[status].shift()); }
      round++;
    }
    items = mixed;
  }
  if (!items.length) { const e = document.createElement("div"); e.className = "empty"; e.textContent = tab === "all" ? t("emAll") : t({ new: "em1", progress: "em2", done: "em3" }[tab]); box.appendChild(e); return; }
  items.forEach((p) => box.append(buildPostCard(p)));
}
document.querySelectorAll(".tab").forEach((x) => (x.onclick = () => { tab = x.dataset.s; renderList(); }));
$("countryFilter").onchange = () => { renderList(); renderMap(false); };
$("cityFilter").onchange = () => { renderList(); renderMap(false); };
$("clearFilters").onclick = () => { $("countryFilter").value = ""; renderFilters(); $("cityFilter").value = ""; renderList(); renderMap(false); };

function openProblemForm() {
  $("problemForm").reset(); draftLocation = null; postPickMode = false; $("mapHint").hidden = true;
  if (draftMarker && homeMap) { homeMap.removeLayer(draftMarker); draftMarker = null; }
  $("problemAddress").value = ""; $("problemLocationStatus").textContent = t("locationInstruction"); showModal("problemModal");
}
function openTaskActionPicker(kind) {
  const isProgress = kind === "progress";
  const candidates = problems.filter((p) => p.status === "progress" && (p.ownerId === currentUser.uid || p.assignedTo === currentUser.uid));
  if (!candidates.length) { toast(t(isProgress ? "noProgressTasks" : "noCompleteTasks")); return; }
  $("taskActionTitle").textContent = t(isProgress ? "selectProgressTitle" : "selectCompleteTitle");
  $("taskActionPrompt").textContent = t(isProgress ? "selectProgressPrompt" : "selectCompletePrompt");
  const select = $("taskActionSelect"); select.replaceChildren();
  candidates.forEach((p) => { const option = document.createElement("option"); option.value = p.id; option.textContent = [p.title || p.description || t("untitled"), p.city, p.district].filter(Boolean).join(" · "); select.append(option); });
  $("taskActionContinue").dataset.kind = kind; showModal("taskActionModal");
}
dashboardToolbar?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action^='add-']"); if (!button) return;
  if (button.dataset.action === "add-request") openProblemForm();
  else openTaskActionPicker(button.dataset.action === "add-progress" ? "progress" : "done");
});
$("taskActionContinue").onclick = () => {
  const id = $("taskActionSelect").value, kind = $("taskActionContinue").dataset.kind; closeModal("taskActionModal");
  if (kind === "progress") { $("progressForm").reset(); $("progressProblemId").value = id; showModal("progressModal"); }
  else { $("completionPhotoInput").dataset.id = id; $("completionPhotoInput").value = ""; $("completionPhotoInput").click(); }
};

function renderMap(reset) {
  if (!homeMap) {
    homeMap = L.map("homeMap"); L.tileLayer(OSM, { maxZoom: 19, attribution: ATTR }).addTo(homeMap); homeLayer = L.layerGroup().addTo(homeMap); reset = true;
    homeMap.on("click", (e) => { if (postPickMode) setDraftLocation(e.latlng.lat, e.latlng.lng); });
  }
  homeLayer.clearLayers();
  const has = me && me.lat, ll = has ? [me.lat, me.lng] : [41.2, 74.0];
  if (reset) homeMap.setView(ll, has ? 13 : 5);
  if (has) L.circleMarker(ll, { radius: 9, color: "#fff", weight: 3, fillColor: "#1f6b47", fillOpacity: 1 }).bindTooltip(t("you")).addTo(homeLayer);
  filteredProblems().filter((p) => p.lat && p.lng && STATUS[p.status]).forEach((p) => {
    const el = document.createElement("div"); const b = document.createElement("b"); b.textContent = p.description || p.title || t("untitled"); const s = document.createElement("div"); s.textContent = t(STATUS[p.status].key); el.append(b, s);
    L.circleMarker([p.lat, p.lng], { radius: 9, color: "#fff", weight: 2, fillColor: STATUS[p.status].color, fillOpacity: 1 }).bindPopup(el).addTo(homeLayer);
  });
  if (draftLocation) { if (draftMarker) draftMarker.setLatLng([draftLocation.lat, draftLocation.lng]); else draftMarker = L.circleMarker([draftLocation.lat, draftLocation.lng], { radius: 12, color: "#fff", weight: 3, fillColor: "#d99b35", fillOpacity: 1 }).addTo(homeMap); }
  setTimeout(() => homeMap.invalidateSize(), 80);
}
function fillHome(reset) {
  const first = (currentUser.displayName || "").split(" ")[0]; $("hello").textContent = first ? `${t("hi")}, ${first}!` : t("hi") + "!"; $("profileToolbarName").textContent = currentUser.displayName || me.name || "";
  const locationParts = uniq([countryName(me.country), me.region, me.city, me.district]).join(", ");
  const coordinates = Number.isFinite(me.lat) && Number.isFinite(me.lng) ? `${t("coordinatesLabel")}: ${me.lat.toFixed(5)}, ${me.lng.toFixed(5)}` : "";
  const fallbackLocation = me.address || locationParts || coordinates;
  $("where").textContent = locationStatusKey === "geoFail" && coordinates ? coordinates : locationStatusKey ? t(locationStatusKey) : (fallbackLocation || t("unknownAddress")); renderList(); renderMap(reset);
}
function refreshCurrentLocation() {
  locationStatusKey = "wait"; locationPermissionNoticeShown = false;
  me = { ...me, lat: null, lng: null, address: "", country: "", region: "", city: "", district: "" };
  if ($("where")) $("where").textContent = t("wait");
  if (!navigator.geolocation) { locationStatusKey = "noGeo"; fillHome(false); return; }
  if (locationWatchId !== null) navigator.geolocation.clearWatch(locationWatchId);
  if (locationRefineTimer !== null) clearTimeout(locationRefineTimer);
  const requestToken = ++locationLookupToken; lastAddressLookupAt = 0; lastAddressCoords = null;
  let bestAccuracy = Infinity, hasFix = false, fixVersion = 0;
  const updateAddress = async ({ coords, timestamp }) => {
    if (requestToken !== locationLookupToken || (timestamp && Date.now() - timestamp > 120000)) return;
    const accuracy = Number.isFinite(coords.accuracy) ? coords.accuracy : Infinity;
    const point = [coords.latitude, coords.longitude];
    const movedKm = lastAddressCoords ? L.latLng(lastAddressCoords).distanceTo(L.latLng(point)) / 1000 : Infinity;
    if (hasFix && movedKm < 2.5 && accuracy > bestAccuracy * 0.75) return;
    hasFix = true; bestAccuracy = accuracy; fixVersion++;
    const currentFix = fixVersion;
    lastAddressCoords = point; lastAddressLookupAt = Date.now();
    me = { ...me, lat: point[0], lng: point[1], address: "", country: "", region: "", city: "", district: "" };
    locationStatusKey = accuracy > 8000 ? "geoLowAccuracy" : "finding"; fillHome(false);
    try {
      const latest = await lookupPostLocation(point[0], point[1]); if (requestToken !== locationLookupToken || currentFix !== fixVersion) return;
      me = { ...me, ...latest }; locationStatusKey = latest.address ? (accuracy > 8000 ? "geoLowAccuracy" : "") : "geoFail"; fillHome(false);
    } catch (error) {
      if (requestToken !== locationLookupToken || currentFix !== fixVersion) return;
      locationStatusKey = "geoFail"; console.info("Reverse geocoding was unavailable.", error); fillHome(false);
    }
  };
  const options = { enableHighAccuracy: true, timeout: 25000, maximumAge: 0 };
  const showLocationError = (error) => {
    if (requestToken !== locationLookupToken || hasFix) return;
    locationStatusKey = error.code === 1 ? "geoDenied" : "geoFail";
    if (error.code === 1 && !locationPermissionNoticeShown) { locationPermissionNoticeShown = true; toast(t("geoDenied")); }
    fillHome(false);
  };
  navigator.geolocation.getCurrentPosition(updateAddress, showLocationError, options);
  try {
    locationWatchId = navigator.geolocation.watchPosition(updateAddress, showLocationError, options);
    locationRefineTimer = setTimeout(() => {
      if (locationWatchId !== null) navigator.geolocation.clearWatch(locationWatchId);
      locationWatchId = null; locationRefineTimer = null;
    }, 30000);
  } catch { locationWatchId = null; }
}
$("refreshAddressBtn").onclick = refreshCurrentLocation;
async function openHome(d) {
  me = d || {}; $("meName").textContent = currentUser.displayName || me.name || "";
  $("avatar").src = avatarFor(sessionProfilePhoto || me.photoURL || currentUser.photoURL, currentUser.displayName || currentUser.email);
  show("home"); fillHome(true); refreshCurrentLocation(); loadCisCityCatalog();
  if (unsubscribeProblems) unsubscribeProblems();
  unsubscribeProblems = onSnapshot(collection(db, "problems"), async (snap) => {
    const version = ++problemSnapshotVersion;
    const rows = snap.docs.map((x) => {
      const data = x.data();
      return { id: x.id, ...data, status: STATUS[data.status] ? data.status : "new" };
    }).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    await Promise.all(rows.map(async (p) => {
      const refs = await Promise.allSettled([getDoc(doc(db, "problems", p.id, "likes", currentUser.uid)), getDoc(doc(db, "problems", p.id, "savedBy", currentUser.uid)), ...(p.status === "done" ? [getDoc(doc(db, "problems", p.id, "ratings", currentUser.uid))] : [])]);
      p.likedByMe = refs[0].status === "fulfilled" && refs[0].value.exists(); p.savedByMe = refs[1].status === "fulfilled" && refs[1].value.exists();
      if (p.status === "done" && refs[2]?.status === "fulfilled" && refs[2].value.exists()) p.myRating = refs[2].value.data().value;
    }));
    if (version !== problemSnapshotVersion) return;
    problems = rows;
    if (!$("home").hidden) {
      fillHome(false); if ($("profileModal").classList.contains("open")) renderProfileContent();
      const linkedId = location.hash.startsWith("#problem-") ? location.hash.slice(9) : "";
      if (linkedId && !sharedLinkHandled) { const linked = problems.find((p) => p.id === linkedId); if (linked) { sharedLinkHandled = true; tab = linked.status || "new"; $("countryFilter").value = ""; $("cityFilter").value = ""; renderList(); setTimeout(() => [...document.querySelectorAll(".pc")].find((node) => node.dataset.problemId === linkedId)?.scrollIntoView({ behavior: "smooth", block: "center" }), 120); } }
    }
  }, (e) => { console.error(e); toast(t("eLoadTasks")); });
}
function showModal(id) { $(id).classList.add("open"); document.body.style.overflow = "hidden"; }
function closeModal(id) { $(id).classList.remove("open"); if (id === "problemModal" && postPickMode) { postPickMode = false; $("mapHint").hidden = true; } if (!document.querySelector(".modal.open")) document.body.style.overflow = ""; }
document.querySelectorAll("[data-close]").forEach((b) => (b.onclick = () => closeModal(b.dataset.close)));
document.querySelectorAll(".modal").forEach((m) => m.addEventListener("click", (e) => { if (e.target === m) closeModal(m.id); }));
$("profileBtn").onclick = () => openProfile().catch((error) => { console.error(error); toast(t("eOpenProfile")); });
$("openMapBtn").onclick = () => { showModal("mapModal"); renderMap(false); setTimeout(() => homeMap?.invalidateSize(), 100); };
$("locateHomeBtn").onclick = () => locateForPost(false);
$("useCurrentLocation").onclick = () => locateForPost(true);
$("pickPostLocationBtn").onclick = () => { $("problemForm").reset(); draftLocation = null; $("problemAddress").value = ""; $("problemLocationStatus").textContent = t("locationInstruction"); enablePostMapPick(); };
$("chooseMapLocation").onclick = () => { closeModal("problemModal"); showModal("mapModal"); enablePostMapPick(); renderMap(false); setTimeout(() => homeMap?.invalidateSize(), 100); };
function enablePostMapPick() { postPickMode = true; $("mapHint").textContent = t("mapHint"); $("mapHint").hidden = false; toast(t("mapHint")); }
async function lookupPostLocation(lat, lng) {
  const data = { lat, lng, country: "", region: "", city: "", district: "", address: "" };
  const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=${encodeURIComponent(lang)}&zoom=18&lat=${lat}&lon=${lng}`, { signal: controller.signal });
    if (!r.ok) throw new Error(`Reverse geocoding failed (${r.status})`);
    const result = await r.json(), a = result.address || {};
    data.country = (a.country_code || "").toUpperCase(); data.region = a.state || a.region || a.province || "";
    data.city = a.city || a.town || a.village || a.municipality || a.county || "";
    data.district = a.city_district || a.suburb || a.district || a.neighbourhood || "";
    data.address = result.display_name || uniq([data.region, data.city, data.district]).join(", ") || `${t("coordinatesLabel")}: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    return data;
  } finally { clearTimeout(timeout); }
}
async function setDraftLocation(lat, lng) {
  postPickMode = false; $("mapHint").hidden = true; $("problemLocationStatus").textContent = t("finding");
  try { draftLocation = await lookupPostLocation(lat, lng); $("problemAddress").value = draftLocation.address; $("problemLocationStatus").textContent = uniq([countryName(draftLocation.country), draftLocation.city, draftLocation.district]).join(", ") || t("selectedPlace"); renderMap(false); closeModal("mapModal"); showModal("problemModal"); }
  catch (e) { console.error(e); $("problemLocationStatus").textContent = t("geoFail"); showModal("problemModal"); }
}
function locateForPost(forPost) {
  if (!navigator.geolocation) { toast(t("noGeo")); return; }
  toast(t("wait")); navigator.geolocation.getCurrentPosition(async (p) => {
    const { latitude: lat, longitude: lng } = p.coords; homeMap.setView([lat, lng], 16);
    if (forPost) await setDraftLocation(lat, lng); else {
      me = { ...me, lat, lng, address: "", country: "", region: "", city: "", district: "" }; locationStatusKey = "finding"; fillHome(false);
      try { me = { ...me, ...await lookupPostLocation(lat, lng) }; locationStatusKey = ""; }
      catch (error) { locationStatusKey = "geoFail"; console.info("Could not update the displayed address.", error); }
      fillHome(false);
    }
  }, () => toast(t("geoFail")), { enableHighAccuracy: true, timeout: 15000 });
}
$("problemForm").onsubmit = (e) => { e.preventDefault(); const btn = $("submitProblem"); busy(btn, async () => {
  if (!draftLocation || !$("problemAddress").value.trim()) { toast(t("chooseLocation")); return; }
  if (!CIS_COUNTRY_CODES.includes(draftLocation.country)) { toast(t("cisOnly")); return; }
  const file = $("problemPhoto").files[0]; if (!file) { toast(t("addPhoto")); return; }
  const description = $("problemDescription").value.trim(); const photoURL = await persistableProblemImage(file);
  await addDoc(collection(db, "problems"), { ...draftLocation, address: $("problemAddress").value.trim(), description, title: description.slice(0, 80), photoURL, ownerId: currentUser.uid, ownerName: currentUser.displayName || me.name || "", ownerPhoto: currentUser.photoURL || me.photoURL || "", ownerPrivacy: me.privacy || "public", status: "new", likesCount: 0, commentsCount: 0, savesCount: 0, ratingCount: 0, ratingAverage: 0, createdAt: Date.now() }); renderList(); renderMap(false);
  closeModal("problemModal"); $("problemForm").reset(); draftLocation = null; if (draftMarker) { homeMap.removeLayer(draftMarker); draftMarker = null; } toast(t("publishSuccess"));
}); };

async function readPost(id) {
  const snap = await getDoc(doc(db, "problems", id));
  if (!snap.exists()) throw new Error(t("taskRemoved"));
  const data = snap.data();
  return { ...data, status: STATUS[data.status] ? data.status : "new" };
}
$("list").addEventListener("click", async (e) => {
  const b = e.target.closest("[data-action]"); if (!b) return; const id = b.dataset.id, action = b.dataset.action;
  try {
    if (action === "like" || action === "save") {
      const field = action === "like" ? "likesCount" : "savesCount", sub = action === "like" ? "likes" : "savedBy", itemRef = doc(db, "problems", id, sub, currentUser.uid), postRef = doc(db, "problems", id);
      await runTransaction(db, async (tx) => { const snap = await tx.get(itemRef); if (snap.exists()) { tx.delete(itemRef); tx.update(postRef, { [field]: increment(-1) }); } else { tx.set(itemRef, { uid: currentUser.uid, createdAt: Date.now() }); tx.update(postRef, { [field]: increment(1) }); } });
    } else if (action === "share") {
      const url = `${location.origin}${location.pathname}#problem-${id}`; if (navigator.share) await navigator.share({ title: t("shareTitle"), url }); else { await navigator.clipboard.writeText(url); toast(t("shareCopied")); }
    } else if (action === "comments") {
      const box = document.querySelector(`[data-comments="${id}"]`); box.hidden = !box.hidden;
      if (!box.hidden) await loadComments(id);
    } else if (action === "delete") {
      const post = await readPost(id);
      if (post.ownerId !== currentUser.uid) throw new Error(t("deleteDenied"));
      if (!window.confirm(t("deleteConfirm"))) return;
      await deleteDoc(doc(db, "problems", id));
      const images = sessionImages.get(id);
      [images?.before, images?.after, ...(images?.updates || []).map((item) => item.url)].filter(Boolean).forEach((url) => { if (url.startsWith("blob:")) URL.revokeObjectURL(url); });
      sessionImages.delete(id); toast(t("deleteSuccess"));
    } else if (action === "take") {
      const postRef = doc(db, "problems", id); await runTransaction(db, async (tx) => { const snap = await tx.get(postRef); if (!snap.exists() || (STATUS[snap.data().status] ? snap.data().status : "new") !== "new") throw new Error(t("taskAlreadyTaken")); tx.update(postRef, { status: "progress", assignedTo: currentUser.uid, assignedName: currentUser.displayName || t("resident"), assignedAt: Date.now() }); }); toast(t("takeDone"));
    } else if (action === "updates") {
      const panel = document.querySelector(`[data-updates="${id}"]`); panel.hidden = !panel.hidden; if (!panel.hidden) await loadProgressUpdates(id);
    } else if (action === "add-update") {
      const p = await readPost(id); if (p.status !== "progress" || (p.ownerId !== currentUser.uid && p.assignedTo !== currentUser.uid)) throw new Error(t("progressDenied"));
      $("progressProblemId").value = id; $("progressForm").reset(); $("progressProblemId").value = id; showModal("progressModal");
    } else if (action === "complete") {
      const p = await readPost(id); if (p.ownerId !== currentUser.uid && p.assignedTo !== currentUser.uid) throw new Error(t("completeDenied")); $("completionPhotoInput").dataset.id = id; $("completionPhotoInput").value = ""; $("completionPhotoInput").click();
    } else if (action === "rate-open") {
      const rating = document.querySelector(`[data-problem-id="${id}"] .post-rating`); rating?.scrollIntoView({ behavior: "smooth", block: "center" }); rating?.querySelector(".star-button")?.focus({ preventScroll: true });
    } else if (action === "result") {
      document.querySelector(`[data-problem-id="${id}"] .post-gallery`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (action === "rate") await rateProblem(id, Number(b.dataset.rating));
  } catch (error) { console.error(error); toast(error.code ? t(ERR[error.code] || "eGen") : (error.message || t("eGen"))); }
});
$("completionPhotoInput").onchange = async (e) => {
  const file = e.target.files[0], id = e.target.dataset.id; if (!file || !id) return;
  try { const afterPhotoURL = temporaryImageURL(file); await updateDoc(doc(db, "problems", id), { status: "done", completedAt: Date.now() }); sessionImages.set(id, { ...(sessionImages.get(id) || {}), after: afterPhotoURL }); renderList(); renderMap(false); toast(t("completeDone")); }
  catch (error) { console.error(error); toast(error.message || t("eCompletePhoto")); }
};
async function loadComments(id) {
  const box = document.querySelector(`[data-comment-list="${id}"]`); box.replaceChildren();
  const snap = await getDocs(collection(db, "problems", id, "comments")); const entries = snap.docs.map((d) => d.data()).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  if (!entries.length) { const empty = document.createElement("small"); empty.className = "form-note"; empty.textContent = t("noComments"); box.append(empty); }
  entries.forEach((comment) => { const row = document.createElement("div"); row.className = "post-comment"; const author = document.createElement("b"); author.textContent = comment.authorName && comment.authorName !== "Житель города" ? comment.authorName : t("resident"); const body = document.createElement("span"); body.textContent = comment.text; row.append(author, body); box.append(row); });
}
async function loadProgressUpdates(id) {
  const box = document.querySelector(`[data-update-list="${id}"]`); if (!box) return; box.replaceChildren();
  const snap = await getDocs(collection(db, "problems", id, "updates"));
  const entries = snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  if (!entries.length) { const empty = document.createElement("small"); empty.className = "form-note"; empty.textContent = t("progressEmpty"); box.append(empty); }
  const photos = sessionImages.get(id)?.updates || [];
  entries.forEach((entry) => { const item = document.createElement("article"); item.className = "progress-update"; const meta = document.createElement("small"); meta.textContent = `${entry.authorName && entry.authorName !== "Житель города" ? entry.authorName : t("resident")} · ${entry.createdAt ? new Date(entry.createdAt).toLocaleString(lang) : ""}`; const text = document.createElement("p"); text.textContent = entry.description || ""; item.append(meta, text); const imageURL = photos.find((photo) => photo.updateId === entry.id)?.url; if (imageURL) { const img = document.createElement("img"); img.className = "update-photo"; img.src = imageURL; img.alt = t("progressPhotoCaption"); item.append(img); } box.append(item); });
}
$("progressForm").onsubmit = (e) => { e.preventDefault(); busy($("progressForm").querySelector("button[type=submit]"), async () => {
  const id = $("progressProblemId").value, description = $("progressDescription").value.trim(), file = $("progressPhoto").files[0]; if (!id || !description) return;
  const p = await readPost(id); if (p.status !== "progress" || (p.ownerId !== currentUser.uid && p.assignedTo !== currentUser.uid)) throw new Error(t("progressDenied"));
  const imageURL = file ? temporaryImageURL(file) : "";
  try {
    const updateRef = await addDoc(collection(db, "problems", id, "updates"), { description, authorId: currentUser.uid, authorName: currentUser.displayName || "", createdAt: Date.now() });
    if (imageURL) { const images = sessionImages.get(id) || { before: "", after: "", updates: [] }; images.updates = [...(images.updates || []), { updateId: updateRef.id, url: imageURL }]; sessionImages.set(id, images); }
    closeModal("progressModal"); const panel = document.querySelector(`[data-updates="${id}"]`); if (panel) { panel.hidden = false; await loadProgressUpdates(id); } toast(t("updateDone"));
  } catch (error) { if (imageURL) URL.revokeObjectURL(imageURL); throw error; }
}); };
$("list").addEventListener("submit", async (e) => {
  const form = e.target.closest("[data-comment-form]"); if (!form) return; e.preventDefault(); const id = form.dataset.commentForm, input = form.querySelector("input"), text = input.value.trim(); if (!text) return;
  try { await addDoc(collection(db, "problems", id, "comments"), { text, authorId: currentUser.uid, authorName: currentUser.displayName || "", createdAt: Date.now() }); await updateDoc(doc(db, "problems", id), { commentsCount: increment(1) }); input.value = ""; await loadComments(id); }
  catch (error) { console.error(error); toast(t("eComment")); }
});
async function rateProblem(id, rating) {
  if (rating < 1 || rating > 5) return; const postRef = doc(db, "problems", id), p = await readPost(id); if (p.ownerId === currentUser.uid) { toast(t("ownRating")); return; }
  await setDoc(doc(db, "problems", id, "ratings", currentUser.uid), { uid: currentUser.uid, value: rating, createdAt: Date.now() });
  const ratings = (await getDocs(collection(db, "problems", id, "ratings"))).docs.map((d) => Number(d.data().value)).filter((n) => n >= 1 && n <= 5); const average = ratings.reduce((sum, n) => sum + n, 0) / Math.max(ratings.length, 1);
  await updateDoc(postRef, { ratingCount: ratings.length, ratingAverage: average });
  if (ratings.length >= 5 && average >= 4.5 && p.ownerId) await setDoc(doc(db, "users", p.ownerId, "certificates", id), { problemId: id, description: p.description || p.title || t("cityTask"), ratingAverage: average, ratingCount: ratings.length, issuedAt: Date.now(), recipientName: p.ownerName || "" }, { merge: true });
  if (ratings.length >= 5 && average >= 4.5) toast(t("certIssued"));
}

async function openProfile() {
  const snap = await getDoc(doc(db, "users", currentUser.uid)); if (snap.exists()) me = { ...me, ...snap.data() };
  $("profileEmail").textContent = currentUser.email || ""; $("profileAvatar").src = avatarFor(sessionProfilePhoto || me.photoURL || currentUser.photoURL, currentUser.displayName || currentUser.email);
  $("profileBioView").textContent = me.bio || t("profileIntro"); $("profileNameInput").value = currentUser.displayName || me.name || ""; $("profileBioInput").value = me.bio || ""; $("profilePrivacy").value = me.privacy || "public"; $("profileTheme").value = theme;
  try { await renderProfileContent(); } catch (error) { console.error(error); toast(t("certLoadError")); }
  showModal("profileModal");
}
async function loadCertificates() {
  try { return (await getDocs(collection(db, "users", currentUser.uid, "certificates"))).docs.map((d) => d.data()); }
  catch (error) { console.error(error); return []; }
}
async function renderProfileContent() {
  const own = problems.filter((p) => p.ownerId === currentUser.uid); $("profilePostCount").textContent = own.length;
  const content = $("profileContent"); content.replaceChildren();
  document.querySelectorAll(".profile-tab").forEach((b) => b.classList.toggle("active", b.dataset.profileTab === profileTab));
  if (profileTab === "posts") {
    const certs = await loadCertificates(); $("profileCertificateCount").textContent = certs.length;
    if (!own.length) { const empty = document.createElement("div"); empty.className = "empty"; empty.textContent = t("profileEmptyPosts"); content.append(empty); }
    else own.forEach((p) => content.append(buildPostCard(p, true)));
  } else {
    const certs = await loadCertificates(); $("profileCertificateCount").textContent = certs.length;
    if (!certs.length) { const empty = document.createElement("div"); empty.className = "empty"; empty.textContent = t("profileEmptyCerts"); content.append(empty); }
    certs.forEach((c) => { const item = document.createElement("article"); item.className = "user-cert"; const brand = document.createElement("div"); brand.className = "brand"; const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("class", "mark"); const use = document.createElementNS("http://www.w3.org/2000/svg", "use"); use.setAttribute("href", "#m"); svg.append(use); const name = document.createElement("span"); name.className = "bn"; name.textContent = "ШААР"; brand.append(svg, name); const heading = document.createElement("b"); heading.textContent = t("certificateTitle"); const description = document.createElement("p"); description.textContent = `${t("certificateFor")} ${c.description || t("cityContribution")}`; const who = document.createElement("small"); who.textContent = c.recipientName && c.recipientName !== "Участник" ? c.recipientName : currentUser.displayName || t("participant"); const date = document.createElement("small"); date.textContent = c.issuedAt ? new Date(c.issuedAt).toLocaleDateString(lang) : ""; item.append(brand, heading, description, who, date); content.append(item); });
  }
}
document.querySelectorAll(".profile-tab").forEach((b) => (b.onclick = async () => { profileTab = b.dataset.profileTab; await renderProfileContent(); }));
$("profileSettingsBtn").onclick = () => { closeModal("profileModal"); showModal("settingsModal"); };
$("profileTheme").onchange = (e) => setTheme(e.target.value);
$("settingsForm").onsubmit = (e) => { e.preventDefault(); busy($("saveProfileBtn"), async () => {
  const name = $("profileNameInput").value.trim(); const photoURL = currentUser.photoURL || me.photoURL || ""; const photo = $("profilePhotoInput").files[0]; if (photo) sessionProfilePhoto = temporaryImageURL(photo);
  if (name) await updateProfile(currentUser, { displayName: name });
  me = { ...me, name, bio: $("profileBioInput").value.trim(), privacy: $("profilePrivacy").value, theme, updatedAt: Date.now() };
  await setDoc(doc(db, "users", currentUser.uid), me, { merge: true }); $("meName").textContent = name; $("avatar").src = avatarFor(sessionProfilePhoto || photoURL, name || currentUser.email); $("profileAvatar").src = avatarFor(sessionProfilePhoto || photoURL, name || currentUser.email); $("profileBioView").textContent = me.bio || t("profileIntro");
  await Promise.all(problems.filter((p) => p.ownerId === currentUser.uid).map((p) => updateDoc(doc(db, "problems", p.id), { ownerName: name, ownerPhoto: photoURL, ownerPrivacy: me.privacy })));
  closeModal("settingsModal"); toast(t("profileSaved"));
}); };
$("logoutBtn").onclick = () => signOut(auth);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.querySelectorAll(".modal.open").forEach((m) => closeModal(m.id)); });

/* ---------- Состояние входа ---------- */
setTheme(theme);
applyLang();
getRedirectResult(auth).catch((error) => { console.error("Google sign-in redirect failed.", error); toast(t(ERR[error.code] || "eGen")); });
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (!user) {
    if (locationWatchId !== null) { navigator.geolocation?.clearWatch(locationWatchId); locationWatchId = null; }
    if (locationRefineTimer !== null) { clearTimeout(locationRefineTimer); locationRefineTimer = null; }
    if (unsubscribeProblems) { unsubscribeProblems(); unsubscribeProblems = null; }
    ["suName", "suEmail", "suPass", "liEmail", "liPass", "rsEmail"].forEach((id) => ($(id).value = ""));
    me = null; renderLogin(); go("vChoose"); show("welcome"); return;
  }
  setLast(user);
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    const d = snap.exists() ? snap.data() : null;
    if (d && d.country && d.lat) openHome(d); else openPlace();
  } catch (e) { console.error(e); openPlace(); }
});
