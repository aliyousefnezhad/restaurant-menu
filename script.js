// داده‌های منو با تصاویر جایگزین
    const menu = {
      "پیتزاها": [
      { name: "پیتزا مخصوص", price: 250000, img: "images/pizza1.jpg" },
      { name: "پیتزا پپرونی", price: 220000, img: "images/pizza2.jpg" },
      { name: "پیتزا قارچ و گوشت", price: 230000, img: "images/pizza3.jpg" },
      { name: "پیتزا مارگاریتا", price: 210000, img: "images/pizza4.jpg" },
      { name: "پیتزا سبزیجات", price: 200000, img: "images/pizza5.jpg" },
      { name: "پیتزا چهارفصل", price: 240000, img: "images/pizza6.jpg" },
      { name: "پیتزا مرغ و قارچ", price: 235000, img: "images/pizza7.jpg" },
      { name: "پیتزا ناپولی", price: 260000, img: "images/pizza8.jpg" },
      { name: "پیتزا کالزونه", price: 255000, img: "images/pizza9.jpg" },
      { name: "پیتزا مکزیکی", price: 245000, img: "images/pizza10.jpg" }
      ],
      "ساندویچ‌ها": [
      { name: "ساندویچ همبرگر", price: 180000, img: "images/sandwich1.jpg" },
      { name: "ساندویچ چیزبرگر", price: 190000, img: "images/sandwich2.jpg" },
      { name: "ساندویچ مرغ", price: 170000, img: "images/sandwich3.jpg" },
      { name: "ساندویچ کالباس", price: 160000, img: "images/sandwich4.jpg" },
      { name: "ساندویچ بندری", price: 165000, img: "images/sandwich5.jpg" },
      { name: "ساندویچ ژامبون گوشت", price: 185000, img: "images/sandwich6.jpg" },
      { name: "ساندویچ هات‌داگ", price: 175000, img: "images/sandwich7.jpg" },
      { name: "ساندویچ فلافل", price: 150000, img: "images/sandwich8.jpg" },
      { name: "ساندویچ تن ماهی", price: 180000, img: "images/sandwich9.jpg" },
      { name: "ساندویچ استیک", price: 200000, img: "images/sandwich10.jpg" }
      ],
      "سالادها": [
      { name: "سالاد فصل", price: 80000, img: "images/salad1.jpg" },
      { name: "سالاد سزار", price: 95000, img: "images/salad2.jpg" },
      { name: "سالاد یونانی", price: 90000, img: "images/salad3.jpg" },
      { name: "سالاد کلم", price: 75000, img: "images/salad4.jpg" },
      { name: "سالاد ذرت", price: 85000, img: "images/salad5.jpg" },
      { name: "سالاد ماکارونی", price: 95000, img: "images/salad6.jpg" }
      ],
      "نوشیدنی‌ها": [
      { name: "نوشابه قوطی", price: 30000, img: "images/drink1.jpg" },
      { name: "دوغ", price: 35000, img: "images/drink2.jpg" },
      { name: "آب معدنی", price: 20000, img: "images/drink3.jpg" },
      { name: "دلستر", price: 40000, img: "images/drink4.jpg" },
      { name: "آبمیوه طبیعی", price: 60000, img: "images/drink5.jpg" }
      ],
    };
    
    const container = document.getElementById("menu-container");
    const menuToggle = document.getElementById("menuToggle");
    const navButtons = document.getElementById("navButtons");
    const backToTop = document.getElementById("backToTop");
    
    // فعال کردن/غیرفعال کردن منوی موبایل
    menuToggle.addEventListener("click", () => {
      navButtons.classList.toggle("active");
    });
    
    // تغییر رنگ دکمه فعال
    function setActiveButton(name) {
      const buttons = document.querySelectorAll('#navButtons button');
      buttons.forEach(btn => {
        if (btn.innerText === name) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
    
    // نمایش همه غذاها
    function showMenu() {
      setActiveButton("نمایش همه");
      container.innerHTML = "";
      Object.keys(menu).forEach(category => {
        createCategorySection(category, menu[category]);
      });
    }
    
    // فیلتر بر اساس دسته‌بندی
    function filterCategory(category) {
      setActiveButton(category);
      container.innerHTML = "";
      createCategorySection(category, menu[category]);
    }
    
    // جستجو در لیست غذاها
    function searchMenu() {
      const input = document.getElementById("searchInput").value.trim().toLowerCase();
      if (input === "") {
        showMenu();
        return;
      }
    
      container.innerHTML = "";
      let foundItems = false;
    
      Object.keys(menu).forEach(category => {
        const filtered = menu[category].filter(item =>
          item.name.toLowerCase().includes(input)
        );
    
        if (filtered.length > 0) {
          foundItems = true;
          createCategorySection(category, filtered);
        }
      });
    
      if (!foundItems) {
        container.innerHTML = `
          <div class="category" style="text-align: center;">
            <h2>نتیجه‌ای یافت نشد</h2>
            <p>متاسفانه موردی با عبارت "${input}" یافت نشد.</p>
          </div>
        `;
      }
    }
    
    // ساخت بخش دسته‌بندی
    function createCategorySection(category, items) {
      const catDiv = document.createElement("div");
      catDiv.className = "category fade-in";
      catDiv.innerHTML = `<h2>${category}</h2>`;
    
      const itemsDiv = document.createElement("div");
      itemsDiv.className = "items";
    
      items.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "item";
        itemElement.innerHTML = `
          ${item.badge ? `<span class="item-badge">${item.badge}</span>` : ''}
          <img src="${item.img}" alt="${item.name}" class="item-img">
          <div class="item-content">
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.price.toLocaleString()} تومان</div>
          </div>
        `;
        
        // تأخیر برای انیمیشن
        itemElement.style.animationDelay = `${index * 0.1}s`;
        itemsDiv.appendChild(itemElement);
      });
    
      catDiv.appendChild(itemsDiv);
      container.appendChild(catDiv);
    }
    
    // دکمه بازگشت به بالا
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("active");
      } else {
        backToTop.classList.remove("active");
      }
    });
    
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
    
    // اجرای اولیه
    document.addEventListener("DOMContentLoaded", () => {
      showMenu();
      
      // بستن منو وقتی روی آیتمی کلیک می‌شود (در حالت موبایل)
      document.querySelectorAll("#navButtons button").forEach(button => {
        button.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            navButtons.classList.remove("active");
          }
        });
      });
    });
