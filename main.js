'use strict';

import {createHtmlElement} from "./createHtmlElement.js";
import {FetchWrapper} from './FetchWrapper.js';
import {animate} from './animate.js';

const mainInput = document.querySelector('#main_input');
const button = document.querySelector('button');
const pieChart = document.querySelector('.pie_chart');
const carbsHtml = document.querySelector('.carbs');
const proteinHtml = document.querySelector('.protein');
const fatHtml = document.querySelector('.fat');
const totalLog = document.querySelector('.log p');
const cardsWrapper = document.querySelector('.cards_wrapper');
const notificationMessage = document.querySelector('.notification');

const wait = milliseconds => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

const api = new FetchWrapper("https://api.api-ninjas.com/v1/nutrition?query=", {
	"headers": {
		"X-Api-Key": "TLJls7ZS8oWKefoTHeLd97VLDNer5k2UgBQSF3tV"
	},
});

let totalCalories = 0;
let totalCarbs = 0;
let totalProtein = 0;
let totalFat = 0;

button.addEventListener('click', () => {
    let endpoint = mainInput.value;
    // capitalize endpoint
    endpoint = endpoint.slice(0, 1).toUpperCase() + endpoint.slice(1);
    // clear an input
    mainInput.value = '';
    api.get(endpoint)
        .then(data => {
            //save needed data
            let calories = data[0]['calories'];
            let carbs = data[0]['carbohydrates_total_g'];
            let protein = data[0]['protein_g'];
            let fat = data[0]['fat_total_g'];
            //refresh total numbers
            totalCalories += calories;
            totalCarbs += carbs;
            totalProtein += protein;
            totalFat += fat;
            // add new card
            let newCard = createHtmlElement(cardsWrapper, 'div', '', {class: 'card'});
            createHtmlElement(newCard, 'h3', endpoint);
            createHtmlElement(newCard, 'p', `${calories} calories`);
            let descriptionWrapper = createHtmlElement(newCard, 'div', '', {class: 'description_wrapper'});
            let cardResult = createHtmlElement(descriptionWrapper, 'div', '', {class: 'card_result'});
            createHtmlElement(cardResult, 'p', `${carbs}g - ${protein}g - ${fat}g`);
            let cardResultDescription = createHtmlElement(descriptionWrapper, 'div', '', {class: 'card_result_description'});
            createHtmlElement(cardResultDescription, 'p', 'Carbs - Protein - Fat');
            // refresh total calories
            totalLog.textContent = `Total calories logged: ${Math.round(totalCalories)}`;
            // refresh percentage
            let total = totalCarbs + totalFat + totalProtein;

            let currentCarbs = Math.round(totalCarbs / total * 100);
            carbsHtml.textContent = `Carbs - ${currentCarbs}%`;

            let currentProtein = Math.round(totalProtein / total * 100);
            proteinHtml.textContent = `Protein - ${currentProtein}%`;

            let currentFat = Math.round(100 - (totalCarbs / total * 100 + totalProtein / total * 100));
            fatHtml.textContent = `Fat - ${currentFat}%`;

            //refresh pieChart 
            document.querySelector(('.no_data')).style.display = 'none';
            pieChart.style.display = 'flex';
            pieChart.style.background = `conic-gradient(
                var(--carbs-color) ${currentCarbs}%,
                var(--protein-color) ${currentCarbs}% ${currentCarbs + currentProtein}%,
                var(--fat--color) ${currentCarbs + currentProtein}% 100%
              )`;
            // show and remove notification
            if (window.innerWidth <= 1070) {
                animate(document.querySelector('.no_notification'), 0, 1, null, 'opacity');
                wait(2000).then(() => {
                    animate(document.querySelector('.no_notification'), 1, 0, null, 'opacity');
                });
            } else {
                animate(notificationMessage, 416, 630, null, 'marginLeft');
                wait(2700).then(() => {
                    animate(notificationMessage, 630, 416, null, 'marginLeft');
                });
            }
            // smooth apeearing of a new card
            animate(document.querySelector('.card:last-child'), 0, 1, null, 'opacity');
            
        })

})


