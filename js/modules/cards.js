function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = null
        }

        async getUSDRate() {
            try {
                const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
                const data = await response.json()
                const usdRate = data.Valute.USD.Value
                return usdRate
            } catch (error) {
                console.error('Ошибка при получении курса:', error)
                return null
            }
        }

        async changeToUAH() {
            this.transfer = await this.getUSDRate()

            if (this.transfer) {
                this.price = Math.round(this.price * this.transfer)
            } else {
                console.error('Не удалось получить курс USD')
            }
        }

        async render() {
            await this.changeToUAH()
            const element = document.createElement('div')

            if (this.classes.length === 0) {
                this.classes = 'menu__item'
                element.classList.add(this.classes)
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
        `
            this.parent.append(element)
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню “Фитнес”',
        'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активирует работу метаболизма, а также помогает сбросить лишний вес.',
        9,
        '.menu .menu__wrapper'
    ).render()

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .menu__wrapper'
    ).render()

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню “Постное”',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие мяса и рыбы, а также тщательный контроль порций. Это поможет вам сбросить лишний вес без вреда для здоровья.',
        21,
        '.menu .menu__wrapper'
    ).render()
}

export default cards
