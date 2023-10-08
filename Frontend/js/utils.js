import { contactTooltip } from "./createTooltip.js";
import { svgPhone, svgFb, svgVk, svgEmail, svgOther } from "./svg.js";
import { createClientItem } from "./createClientItem.js";

export const createContactLink = (type, value, element, svg, item, hiddenClass,) => {
    const setTooltip = contactTooltip(type, value);
    element = document.createElement('a');
    element.classList.add('contacts__link');
    if (hiddenClass) element.classList.add('active');
    element.innerHTML = svg;
    
    if (type === 'Email') {
        element.href = `mailto:${value.trim()}`;
    } else if (type === 'Телефон') {
        element.href = `tel:${value.trim()}`;
        setTooltip.tooltipValue.style.color = 'white';
        setTooltip.tooltipValue.style.textDecoration = 'none';
    } else {
        element.href = value.trim();
    }

    element.append(setTooltip.tooltip);
    item.append(element);

}

export const createContactItemByType = (type, value, item, hiddenClass) => {
    switch (type) {
        case 'Телефон':
            let phone;
            createContactLink(type, value, phone, svgPhone, item, hiddenClass);
            break;
        case 'Facebook':
            let fb;
            createContactLink(type, value, fb, svgFb, item, hiddenClass);
            break;
        case 'VK':
            let vk;
            createContactLink(type, value, vk, svgVk, item, hiddenClass);
            break;
        case 'Email':
            let email;
            createContactLink(type, value, email, svgEmail, item, hiddenClass);
            break;
        case 'Other':
            let other;
            createContactLink(type, value, other, svgOther, item, hiddenClass);
            break;

        default:
            break;
    }
   
}

export const formatDate = data => {
    const newDate = new Date(data);

    const correctDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }

    const resultDate = newDate.toLocaleString('ru', correctDate);

    return resultDate;
}

export const formatTime = data => {
    const newDate = new Date(data);

    const correctDate = {
        hour: 'numeric',
        minute: 'numeric',
    }

    const resultTime = newDate.toLocaleString('ru', correctDate);

    return resultTime;
}
