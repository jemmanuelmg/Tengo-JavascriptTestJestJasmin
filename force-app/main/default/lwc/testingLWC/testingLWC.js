import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/TestingLWCController.getAccounts';

const COLS = [
    { label: 'Name', fieldName: 'Name', type: 'text'},
    { label: 'Phone', fieldName: 'Phone', type: 'text'},
    { label: 'Region', fieldName: 'Region__c', type: 'text'},
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date'},
];

export default class TestingLWC extends LightningElement {

    @track resultOfOperation;
    @track accountList;
    @track thereAreAccounts = false;
    @track columns = COLS;

    @wire(getAccounts)
    wiredContacts({ error, data }) {
        if (data) {
            this.accountList = data;
            this.thereAreAccounts = data.length > 0 ? true : false;
        } else if (error) {
            this.printErrorInfo(error)
        }
    }

    add() {
        let number1 = parseFloat(this.template.querySelector('.input-num1').value);
        let number2 = parseFloat(this.template.querySelector('.input-num2').value);

        if (this.isValidNumber(number1) && this.isValidNumber(number2)) {    
            let result = number1 + number2;
            this.resultOfOperation = result;
        } else {
            this.showToast('Error', 'Please provide two numbers', 'error');
        }
    }

    substract() {
        let number1 = parseFloat(this.template.querySelector('.input-num1').value);
        let number2 = parseFloat(this.template.querySelector('.input-num2').value);

        if (this.isValidNumber(number1) && this.isValidNumber(number2)) {    
            let result = number1 - number2;
            this.resultOfOperation = result;
        } else {
            this.showToast('Error', 'Please provide two numbers', 'error');
        }
    }

    multiply() {
        let number1 = parseFloat(this.template.querySelector('.input-num1').value);
        let number2 = parseFloat(this.template.querySelector('.input-num2').value);
        if (this.isValidNumber(number1) && this.isValidNumber(number2)) { 
            let result = number1 * number2;
            this.resultOfOperation = result;
        } else {
            this.showToast('Error', 'Please provide two numbers', 'error');
        }    
    }

    divide() {
        let number1 = parseFloat(this.template.querySelector('.input-num1').value);
        let number2 = parseFloat(this.template.querySelector('.input-num2').value);

        let result
        if (this.isValidNumber(number1) && this.isValidNumber(number2)) {
            if (number2 !== 0) {
                result = number1 / number2;
            } else {
                this.showToast('Error', 'Division by 0 is not allowed', 'error');
                result = NaN
            }
        } else {
            this.showToast('Error', 'Please provide two numbers', 'error');
        } 
        this.resultOfOperation = result;
    }

    potentiate() {
        let number1 = parseFloat(this.template.querySelector('.input-num1').value);
        let number2 = parseFloat(this.template.querySelector('.input-num2').value);

        if (this.isValidNumber(number1) && this.isValidNumber(number2)) {
            let result = Math.pow(number1, number2);
            this.resultOfOperation = result;
        } else {
            this.showToast('Error', 'Please provide two numbers', 'error');
        } 
    }

    root() {
        let number1 = parseFloat(this.template.querySelector('.input-num1').value);
        let number2 = parseFloat(this.template.querySelector('.input-num2').value);

        if (this.isValidNumber(number1) && this.isValidNumber(number2)) {
            let result = Math.pow(number1, 1/number2);
            this.resultOfOperation = result;
        } else {
            this.showToast('Error', 'Please provide two numbers', 'error');
        } 
    }

    fibonacci() {
        let number1 = parseFloat(this.template.querySelector('.input-num1').value);

        if (this.isValidNumber(number1)) {
            var a = 1, b = 0, temp;
            var resultList = [];
        
            while (number1 >= 0) {
            temp = a;
            a = a + b;
            b = temp;
            resultList.push(b);
            number1 --;
            }
        
            this.resultOfOperation = resultList;
        } else {
            this.showToast('Error', 'Please provide a value for number1', 'error');
        } 
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title, 
                message: message, 
                variant: variant
            })
        );
    }

    isValidNumber(number) {

        if (number !== null && number !== undefined && !isNaN(number)) {
            return true;
        } else {
            return false;
        }

    }

    printErrorInfo(error){
        console.log("Error stack", error.stack);
        console.log("Error name", error.name);
        console.log("Error message", error.message);
    }

}