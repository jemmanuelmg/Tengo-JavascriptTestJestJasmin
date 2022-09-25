import { createElement } from 'lwc';
import TestingLWC from 'c/testingLWC';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccounts from '@salesforce/apex/TestingLWCController.getAccounts';

const mockGetAccountList = require('./data/getAccounts.json');
const mockGetAccountListNoRecords = require('./data/getAccountsNoRecords.json');
const getAccountListAdapter = registerApexTestWireAdapter(getAccounts);

describe('c-testing-l-w-c', () => {
    beforeEach(() => { 
        const element = createElement('c-testing-l-w-c', {
            is: TestingLWC
        });
        document.body.appendChild(element);
    });

    afterEach(() => { 
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Test the addition function', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const inputForNumber2 = element.shadowRoot.querySelector('.input-num2');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const addButton = element.shadowRoot.querySelector('.add-button');

        inputForNumber1.value = '20';
        inputForNumber2.value = '50';
        addButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('70');
        });

    });

    it('Test the addition function negative', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const inputForNumber2 = element.shadowRoot.querySelector('.input-num2');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const addButton = element.shadowRoot.querySelector('.add-button');

        inputForNumber1.value = 'text';
        inputForNumber2.value = 'text';
        addButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('');
        });

    });

    it('Test the substract function', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const inputForNumber2 = element.shadowRoot.querySelector('.input-num2');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const substractButton = element.shadowRoot.querySelector('.substract-button');

        inputForNumber1.value = '20';
        inputForNumber2.value = '50';
        substractButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('-30');
        });

    });

    it('Test the multiply function', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const inputForNumber2 = element.shadowRoot.querySelector('.input-num2');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const multiplyButton = element.shadowRoot.querySelector('.multiply-button');

        inputForNumber1.value = '20';
        inputForNumber2.value = '50';
        multiplyButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('1000');
        });

    });

    it('Test the divide function positive', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const inputForNumber2 = element.shadowRoot.querySelector('.input-num2');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const divideButton = element.shadowRoot.querySelector('.divide-button');

        inputForNumber1.value = '20';
        inputForNumber2.value = '50';
        divideButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('0.4');
        });

    });

    it('Test the divide function with 0 as denominator', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const inputForNumber2 = element.shadowRoot.querySelector('.input-num2');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const divideButton = element.shadowRoot.querySelector('.divide-button');

        inputForNumber1.value = '20';
        inputForNumber2.value = '0';
        divideButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('NaN');
        });

    });

    it('Test the potentiate function positive', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const inputForNumber2 = element.shadowRoot.querySelector('.input-num2');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const potentiateButton = element.shadowRoot.querySelector('.potentiate-button');

        inputForNumber1.value = '2';
        inputForNumber2.value = '4';
        potentiateButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('16');
        });

    });

    it('Test the find root function', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const inputForNumber2 = element.shadowRoot.querySelector('.input-num2');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const findRootButton = element.shadowRoot.querySelector('.find-root-button');

        inputForNumber1.value = '16';
        inputForNumber2.value = '2';
        findRootButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('4');
        });

    });

    it('Test the fibonacci function', () => {
        const element = document.querySelector('c-testing-l-w-c');
        const inputForNumber1 = element.shadowRoot.querySelector('.input-num1');
        const resultDiv = element.shadowRoot.querySelector('.result-div');
        const fibonacciButton = element.shadowRoot.querySelector('.fibonacci-button');

        inputForNumber1.value = '5';
        fibonacciButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(function(){
            expect(resultDiv.textContent).toBe('1,1,2,3,5,8');
        });

    });

    it('Test population of Account records in table', () => {
        const element = document.querySelector('c-testing-l-w-c');
        getAccountListAdapter.emit(mockGetAccountList);

        return Promise.resolve().then(function(){
            const accountsDataTable = element.shadowRoot.querySelector('.account-data-table');
            const dataTableData = Object.assign({}, accountsDataTable.data);
            const numOfRecords = Object.keys(dataTableData).length;
            const firstRecordName = Object.assign({}, accountsDataTable.data)[0].Name;

            expect(numOfRecords).toBe(5);
            expect(firstRecordName).toBe('Thomson Fund Services');
        });

    });

    it('Test no Accounts to show', () => {
        const element = document.querySelector('c-testing-l-w-c');
        getAccountListAdapter.emit(mockGetAccountListNoRecords);

        return Promise.resolve().then(function(){
            const noAccountsMsg = element.shadowRoot.querySelector('.no-accounts-message');
            expect(noAccountsMsg.textContent).toBe('There are no Accounts to show');
        });

    });

    it('Test error in wire service', () => {
        getAccountListAdapter.error();
    });

    it('Test iteration over Account regions', () => {
        const element = document.querySelector('c-testing-l-w-c');
        getAccountListAdapter.emit(mockGetAccountList);

        return Promise.resolve().then(function(){
            const regionPills = element.shadowRoot.querySelectorAll('.account-region-pill');
            expect(regionPills.length).toBe(5);
        });

    });

});