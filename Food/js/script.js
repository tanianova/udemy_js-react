"use strict";

window.addEventListener('DOMContentLoaded', () => {
    // tabs 
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    // timer 
    const deadline = '2021-12-25';
    //получаем разницу между датами
    function getTimeRemaining(endtime) {
        //колво миллисек в конечном времени - текущее время
        const t = Date.parse(endtime) - Date.parse(new Date()),
            //сколько суток осталось
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); //чтобы не было паузы перед подключением скрипта(тк он срабатывает только через секунду)
        //обновляет таймер каждую секунду
        function updateClock() {
            // расчет времени, которое осталось на эту секунду
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    //modal

    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close');

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });


    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    window.addEventListener('scroll', showModalByScroll);


    //используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.transfer = 75;
            this.parent = document.querySelector(parentSelector);
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню “Премиум”",
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        21,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        13,
        ".menu .container"
    ).render();
});